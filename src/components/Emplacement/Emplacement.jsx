import ParagrapheCenter from "../Layout/ParagrapheCenter";
import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";

function MapEmbed({ mapMeta }) {
    const provider = (mapMeta?.map_provider || 'google').toLowerCase();

    // Google Maps: URL d'embed fournie dans map_url - infos dans l'onglet map_meta
    if (provider === 'google' && mapMeta?.map_url) {
        return (
            <div className="map">
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

    // Fallback
    return <div className="map"><img src="img/map-fallback.jpg"/></div>;
}

export default function Emplacement({ header, blocks = [], transport = [], mapMeta }) {
    const titre = header?.titre || "L’emplacement";
    const description = header?.description || "";

    return (
        <Section id="emplacement">
            <TitreSection titre={titre} />
            {description && <ParagrapheCenter texte={description} />}

            <div className="line">
                <MapEmbed mapMeta={mapMeta} />

                {/* Textes */}
                <div className="col-50">
                    {blocks.map((b, i) => (
                        <div key={i}>
                            {b.titre && <h3>{b.titre}</h3>}
                            {b.description && <p>{b.description}</p>}
                        </div>
                    ))}

                    {!!transport.length && (
                        <div>
                            <h3>Transports en commun</h3>
                            <ul>
                                {transport.map((t, i) => (
                                    <li key={i}>
                                        {t.titre}{t.description ? ` — ${t.description}` : ''}
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



