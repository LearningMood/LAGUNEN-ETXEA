import ParagrapheCenter from "../Layout/ParagrapheCenter";
import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";

function Remarques({ data }) {
  if (!data || data.length === 0) {
    return <p>Aucune donnée sur les remarques à afficher.</p>;
  }
    return (
      data.map((remarque, index) => (
        <Section id={remarque.section} key={index}>
          <TitreSection titre={remarque.titre} />
          <ParagrapheCenter texte={remarque.description} />
      </Section>
      ))
    );
  }
  export default Remarques;

