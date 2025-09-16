import { useState } from 'react';
import Section from '../Layout/Section';
import TitreSection from '../Layout/TitreSection';
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

function Galerie({ photos }) {
  // console.log('GALERIE', photos);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  if (!photos || photos.length === 0) {
    return <p>Aucune photo pour l’instant.</p>;
  }

  return (
    <Section id="galerie" wrapperSup="wrapper--lg">
      <div className="mosaique">
        {photos.map((p, index) => (
          <figure key={index} className="mosaique-img">
            <img
              src={p.url}
              alt={p.legende || `Photo ${index + 1}`}
              className="photo-thumbnail"
              onClick={() => {
                setPhotoIndex(index);
                setIsOpen(true);
              }}
              loading="lazy"
              onError={(e) => {
                console.warn("Image KO:", e.currentTarget.src);
                // e.currentTarget.src = "/img/placeholder.jpg";
              }}
            />
            {p.legende && (
              <figcaption className="caption">{p.legende}</figcaption>
            )}
          </figure>
        ))}
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={photos[photoIndex].url}
          nextSrc={photos[(photoIndex + 1) % photos.length].url}
          prevSrc={photos[(photoIndex + photos.length - 1) % photos.length].url}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + photos.length - 1) % photos.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % photos.length)
          }
          imageCaption={photos[photoIndex].legende || ""}
        />
      )}
    </Section>
  );
}
export default Galerie;
