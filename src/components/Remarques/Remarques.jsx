import ParagrapheCenter from "../Layout/ParagrapheCenter";
import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";

function Remarques({ remarques }) {
  console.log('REMARQUES', remarques);
  if (!remarques) {
    return <p>Aucune donnée sur les remarques à afficher.</p>;
  }
  return (
    <Section id="remarques">
      <TitreSection titre={remarques.titre} />
      <ParagrapheCenter texte={remarques.description} />
    </Section>
  )

}
export default Remarques;

