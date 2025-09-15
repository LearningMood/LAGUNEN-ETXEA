import Section from "./Layout/Section";
import TitreSection from "./Layout/TitreSection";

function GaleriePictos({ data }) {
  console.log("Equipements Data : ", data);
    return (
      <Section id="equipements">
        <TitreSection titre="Les équipements" />
        <div className="display-grid">
          { data.map((equipement)=>(
            <figure key={equipement.id} className="picto picto--equipement">
              <img src={`/pictos/${equipement.picto}.svg`} alt={`icone ${equipement.label}`}/>
              <figcaption>{equipement.label}</figcaption>
            </figure>
          ))}
        </div>
      </Section>
    );
  }
  export default GaleriePictos;
  