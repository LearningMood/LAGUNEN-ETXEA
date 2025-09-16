import ParagrapheCenter from "../Layout/ParagrapheCenter";
import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";

function Logement( { dataIntro }) {

  // console.log('LOGEMENT' , dataIntro);

  // Vérifie d'abord si les données existent
  if (!dataIntro) return <p>Aucune donnée sur le logement à afficher.</p>;

  // Si les données existent, on les rend
  return (
      <Section id="logement">
          <TitreSection titre={dataIntro.titre} />
          <ParagrapheCenter texte={dataIntro.description} />
    </Section>
  );
};

export default Logement;
