import React, { createContext, useContext, useState, useEffect } from 'react';
import { CVProfile, defaultCVData } from '../data/defaultCV';

interface ProfileContextType {
  profileImage: string;
  cvData: CVProfile;
  isCVModalOpen: boolean;
  isImageModalOpen: boolean;
  updateProfileImage: (url: string) => void;
  updateCV: (data: CVProfile) => void;
  resetCV: () => void;
  resetProfileImage: () => void;
  openCVModal: () => void;
  closeCVModal: () => void;
  openImageModal: () => void;
  closeImageModal: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const STORAGE_KEY_IMAGE = 'ym_profile_image';
const STORAGE_KEY_CV = 'ym_cv_profile_data';

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profileImage, setProfileImage] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_IMAGE);
      return saved || defaultCVData.profileImage;
    } catch {
      return defaultCVData.profileImage;
    }
  });

  const [cvData, setCvData] = useState<CVProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CV);
      if (saved) {
        return JSON.parse(saved);
      }
      return defaultCVData;
    } catch {
      return defaultCVData;
    }
  });

  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

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

  return (
    <ProfileContext.Provider
      value={{
        profileImage,
        cvData,
        isCVModalOpen,
        isImageModalOpen,
        updateProfileImage,
        updateCV,
        resetCV,
        resetProfileImage,
        openCVModal,
        closeCVModal,
        openImageModal,
        closeImageModal,
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
