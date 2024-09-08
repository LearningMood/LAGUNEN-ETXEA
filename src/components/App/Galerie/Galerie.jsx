import { useEffect, useState } from 'react';
import Section from '../Layout/Section';
import TitreSection from '../Layout/TitreSection';

function Galerie() {
  const [images, setImages] = useState([]);

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

  return (
    <Section id="galerie">
      <TitreSection titre="Les photos" />
      <div className="mosaique">
        {images.map((image, index) => (
          <figure key={index} className=" mosaique-img">
            <img src={image} alt={`Image ${index + 1}`} />
          </figure>
        ))}
      </div>
    </Section>
  );
}
export default Galerie;
