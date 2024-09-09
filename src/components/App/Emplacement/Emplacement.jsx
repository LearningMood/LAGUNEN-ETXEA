import ParagrapheCenter from "../Layout/ParagrapheCenter";
import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";

function Emplacement({ data}) {
    if (!data || data.length === 0) {
        return <p>Aucune donnée sur l'emplacement à afficher.</p>;
      }
    return (
        data.map((emplacement, index)=>(
            <Section id={emplacement.section} key={index}>
                <TitreSection titre={emplacement.titre} />
                <div className="line">
                    <div className="col-50">
                        <div className="map"></div>
                    </div>
                    <div className="col-50">
                    <h3 className="titre-fd" dangerouslySetInnerHTML={{ __html: emplacement.situation_titre }} />
                    <p className="" dangerouslySetInnerHTML={{ __html: emplacement.situation_description }} />
                    <h3 className="titre-fd" dangerouslySetInnerHTML={{ __html: emplacement.deplacer_titre }} />
                    <p className="" dangerouslySetInnerHTML={{ __html: emplacement.deplacer_description }} />
                    </div>
                </div>
            </Section>
        ))
    )
};
export default Emplacement;