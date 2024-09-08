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
                <p className="txt-center">{emplacement.description}</p>
            </Section>
        ))
    )
};
export default Emplacement;