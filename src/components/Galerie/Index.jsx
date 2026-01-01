// ================================================
// 5. components/Gallery/index.jsx (Composant principal simplifié)
// ================================================

import { useState, useEffect, Suspense, lazy } from "react";
import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";
import { useGalleryImages } from "../../hooks/useGalleryImages";
import GalleryImage from "./GalleryImage";
import { preloadImages } from "../../utils/imageHelpers";

const Lightbox = lazy(() => import("react-image-lightbox"));
import "react-image-lightbox/style.css";

export default function Galerie({ photos = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  
  // Hook personnalisé pour gérer les images
  const { 
    images, 
    isBackupMode, 
    markImageAsFailed, 
    stats 
  } = useGalleryImages(photos);
  
  // Préchargement des premières images
  useEffect(() => {
    if (images.length > 0) {
      const urls = images.map(img => img.thumb);
      preloadImages(urls, 4);
    }
  }, [images]);
  
  // Gestion du scroll body quand lightbox ouverte
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { 
      document.body.style.overflow = prevOverflow; 
    };
  }, [isOpen]);
  
  // Si aucune image
  if (!images.length) {
    return (
      <Section id="galerie">
        <TitreSection titre="Les photos" />
        <p className="no-photos">Aucune photo pour l'instant.</p>
      </Section>
    );
  }
  
  return (
    <Section id="galerie" wrapperSup="wrapper--lg">
      <TitreSection titre="Les photos" />
      
      {/* Indicateur de mode en dev */}
      {process.env.NODE_ENV === 'development' && (
        <div className="gallery-debug">
          Mode: {isBackupMode ? '📁 Local' : '☁️ Google'} | 
          Images: {stats.total} | 
          Backup utilisés: {stats.backupUsed}
        </div>
      )}
      
      <div className="mosaique">
        {images.map((image, index) => (
          <GalleryImage
            key={image.id || index}
            image={image}
            index={index}
            onClick={(idx) => {
              setPhotoIndex(idx);
              setIsOpen(true);
            }}
            onError={markImageAsFailed}
          />
        ))}
      </div>
      
      {/* Lightbox */}
      {isOpen && (
        <Suspense fallback={null}>
          <Lightbox
            mainSrc={images[photoIndex].full}
            nextSrc={images[(photoIndex + 1) % images.length].full}
            prevSrc={images[(photoIndex + images.length - 1) % images.length].full}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % images.length)
            }
            imageTitle={images[photoIndex].legende}
            enableZoom
            reactModalProps={{ ariaHideApp: false }}
            onImageLoadError={() => {
              markImageAsFailed(images[photoIndex].original);
            }}
          />
        </Suspense>
      )}
    </Section>
  );
}
