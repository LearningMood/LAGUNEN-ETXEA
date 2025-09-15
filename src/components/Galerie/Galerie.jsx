import { useEffect, useState } from 'react';
import Section from '../Layout/Section';
import TitreSection from '../Layout/TitreSection';
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // Importer le style de la lightbox

function Galerie() {
  const [images, setImages] = useState([]); // État pour les chemins des images
  const [isOpen, setIsOpen] = useState(false); // État pour contrôler l'ouverture de la lightbox
  const [photoIndex, setPhotoIndex] = useState(0); // Index de la photo active dans la lightbox

  useEffect(() => {
    const importAllImages = async () => {
      const imageModules = import.meta.glob('/src/assets/img/*.{png,jpg,jpeg,svg}');
      const imagePaths = await Promise.all(
        Object.entries(imageModules).map(async ([path, importImage]) => {
          const { default: src } = await importImage();
          return src;
        }),
      );
      setImages(imagePaths);
      console.log('Images : ', imagePaths); // Placer le console.log ici pour vérifier les chemins
    };

    importAllImages();
  }, []);

  if (images.length === 0) {
    return <p>Chargement des photos...</p>; // Affichage pendant le chargement des images
  }

  return (
    <Section id="galerie">
      <TitreSection titre="Les photos" />
      <div className="mosaique">
        {images.map((image, index) => (
          <figure key={index} className=" mosaique-img">
          <img
            src={image}
            alt={`Photo appartement Hendaye ${index + 1}`}
            className="photo-thumbnail"
            onClick={() => {
              setPhotoIndex(index); // Met à jour l'index de la photo
              setIsOpen(true); // Ouvre la lightbox
            }}
          />
          </figure>
        ))}

        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]} // Image actuellement affichée
            nextSrc={images[(photoIndex + 1) % images.length]} // Image suivante
            prevSrc={images[(photoIndex + images.length - 1) % images.length]} // Image précédente
            onCloseRequest={() => setIsOpen(false)} // Ferme la lightbox
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % images.length)
            }
          />
        )}
      </div>
    </Section>
  );
}
export default Galerie;
