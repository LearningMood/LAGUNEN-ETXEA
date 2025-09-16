import ParagrapheCenter from "../Layout/ParagrapheCenter";
import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";

function Logement( { header }) {

  // console.log('LOGEMENT' , header);

  // Vérifie d'abord si les données existent
  if (!header) return <p>Aucune donnée sur le logement à afficher.</p>;

  // Si les données existent, on les rend
  return (
      <Section id="logement">
          <TitreSection titre={header.titre} />
          <ParagrapheCenter texte={header.description} />
    </Section>
  );
};

export default Logement;
