import React, { createContext, useContext, useState, useEffect } from 'react';
import { CVProfile, defaultCVData } from '../data/defaultCV';

interface ProfileContextType {
  profileImage: string;
  cvData: CVProfile;
  isCVModalOpen: boolean;
  isImageModalOpen: boolean;
  isDriveModalOpen: boolean;
  driveModalTab: 'photo' | 'resume';
  updateProfileImage: (url: string) => void;
  updateCV: (data: CVProfile) => void;
  resetCV: () => void;
  resetProfileImage: () => void;
  openCVModal: () => void;
  closeCVModal: () => void;
  openImageModal: () => void;
  closeImageModal: () => void;
  openDriveModal: (tab?: 'photo' | 'resume') => void;
  closeDriveModal: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const STORAGE_KEY_IMAGE = 'ym_profile_image';
const STORAGE_KEY_CV = 'ym_cv_profile_data_v3';
const outdatedCertificationTitles = new Set([
  'Certified in Cybersecurity (CC)',
  'Data Science & Machine Learning Foundations',
]);

function loadCVData(): CVProfile {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CV);
    if (!saved) return defaultCVData;

    const profile = { ...defaultCVData, ...JSON.parse(saved) } as CVProfile;
    const oldRoleTitles = new Set([
      'Junior Data Engineer',
      'Junior Software Engineer',
      'Junior Backend Developer',
      'Full-Stack Software Engineer',
      'Backend Engineer',
    ]);
    const shouldUpdateRole = oldRoleTitles.has(profile.title);
    const hasOutdatedCertifications = profile.certifications?.some((cert) => outdatedCertificationTitles.has(cert.title));

    if (shouldUpdateRole) {
      profile.title = defaultCVData.title;
      profile.tagline = defaultCVData.tagline;
      profile.summary = defaultCVData.summary;
    }

    if (hasOutdatedCertifications) {
      const additionalCertifications = profile.certifications.filter(
        (cert) => !outdatedCertificationTitles.has(cert.title)
          && !defaultCVData.certifications.some((current) => current.title === cert.title),
      );
      profile.certifications = [...defaultCVData.certifications, ...additionalCertifications];
    }

    if (shouldUpdateRole || hasOutdatedCertifications) {
      try {
        localStorage.setItem(STORAGE_KEY_CV, JSON.stringify(profile));
      } catch {
        // Keep the migrated profile in memory if browser storage is unavailable.
      }
    }

    return profile;
  } catch {
    return defaultCVData;
  }
}

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profileImage, setProfileImage] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_IMAGE);
      return saved || defaultCVData.profileImage;
    } catch {
      return defaultCVData.profileImage;
    }
  });

  const [cvData, setCvData] = useState<CVProfile>(loadCVData);

  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [driveModalTab, setDriveModalTab] = useState<'photo' | 'resume'>('photo');

  // Sync profileImage with cvData
  useEffect(() => {
    if (cvData.profileImage !== profileImage) {
      setCvData((prev) => ({ ...prev, profileImage }));
    }
  }, [profileImage]);

  const updateProfileImage = (newUrl: string) => {
    setProfileImage(newUrl);
    try {
      localStorage.setItem(STORAGE_KEY_IMAGE, newUrl);
    } catch (e) {
      console.warn('Could not save profile image to localStorage', e);
    }
  };

  const updateCV = (newCV: CVProfile) => {
    setCvData(newCV);
    try {
      localStorage.setItem(STORAGE_KEY_CV, JSON.stringify(newCV));
      if (newCV.profileImage && newCV.profileImage !== profileImage) {
        setProfileImage(newCV.profileImage);
        localStorage.setItem(STORAGE_KEY_IMAGE, newCV.profileImage);
      }
    } catch (e) {
      console.warn('Could not save CV data to localStorage', e);
    }
  };

  const resetCV = () => {
    setCvData(defaultCVData);
    setProfileImage(defaultCVData.profileImage);
    try {
      localStorage.removeItem(STORAGE_KEY_CV);
      localStorage.removeItem(STORAGE_KEY_IMAGE);
    } catch (e) {
      console.warn(e);
    }
  };

  const resetProfileImage = () => {
    setProfileImage(defaultCVData.profileImage);
    try {
      localStorage.removeItem(STORAGE_KEY_IMAGE);
    } catch (e) {
      console.warn(e);
    }
  };

  const openCVModal = () => setIsCVModalOpen(true);
  const closeCVModal = () => setIsCVModalOpen(false);

  const openImageModal = () => setIsImageModalOpen(true);
  const closeImageModal = () => setIsImageModalOpen(false);

  const openDriveModal = (tab: 'photo' | 'resume' = 'photo') => {
    setDriveModalTab(tab);
    setIsDriveModalOpen(true);
  };
  const closeDriveModal = () => setIsDriveModalOpen(false);

  return (
    <ProfileContext.Provider
      value={{
        profileImage,
        cvData,
        isCVModalOpen,
        isImageModalOpen,
        isDriveModalOpen,
        driveModalTab,
        updateProfileImage,
        updateCV,
        resetCV,
        resetProfileImage,
        openCVModal,
        closeCVModal,
        openImageModal,
        closeImageModal,
        openDriveModal,
        closeDriveModal,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
