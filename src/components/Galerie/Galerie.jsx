import { useEffect, useMemo, useState, Suspense, lazy } from "react";
import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";

const Lightbox = lazy(() => import("react-image-lightbox"));
import "react-image-lightbox/style.css";

function toSrcs(p) {
  const s = String(p?.url || "");
  const mId = s.match(/[?&]id=([^&#]+)/);
  if (mId) {
    const id = mId[1];
    return {
      thumb: `https://drive.google.com/thumbnail?id=${id}&sz=w900`,
      full:  `https://drive.google.com/uc?export=download&id=${id}`,
    };
  }
  const base = s.split("=")[0];
  return { thumb: `${base}=w900`, full: `${base}=w2400` };
}

export default function Galerie({ photos = [] }) {
// BACKUP
const backupImages = [
    { url: "/img/Lagunen-Etxea-location-Hendaye-chambre1-01.jpg", legende: "Terrasse avec jardin" },
    { url: "/img/Lagunen-Etxea-location-Hendaye-chambre1-02.jpg", legende: "Salon lumineux" },
    { url: "/img/Lagunen-Etxea-location-Hendaye-chambre2-06.jpg", legende: "Chambre confortable" },
    { url: "/img/Lagunen-Etxea-location-Hendaye-chambre2-07.jpg", legende: "Chambre confortable" },
    { url: "/img/Lagunen-Etxea-location-Hendaye-chambre2-sdb.jpg", legende: "Chambre confortable" },
    { url: "/img/Lagunen-Etxea-location-Hendaye-chambre3-01.jpg", legende: "Chambre confortable" },
    { url: "/img/Lagunen-Etxea-location-Hendaye-chambre3-02.jpg", legende: "Chambre confortable" },
    { url: "/img/Lagunen-Etxea-location-Hendaye-cuisine--04.jpg", legende: "Chambre confortable" },
    { url: "/img/Lagunen-Etxea-location-Hendaye-cuisine--05.jpg", legende: "Chambre confortable" },
    { url: "/img/Lagunen-Etxea-location-Hendaye-cuisine-01.jpg", legende: "Chambre confortable" },
    { url: "/img/Lagunen-Etxea-location-Hendaye-cuisine-02.jpg", legende: "Chambre confortable" },
    { url: "/img/Lagunen-Etxea-location-Hendaye-cuisine-03.jpg", legende: "Chambre confortable" },
    { url: "/img/Lagunen-Etxea-location-Hendaye-jardin-01.jpg", legende: "Chambre confortable" },
    { url: "/img/Lagunen-Etxea-location-Hendaye-salon-01.jpg", legende: "Chambre confortable" },
    { url: "/img/Lagunen-Etxea-location-Hendaye-salon-02.jpg", legende: "Chambre confortable" },
    { url: "/img/Lagunen-Etxea-location-Hendaye-salon-03.jpg", legende: "Chambre confortable" },
    { url: "/img/Lagunen-Etxea-location-Hendaye-salon-04.jpg", legende: "Chambre confortable" },
    { url: "/img/Lagunen-Etxea-location-Hendaye-salon-05.jpg", legende: "Chambre confortable" },
    { url: "/img/Lagunen-Etxea-location-Hendaye-salon-06.jpg", legende: "Chambre confortable" },
    { url: "/img/Lagunen-Etxea-location-Hendaye-salon-07.jpg", legende: "Chambre confortable" },
    { url: "/img/Lagunen-Etxea-location-Hendaye-sdb-01.jpg", legende: "Chambre confortable" },
    { url: "/img/Lagunen-Etxea-location-Hendaye-sdb-02.jpg", legende: "Chambre confortable" },
    { url: "/img/Lagunen-Etxea-location-Hendaye-sdb-03.jpg", legende: "Chambre confortable" },
    { url: "/img/Lagunen-Etxea-location-Hendaye-terrasse-01.jpg", legende: "Chambre confortable" },
    { url: "/img/Lagunen-Etxea-location-Hendaye-terrasse-02.jpg", legende: "Chambre confortable" },
    { url: "/img/Lagunen-Etxea-location-Hendaye-terrasse-03.jpg", legende: "Chambre confortable" },
    { url: "/img/Lagunen-Etxea-location-Hendaye-terrasse-04.jpg", legende: "Chambre confortable" },
    { url: "/img/Lagunen-Etxea-location-Hendaye-terrasse-05.jpg", legende: "Chambre confortable" },
  ];

const [useBackup, setUseBackup] = useState(false);
const [failedGoogleImages, setFailedGoogleImages] = useState(new Set());

// Basculer automatiquement vers backup si Google Drive plante
useEffect(() => {
  if (photos.length > 0 && failedGoogleImages.size > photos.length * 0.5) {
    setUseBackup(true);
  }
}, [failedGoogleImages, photos.length]);

const imagesToUse = useBackup || !photos?.length ? backupImages : photos;

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const items = useMemo(
    () => photos.filter(Boolean).map(p => ({ ...p, ...toSrcs(p) })),
    [photos]
  );

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  if (!imagesToUse.length) return <p>Aucune photo pour l’instant.</p>;

  return (
    <Section id="galerie" wrapperSup="wrapper--lg">
      <TitreSection titre="Les photos" />
      <div className="mosaique">
        {items.map((p, index) => (
          <figure key={index} className="mosaique-img">
            <img
              src={p.thumb}
              alt={p.legende || `Photo ${index + 1}`}
              className="photo-thumbnail"
              loading="lazy"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              onClick={() => { setPhotoIndex(index); setIsOpen(true); }}
              onError={(e) => {
                console.warn("Image KO:", e.currentTarget.src);
                e.currentTarget.src = "/img/Lagunen-Etxea-location-Hendaye-chambre1-02.jpg"; // un visuel par défaut
              }}
            />
            {/* {p.legende && <figcaption className="caption">{p.legende}</figcaption>} */}
          </figure>
        ))}
      </div>

      {isOpen && (
        <Suspense fallback={null}>
          <Lightbox
            mainSrc={items[photoIndex].full}
            nextSrc={items[(photoIndex + 1) % items.length].full}
            prevSrc={items[(photoIndex + items.length - 1) % items.length].full}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + items.length - 1) % items.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % items.length)
            }
            // imageCaption={items[photoIndex].legende || ""}
            enableZoom
            reactModalProps={{ ariaHideApp: false }}
          />
        </Suspense>
      )}
    </Section>
  );
}
