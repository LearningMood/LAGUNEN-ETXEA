// ================================================
// 3. hooks/useGalleryImages.js
// ================================================

import { useState, useEffect, useMemo } from 'react';
import { parseGoogleUrl, checkImageUrl } from '../utils/imageHelpers';
import { BACKUP_IMAGES } from '../data/galleryBackup';

/**
 * Hook personnalisé pour gérer les images avec fallback intelligent
 */
export function useGalleryImages(googlePhotos = []) {
  const [failedImages, setFailedImages] = useState(new Set());
  const [useBackupMode, setUseBackupMode] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  
  // Déterminer si on doit passer en mode backup
  useEffect(() => {
    // Si pas de photos Google, utiliser backup
    if (!googlePhotos || googlePhotos.length === 0) {
      setUseBackupMode(true);
      setIsChecking(false);
      return;
    }
    
    // Si plus de 50% des images ont échoué, passer en backup
    if (failedImages.size > googlePhotos.length * 0.5) {
      console.warn('🔄 Basculement en mode backup (trop d\'échecs Google)');
      setUseBackupMode(true);
    }
    
    setIsChecking(false);
  }, [googlePhotos, failedImages]);
  
  // Fusionner les images Google avec les backups
  const images = useMemo(() => {
    // Mode backup complet
    if (useBackupMode) {
      return BACKUP_IMAGES.map(img => ({
        ...img,
        ...parseGoogleUrl(img.url),
        isBackup: true
      }));
    }
    
    // Mode hybride : Google avec fallback individuel
    return googlePhotos.map((photo, index) => {
      const backup = BACKUP_IMAGES[index] || BACKUP_IMAGES[0];
      const googleUrls = parseGoogleUrl(photo.url);
      const isFailed = failedImages.has(photo.url);
      
      return {
        ...photo,
        ...googleUrls,
        // Si l'image Google a échoué, utiliser le backup
        thumb: isFailed ? backup.url : (googleUrls?.thumb || backup.url),
        full: isFailed ? backup.url : (googleUrls?.full || backup.url),
        legende: photo.legende || backup.legende,
        isBackup: isFailed,
        backupUrl: backup.url
      };
    });
  }, [googlePhotos, useBackupMode, failedImages]);
  
  // Fonction pour marquer une image comme échouée
  const markImageAsFailed = (url) => {
    setFailedImages(prev => new Set(prev).add(url));
  };
  
  return {
    images,
    isBackupMode: useBackupMode,
    isChecking,
    markImageAsFailed,
    stats: {
      total: images.length,
      failed: failedImages.size,
      backupUsed: images.filter(img => img.isBackup).length
    }
  };
}
