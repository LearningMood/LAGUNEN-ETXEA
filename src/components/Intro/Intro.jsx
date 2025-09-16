import ParagrapheCenter from "../Layout/ParagrapheCenter";
import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";

export default function Intro({ dataIntro }) {
  // console.log('INTRO : ', dataIntro);
  if (!dataIntro) return <p>Aucune donnée d’intro à afficher.</p>;
  return (
    <Section id="intro">
      <TitreSection titre={dataIntro.titre || "Bienvenue"} sup="titre--max" />
      <ParagrapheCenter texte={dataIntro.description || ""} />
    </Section>
  );
}


