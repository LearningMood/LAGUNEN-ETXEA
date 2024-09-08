import ParagrapheCenter from "../Layout/ParagrapheCenter";
import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";

function Logement( { data }) {

  // Vérifie d'abord si les données existent
  if (!data || data.length === 0) {
    return <p>Aucune donnée sur le logement à afficher.</p>;
  }

  // Si les données existent, on les rend
  return (
    data.map((logement, index) => (
      <Section id={logement.section} key={index}>
          <TitreSection titre={logement.titre} />
          <ParagrapheCenter texte={logement.description} />
    </Section>
      ))
  );
};

export default Logement;
