import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

// In-memory token cache (Do NOT store in localStorage per security guidelines)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

export const initDriveAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user && cachedAccessToken) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else if (!isSigningIn) {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const signInWithGoogleDrive = async (): Promise<{ user: User; accessToken: string }> => {
  try {
    isSigningIn = true;
    const provider = new GoogleAuthProvider();
    SCOPES.forEach((scope) => provider.addScope(scope));
    // Force prompt to ensure the user approves Drive permissions on their account
    provider.setCustomParameters({
      prompt: 'consent select_account',
    });

    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Could not retrieve access token with Google Drive permissions.');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: credential.accessToken };
  } finally {
    isSigningIn = false;
  }
};

export const signOutGoogleDrive = async (): Promise<void> => {
  cachedAccessToken = null;
  await firebaseSignOut(auth);
};

export const getCachedAccessToken = (): string | null => {
  return cachedAccessToken;
};

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webViewLink?: string;
  iconLink?: string;
  size?: string;
  modifiedTime?: string;
}

/**
 * List files from Google Drive with search filtering
 */
export const listGoogleDriveFiles = async (
  token: string,
  typeFilter: 'images' | 'documents' | 'all' = 'all',
  searchTerm: string = ''
): Promise<DriveFile[]> => {
  let q = "trashed = false";

  if (typeFilter === 'images') {
    q += " and mimeType contains 'image/'";
  } else if (typeFilter === 'documents') {
    q += " and (mimeType = 'application/pdf' or mimeType contains 'application/vnd.google-apps.document' or mimeType contains 'application/msword' or mimeType contains 'application/vnd.openxmlformats-officedocument.wordprocessingml' or mimeType = 'application/json' or mimeType = 'text/plain')";
  }

  if (searchTerm.trim()) {
    q += ` and name contains '${searchTerm.trim().replace(/'/g, "\\'")}'`;
  }

  const url = new URL('https://www.googleapis.com/drive/v3/files');
  url.searchParams.append('q', q);
  url.searchParams.append('pageSize', '30');
  url.searchParams.append(
    'fields',
    'files(id, name, mimeType, thumbnailLink, webViewLink, iconLink, size, modifiedTime)'
  );
  url.searchParams.append('orderBy', 'modifiedTime desc');

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const message = err.error?.message || `Failed to fetch Drive files (HTTP ${response.status})`;
    if (response.status === 401 || response.status === 403 || message.toLowerCase().includes('insufficient')) {
      throw new Error(
        'Google Drive access was not granted. Please click Disconnect and Sign In again, making sure to grant access to view your Google Drive files.'
      );
    }
    throw new Error(message);
  }

  const data = await response.json();
  return data.files || [];
};

/**
 * Download a file from Google Drive as a data URL (for images or local display)
 */
export const fetchDriveFileAsDataUrl = async (fileId: string, token: string, _mimeType: string): Promise<string> => {
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to download file from Google Drive (HTTP ${response.status})`);
  }

  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

/**
 * Fetch a JSON file content from Google Drive (e.g. for structured CV import)
 */
export const fetchDriveJsonContent = async (fileId: string, token: string): Promise<any> => {
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch JSON file from Google Drive`);
  }

  return await response.json();
};
