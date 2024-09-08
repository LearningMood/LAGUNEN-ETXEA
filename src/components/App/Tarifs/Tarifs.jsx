import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";

function Tarifs({ data }) {
  if (!data || data.length === 0) {
    return <p>Aucune donnée sur les tarifs à afficher.</p>;
  }
    return (
      data.map((tarif, index) => (
        <Section id={tarif.section} key={index}>
          <TitreSection titre={tarif.titre} />
          <p className="txt-center">{tarif.description}</p>

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
  