import ParagrapheCenter from "../Layout/ParagrapheCenter";
import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";

function Intro({ data }) {
    return (
      data.length > 0 ? (
        data.map((intro, index) => (
          <Section id="intro" key={index}>
            <TitreSection titre={intro.titre} sup="titre--max"/>
            <ParagrapheCenter texte={intro.description} />
          </Section>
        ))
      
    ) : (
      <p>Aucune donnée sur le logement à afficher.</p>
    )

    );
  }
  export default Intro;

