import ParagrapheCenter from "./Layout/ParagrapheCenter";
import Section from "./Layout/Section";
import TitreSection from "./Layout/TitreSection";

function GaleriePictos({ header, data = [] }) {
  console.log("Equipements Data : ", data);
  if (!data || data.length === 0) {
    return <p>Aucun équipement disponible.</p>;
  }
  return (
    <Section id="equipements">
      <TitreSection titre="Les équipements" />
      { header && <ParagrapheCenter texte={header.description} />}
        <div className="display-grid">
        {data.map((equipement) => (
          <figure key={equipement.id} className="picto picto--equipement">
            <img src={`/pictos/${equipement.picto}.svg`} alt={`icone ${equipement.label}`} />
            <figcaption>{equipement.label}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
export default GaleriePictos;
