import ParagrapheCenter from "../Layout/ParagrapheCenter";
import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";

function Logement( { logement }) {

  console.log('LOGEMENT' , logement);

  // Vérifie d'abord si les données existent
  if (!logement) return <p>Aucune donnée sur le logement à afficher.</p>;

  // Si les données existent, on les rend
  return (
      <Section id="logement">
          <TitreSection titre={logement.titre} />
          <ParagrapheCenter texte={logement.description} />
    </Section>
  );
};

export default Logement;
