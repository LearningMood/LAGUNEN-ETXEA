import { useState, useCallback } from 'react';

export default function GalleryImage({ 
  image, 
  index, 
  onClick, 
  onError 
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const handleClick = useCallback(() => {
    onClick(index);
  }, [onClick, index]);
  
  const handleError = useCallback((e) => {
    console.warn(`Zut, erreur image: ${image.legende}`);
    setHasError(true);
    setIsLoading(false);
    
    // Notifier le parent
    if (onError) {
      onError(image.original || image.url);
    }
    
    // Utiliser l'image de backup si disponible
    if (image.backupUrl && e.currentTarget.src !== image.backupUrl) {
      e.currentTarget.src = image.backupUrl;
    }
  }, [image, onError]);
  
  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);
  
  return (
    <figure className="mosaique-img" onClick={handleClick}>
      {isLoading && (
        <div className="image-placeholder">
          <div className="spinner" />
        </div>
      )}
      
      <img
        src={image.thumb}
        alt={image.legende || `Photo ${index + 1}`}
        className={`photo-thumbnail ${isLoading ? 'loading' : ''}`}
        loading="lazy"
        onError={handleError}
        onLoad={handleLoad}
      />
      
    </figure>
  );
}
