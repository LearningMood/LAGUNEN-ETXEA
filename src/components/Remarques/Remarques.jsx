import ParagrapheCenter from "../Layout/ParagrapheCenter";
import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";

function Remarques({ header }) {
  // console.log('REMARQUES', header);
  if (!header) {
    return <p>Aucune donnée sur les remarques à afficher.</p>;
  }
  return (
    <Section id="remarques">
      <TitreSection titre={header.titre} />
      <ParagrapheCenter texte={header.description} />
    </Section>
  )

}
export default Remarques;

