import Section from "./Layout/Section";
import TitreSection from "./Layout/TitreSection";

function GaleriePictos({ data }) {
    return (
      <Section id="equipements">
        <TitreSection titre="Les equipements" />
        <div className="display-flex">
            <div className="picto picto--equipement">PICTO</div>
            <div className="picto picto--equipement">PICTO</div>
            <div className="picto picto--equipement">PICTO</div>
            <div className="picto picto--equipement">PICTO</div>
            <div className="picto picto--equipement">PICTO</div>
            <div className="picto picto--equipement">PICTO</div>
        </div>
      </Section>
    );
  }
  export default GaleriePictos;
  