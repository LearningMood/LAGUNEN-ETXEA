// components/Loading/LoaderPictosMarquee.jsx
export default function LoadingPictos({ icons = [], message = "Chargement…" }) {
  // Duplique la liste pour une boucle continue
  const roll = [...icons, ...icons];

  return (
    <div className="full-flex-center loader-wrap">
      <div className="marquee" aria-hidden="true">
        {roll.map((src, i) => (
          <img src={src} alt="" key={i} className="icon" loading="eager" />
        ))}
      </div>
      <h3 className="msg">{message}</h3>
    </div>
  );
}
