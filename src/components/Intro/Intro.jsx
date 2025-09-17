import ParagrapheCenter from "../Layout/ParagrapheCenter";
import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";

export default function Intro({ header }) {
  // console.log('INTRO : ', header);
  if (!header) return (
    <Section id="intro">  
      <p>Aucune donnée d’intro à afficher.</p>
    </Section>
  )
  return (
    <Section id="intro">
      <TitreSection titre={header.titre || "Bienvenue"} sup="titre--max" />
      <ParagrapheCenter texte={header.description || "À seulement 1,5 km de la plage, dans une impasse très calme et sans vis à vis, vous pourrez profiter d'un moment paisible après une journée de plage ou de randonnée en montagne."} />
    </Section>
  );
}


