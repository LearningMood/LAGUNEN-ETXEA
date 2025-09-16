import ParagrapheCenter from "../Layout/ParagrapheCenter";
import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";

function Remarques({ dataIntro }) {
  console.log('REMARQUES', dataIntro);
  if (!dataIntro) {
    return <p>Aucune donnée sur les remarques à afficher.</p>;
  }
  return (
    <Section id="remarques">
      <TitreSection titre={dataIntro.titre} />
      <ParagrapheCenter texte={dataIntro.description} />
    </Section>
  )

}
export default Remarques;

