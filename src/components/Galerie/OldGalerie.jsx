import { useEffect, useMemo, useState, Suspense, lazy, useCallback } from "react";
import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";

const Lightbox = lazy(() => import("react-image-lightbox"));
import "react-image-lightbox/style.css";

// ================================================
// CONFIGURATION DES IMAGES LOCALES
// ================================================
const LOCAL_IMAGES = [
  { 
    id: "terrasse",
    url: "/img/Lagunen-Etxea-location-Hendaye-terrasse.jpg", 
    legende: "Terrasse avec jardin",
    ordre: 1
  },
  { 
    id: "salon",
    url: "/img/Lagunen-Etxea-location-Hendaye-salon.jpg", 
    legende: "Salon lumineux",
    ordre: 2
  },
  { 
    id: "cuisine",
    url: "/img/Lagunen-Etxea-location-Hendaye-cuisine.jpg", 
    legende: "Cuisine équipée",
    ordre: 3
  },
  { 
    id: "chambre1",
    url: "/img/Lagunen-Etxea-location-Hendaye-chambre1.jpg", 
    legende: "Chambre principale",
    ordre: 4
  },
  { 
    id: "chambre2",
    url: "/img/Lagunen-Etxea-location-Hendaye-chambre2.jpg", 
    legende: "Chambre enfants",
    ordre: 5
  },
  { 
    id: "sdb",
    url: "/img/Lagunen-Etxea-location-Hendaye-sdb.jpg", 
    legende: "Salle de bain",
    ordre: 6
  },
  { 
    id: "vue",
    url: "/img/Lagunen-Etxea-location-Hendaye-vue.jpg", 
    legende: "Vue extérieure",
    ordre: 7
  },
  { 
    id: "plage",
    url: "/img/Lagunen-Etxea-location-Hendaye-plage.jpg", 
    legende: "Plage à proximité",
    ordre: 8
  }
];

// ================================================
// UTILITAIRES
// ================================================

/**
 * Convertit une URL Google Drive/Photos en URLs optimisées
 */
function parseGoogleUrl(url) {
  if (!url) return null;
  
  const urlStr = String(url);
  
  // Google Drive
  const driveMatch = urlStr.match(/[?&]id=([^&#]+)/);
  if (driveMatch) {
    const id = driveMatch[1];
    return {
      thumb: `https://drive.google.com/thumbnail?id=${id}&sz=w900`,
      full: `https://drive.google.com/uc?export=download&id=${id}`,
      original: urlStr,
      source: 'drive'
    };
  }
  
  // Google Photos
  if (urlStr.includes('googleusercontent.com') || urlStr.includes('gstatic.com')) {
    const base = urlStr.split('=')[0];
    return {
      thumb: `${base}=w900`,
      full: `${base}=w2400`,
      original: urlStr,
      source: 'photos'
    };
  }
  
  // URL normale
  return {
    thumb: urlStr,
    full: urlStr,
    original: urlStr,
    source: 'direct'
  };
}

/**
 * Hook pour gérer le chargement d'images avec fallback
 */
function useImageWithFallback(primarySrc, fallbackSrc) {
  const [src, setSrc] = useState(primarySrc);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!primarySrc) {
      setSrc(fallbackSrc);
      setIsLoading(false);
      return;
    }
    
    // Précharger l'image
    const img = new Image();
    img.src = primarySrc;
    
    img.onload = () => {
      setSrc(primarySrc);
      setIsLoading(false);
      setHasError(false);
    };
    
    img.onerror = () => {
      console.warn(`⚠️ Image non accessible: ${primarySrc}`);
      setSrc(fallbackSrc);
      setIsLoading(false);
      setHasError(true);
    };
    
    // Timeout après 5 secondes
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.warn(`⏱️ Timeout pour: ${primarySrc}`);
        setSrc(fallbackSrc);
        setIsLoading(false);
        setHasError(true);
      }
    }, 5000);
    
    return () => clearTimeout(timeout);
  }, [primarySrc, fallbackSrc]);
  
  return { src, hasError, isLoading };
}

// ================================================
// COMPOSANT IMAGE AVEC FALLBACK
// ================================================
function GalerieImage({ photo, localFallback, onClick, index }) {
  const googleUrls = useMemo(() => parseGoogleUrl(photo?.url), [photo?.url]);
  const { src, hasError, isLoading } = useImageWithFallback(
    googleUrls?.thumb,
    localFallback?.url
  );
  
  const [imageError, setImageError] = useState(false);
  
  const handleClick = useCallback(() => {
    onClick(index);
  }, [onClick, index]);
  
  const handleImageError = useCallback(() => {
    setImageError(true);
    console.warn(`❌ Erreur de chargement finale pour: ${photo?.legende}`);
  }, [photo]);
  
  // Indicateur de source
  const sourceIndicator = hasError ? '📁' : '☁️';
  const sourceTitle = hasError ? 'Image locale' : 'Image Google';
  
  return (
    <div 
      className="galerie-item" 
      onClick={handleClick}
      style={{ position: 'relative', cursor: 'pointer' }}
    >
      {/* Indicateur de chargement */}
      {isLoading && (
        <div className="image-loading">
          <div className="spinner"></div>
        </div>
      )}
      
      {/* Image */}
      {!imageError ? (
        <img
          src={src}
          alt={photo?.legende || localFallback?.legende || `Photo ${index + 1}`}
          loading="lazy"
          onError={handleImageError}
          style={{ 
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease'
          }}
        />
      ) : (
        <div className="image-error">
          <span>📷</span>
          <p>Image non disponible</p>
        </div>
      )}
      
      {/* Légende */}
      {(photo?.legende || localFallback?.legende) && (
        <p className="galerie-legende">
          {photo?.legende || localFallback?.legende}
        </p>
      )}
      
      {/* Indicateur de source (dev only) */}
      {process.env.NODE_ENV === 'development' && (
        <span 
          className="source-indicator" 
          title={sourceTitle}
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            fontSize: '20px',
            filter: 'drop-shadow(0 0 2px white)'
          }}
        >
          {sourceIndicator}
        </span>
      )}
    </div>
  );
}

// ================================================
// COMPOSANT GALERIE PRINCIPAL
// ================================================
export default function Galerie({ photos = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [loadErrors, setLoadErrors] = useState(new Set());
  
  // Fusionner les photos Google avec les fallbacks locaux
  const mergedPhotos = useMemo(() => {
    // Si pas de photos Google, utiliser les locales
    if (!photos || photos.length === 0) {
      console.log('📁 Utilisation des images locales uniquement');
      return LOCAL_IMAGES;
    }
    
    // Mapper les photos Google avec fallback local
    return photos.map((photo, index) => {
      const localFallback = LOCAL_IMAGES[index] || LOCAL_IMAGES[0];
      const googleUrls = parseGoogleUrl(photo.url);
      
      return {
        ...photo,
        googleUrls,
        localFallback,
        index,
        // Pour la lightbox
        fullSrc: googleUrls?.full || localFallback.url,
        thumbSrc: googleUrls?.thumb || localFallback.url,
        fallbackSrc: localFallback.url
      };
    });
  }, [photos]);
  
  // URLs pour la lightbox
  const lightboxImages = useMemo(() => 
    mergedPhotos.map(p => p.fullSrc),
    [mergedPhotos]
  );
  
  // Préchargement des images visibles
  useEffect(() => {
    if (mergedPhotos.length === 0) return;
    
    // Précharger les 4 premières images
    const preloadCount = Math.min(4, mergedPhotos.length);
    for (let i = 0; i < preloadCount; i++) {
      const img = new Image();
      img.src = mergedPhotos[i].thumbSrc;
    }
  }, [mergedPhotos]);
  
  const handleImageClick = useCallback((index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  }, []);
  
  const handleMovePrev = useCallback(() => {
    setPhotoIndex((photoIndex + mergedPhotos.length - 1) % mergedPhotos.length);
  }, [photoIndex, mergedPhotos.length]);
  
  const handleMoveNext = useCallback(() => {
    setPhotoIndex((photoIndex + 1) % mergedPhotos.length);
  }, [photoIndex, mergedPhotos.length]);
  
  // Si aucune photo disponible
  if (mergedPhotos.length === 0) {
    return (
      <Section id="galerie">
        <TitreSection>Galerie photos</TitreSection>
        <div className="galerie-empty">
          <p>Aucune photo disponible pour le moment</p>
        </div>
      </Section>
    );
  }
  
  return (
    <Section id="galerie">
      <TitreSection>Galerie photos</TitreSection>
      
      <div className="galerie-grid">
        {mergedPhotos.map((photo, idx) => (
          <GalerieImage
            key={photo.id || idx}
            photo={photo}
            localFallback={photo.localFallback}
            onClick={handleImageClick}
            index={idx}
          />
        ))}
      </div>
      
      {/* Lightbox */}
      {isOpen && (
        <Suspense fallback={<div className="lightbox-loading">Chargement...</div>}>
          <Lightbox
            mainSrc={lightboxImages[photoIndex]}
            nextSrc={lightboxImages[(photoIndex + 1) % lightboxImages.length]}
            prevSrc={lightboxImages[(photoIndex + lightboxImages.length - 1) % lightboxImages.length]}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={handleMovePrev}
            onMoveNextRequest={handleMoveNext}
            imageTitle={mergedPhotos[photoIndex]?.legende}
            imageCaption={
              loadErrors.has(photoIndex) 
                ? "Image Google non disponible - Version locale affichée" 
                : null
            }
            onImageLoad={() => {
              setLoadErrors(prev => {
                const next = new Set(prev);
                next.delete(photoIndex);
                return next;
              });
            }}
            onImageError={() => {
              console.error(`Erreur lightbox pour image ${photoIndex}`);
              setLoadErrors(prev => new Set(prev).add(photoIndex));
              // Fallback vers l'image locale
              if (mergedPhotos[photoIndex]?.fallbackSrc) {
                lightboxImages[photoIndex] = mergedPhotos[photoIndex].fallbackSrc;
              }
            }}
          />
        </Suspense>
      )}
      
      {/* Indicateur de mode (dev) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="galerie-debug">
          <small>
            Mode: {photos.length > 0 ? 'Hybride (Google + Local)' : 'Local uniquement'} | 
            Images: {mergedPhotos.length}
          </small>
        </div>
      )}
    </Section>
  );
}
