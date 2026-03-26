import { useState } from "react";
import ParagrapheCenter from "../Layout/ParagrapheCenter";
import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";

function Questions({ header, questions }) {
  const titre = header?.titre || "Questions fréquentes";
  const description = header?.description || "";
  const items = Array.isArray(questions) ? questions : [];
  const [openIndex, setOpenIndex] = useState(0); // première ouverte par défaut

  if (!items.length) {
    return (
      <Section id="faq">
        <TitreSection titre={titre} />
        {description && <ParagrapheCenter texte={description} />}
        <p>Aucune question trouvée.</p>
      </Section>
    );
  }

  const html = (s) => ({ __html: String(s ?? "") });

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i); // re-clic ferme la question
  };

  return (
    <Section id="faq">
      <TitreSection titre={titre} />
      {description && <ParagrapheCenter texte={description} />}

      <ul className="questions">
        {items.map((it, i) => (
          <li key={i} className={`question-item ${openIndex === i ? "is-open" : ""}`}>
            <h3
              className="questions_intitule"
              onClick={() => toggle(i)}
              dangerouslySetInnerHTML={html(it.question)}
            />
            <div className="questions_reponse-wrapper">
              <p className="questions_reponse" dangerouslySetInnerHTML={html(it.reponse)} />
  </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default Questions;