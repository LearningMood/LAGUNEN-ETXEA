import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";

function Tarifs({ data }) {
  if (!data || data.length === 0) {
    return <p>Aucune donnée sur les tarifs à afficher.</p>;
  }

  // Séparer la description par les sauts de ligne
  const lignes = data[0].description.split('\n'); // J'utilise '\n' comme séparateur
    return (
      data.map((tarif, index) => (
        <Section id={tarif.section} key={index} >
          <TitreSection titre={tarif.titre} />
          <ul>
            {lignes.map((ligne, index) => (
              <li key={index}>{ligne}</li>
            ))}
          </ul>
          <p className="" dangerouslySetInnerHTML={{ __html: tarif.ajout }} />
          <p className="" dangerouslySetInnerHTML={{ __html: tarif.description_inclus }} />
          <p className="r" dangerouslySetInnerHTML={{ __html: tarif.description_periodes }} />

              <table>
          <thead>

              <tr>
                <td>Tableau</td>
                <td>1</td>
                <td>2</td>
              </tr>
          </thead>
          <tbody>
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
              </tr>
          </tbody>
  
        </table>
            </Section>
      ))
    );
  }
  export default Tarifs;
  