import ParagrapheCenter from "../Layout/ParagrapheCenter";
import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";

function MapEmbed({ mapMeta }) {
  const provider = (mapMeta?.map_provider || 'google').toLowerCase();

  // 1) Google Maps: URL d'embed fournie dans map_url
  if (provider === 'google' && mapMeta?.map_url) {
    return (
      <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border">
        <iframe
          src={mapMeta.map_url}
          style={{ border: 0, width: "100%", height: "100%" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Carte"
        />
      </div>
    );
  }

  // 2) Leaflet (lat/lng/zoom) — version ultra-light en iframe OpenStreetMap
  const lat = Number(mapMeta?.lat), lng = Number(mapMeta?.lng), zoom = Number(mapMeta?.zoom || 13);
  if (!isNaN(lat) && !isNaN(lng)) {
    const osm = `https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.02}%2C${lat-0.01}%2C${lng+0.02}%2C${lat+0.01}&layer=mapnik&marker=${lat}%2C${lng}`;
    return (
      <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border">
        <iframe
          src={osm}
          style={{ border: 0, width: "100%", height: "100%" }}
          title="Carte"
        />
      </div>
    );
  }

  // Fallback
  return <div className="p-4 text-sm text-gray-600 border rounded-xl">Carte indisponible.</div>;
}

export default function Emplacement({ header, blocks = [], transport = [], mapMeta }) {
  const titre = header?.titre || "L’emplacement";
  const description = header?.description || "";

  return (
    <Section id="emplacement">
      <TitreSection titre={titre} />
      {description && <ParagrapheCenter texte={description} />}

      <div className="line">
        {/* Carte */}
        <MapEmbed mapMeta={mapMeta} />

        {/* Textes */}
        <div className="col-50">
          {blocks.map((b, i) => (
            <div key={i}>
              {b.titre && <h3 className="font-semibold mb-1">{b.titre}</h3>}
              {b.description && <p className="whitespace-pre-line">{b.description}</p>}
            </div>
          ))}

          {!!transport.length && (
            <div>
              <h3 className="font-semibold mb-1">Transports en commun</h3>
              <ul className="list-disc pl-5 space-y-1">
                {transport.map((t, i) => (
                  <li key={i}>
                    <strong>{t.titre}</strong>{t.description ? ` — ${t.description}` : ''}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}



// function Emplacement({ data}) {
//     if (!data || data.length === 0) {
//         return <p>Aucune donnée sur l'emplacement à afficher.</p>;
//       }
//     return (
//         data.map((emplacement, index)=>(
//             <Section id={emplacement.section} key={index}>
//                 <TitreSection titre={emplacement.titre} />
//                 <div className="line">
//                     <div className="col-50">
//                         <div className="map"></div>
//                     </div>
//                     <div className="col-50">
//                     <h3 className="titre-fd" dangerouslySetInnerHTML={{ __html: emplacement.situation_titre }} />
//                     <p className="" dangerouslySetInnerHTML={{ __html: emplacement.situation_description }} />
//                     <h3 className="titre-fd" dangerouslySetInnerHTML={{ __html: emplacement.deplacer_titre }} />
//                     <p className="" dangerouslySetInnerHTML={{ __html: emplacement.deplacer_description }} />
//                     </div>
//                 </div>
//             </Section>
//         ))
//     )
// };
// export default Emplacement;