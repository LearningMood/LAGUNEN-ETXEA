import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";

function Contact({ data }) {
  if (!data || data.length === 0) {
    return <p>Aucune donnée sur le contact à afficher.</p>;
  }
    return(
            data.map((contact, index) => (
              <Section id={contact.section} key={index} wrapperSup="wrapper--mini">
                <TitreSection titre={contact.titre} />
                <h3 className="titre-fd titre--basque">{contact.description_nom}</h3>
                <ul className="contact-list">
                  <li><b>Tél : </b><a href={`tel:${contact.description_tel}`} className="txt-center">{contact.description_tel}</a>
                  </li>
                  <li><b>Email : </b><a href={`mailto:${contact.description_mail}`} className="txt-center">{contact.description_mail}</a>
                  </li>
                </ul>
                
              </Section>
            ))
    )
}
export default Contact;