import ParagrapheCenter from "../Layout/ParagrapheCenter";
import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";

export default function Intro({ intro }) {
  console.log('INTRO : ', intro);
  if (!intro) return <p>Aucune donnée d’intro à afficher.</p>;
  return (
    <Section id="intro">
      <TitreSection titre={intro.titre || "Bienvenue"} sup="titre--max" />
      <ParagrapheCenter texte={intro.description || ""} />
    </Section>
  );
}


