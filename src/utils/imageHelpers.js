// ================================================
// 1. utils/imageHelpers.js
// ================================================

/**
 * Parse une URL Google Drive/Photos et retourne les URLs optimisées
 */
export function parseGoogleUrl(url) {
  if (!url) return null;
  
  const urlStr = String(url);
  
  // Google Drive : format ?id=XXX
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
  
  // Google Photos : format avec =w ou =s
  if (urlStr.includes('googleusercontent.com') || urlStr.includes('gstatic.com')) {
    const base = urlStr.split('=')[0];
    return {
      thumb: `${base}=w900`,
      full: `${base}=w2400`,
      original: urlStr,
      source: 'photos'
    };
  }
  
  // URL directe (locale ou autre)
  return {
    thumb: urlStr,
    full: urlStr,
    original: urlStr,
    source: 'direct'
  };
}

/**
 * Précharge une liste d'images
 */
export function preloadImages(urls, count = 4) {
  const toPreload = urls.slice(0, Math.min(count, urls.length));
  
  return toPreload.map(url => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(url);
      img.onerror = () => reject(url);
    });
  });
}

/**
 * Vérifie si une URL d'image est accessible
 */
export async function checkImageUrl(url, timeout = 5000) {
  return new Promise((resolve) => {
    const img = new Image();
    const timer = setTimeout(() => {
      resolve(false);
    }, timeout);
    
    img.onload = () => {
      clearTimeout(timer);
      resolve(true);
    };
    
    img.onerror = () => {
      clearTimeout(timer);
      resolve(false);
    };
    
    img.src = url;
  });
}