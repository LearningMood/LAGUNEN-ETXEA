import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";

function Questions({ data }) {
    if (!data || data.length === 0) {
        return <p>Aucune donnée sur les FAQ à afficher.</p>;
      }
    return (
        data.map((faqItem, index) => (
            <Section id="faq" key={index}>
                <TitreSection titre={faqItem.titre} />
                {faqItem.questions && faqItem.questions.length > 0 ? (
                    <ul className="questions">
                        {faqItem.questions.map((q, idx) => (
                            <li key={idx}>
                                <p className="questions_intitule">{q.question}</p>
                                <p className="questions_reponse" dangerouslySetInnerHTML={{ __html: q.reponse }} />
                            </li>
                        ))}
                    </ul>
                ) : (
                        <p>Aucune question trouvée.</p>
                    )}
               </Section>
            ))
    )
}
export default Questions;