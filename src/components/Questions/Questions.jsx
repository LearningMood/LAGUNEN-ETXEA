import ParagrapheCenter from "../Layout/ParagrapheCenter";
import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";

function Questions({ dataIntro, questions }) {
  const titre = dataIntro?.titre || "Questions fréquentes";
  const description = dataIntro?.description || "";
  const items = Array.isArray(questions) ? questions : [];

  if (!items.length) {
    return (
      <Section id="faq">
        <TitreSection titre={titre} />
{ description &&<ParagrapheCenter texte={description} /> }
      
        <p>Aucune question trouvée.</p>
      </Section>
    );
  }

  const html = (s) => ({ __html: String(s ?? "") });

  return (
    <Section id="faq">
      <TitreSection titre={titre} />
      { description &&<ParagrapheCenter texte={description} /> }

      <ul className="questions">
        {items.map((it, i) => (
          <li key={i}>
            {/* Si ton contenu contient du HTML, garde dangerouslySetInnerHTML.
                Sinon, remplace par du texte simple: <h3>{it.question}</h3> */}
            <h3 className="questions_intitule" dangerouslySetInnerHTML={html(it.question)} />
            <p className="questions_reponse" dangerouslySetInnerHTML={html(it.reponse)} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default Questions;
