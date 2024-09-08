import ParagrapheCenter from "../Layout/ParagrapheCenter";
import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";

function Avis ({data}) {
    if (!data || data.length === 0) {
        return <p>Aucune donnée sur les avis à afficher.</p>;
      }
    return (
        data.map((avis, index) => (
            <Section id={avis.section} key={index}>
                <TitreSection titre={avis.titre} />
                <p className="txt-center">{avis.description}</p>
          </Section>
          ))
    )
}
export default Avis;