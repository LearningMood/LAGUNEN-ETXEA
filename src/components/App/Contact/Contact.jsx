import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";

function Contact({ data }) {
    return(
        data.length > 0 ? (
            data.map((contact, index) => (
              <Section id="logement" key={index}>
                <TitreSection titre={contact.titre} />
                <p className="txt-center">{contact.description}</p>
              </Section>
            ))
          
        ) : (
          <p>Aucune donnée sur le contact à afficher.</p>
        )
    )
}
export default Contact;