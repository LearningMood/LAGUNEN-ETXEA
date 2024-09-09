import ParagrapheCenter from "../Layout/ParagrapheCenter";
import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";
import Slider from "react-slick";

function Avis ({data}) {
// Traiter les avis avant de retourner le composant
const processedAvis = data && data.length > 0 
    ? data.map(item => {
        const [description_avis, description_auteur] = item.avis.split(';').map(str => str.trim());
        return { description_avis, description_auteur };
    })
: []; // Si avisData est vide ou non défini, retourner un tableau vide

console.log('ProcessedAvis : ', processedAvis); // Log des données traitées
console.log('ProcessedAvis : ', processedAvis); // Ici le tableau est prêt
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      };

    if (!data || data.length === 0) {
        return <p>Aucune donnée sur les avis à afficher.</p>;
      }

    return (
        <Section id="avis">
            <TitreSection titre="Avis des Clients" />
            <p className="txt-center">{data[0]?.description}</p> {/* Assure-toi d'afficher la description */}
            {processedAvis.length > 0 ? (
            <Slider {...settings}>
                {processedAvis.map((avisItem, index) => (
                <blockquote key={index} className="avis-slide">
                    <p className="description">{avisItem.description_avis}</p>
                    <p className="auteur">- {avisItem.description_auteur}</p>
                </blockquote>
                ))}
            </Slider>
            ) : (
            <p>Aucun avis disponible.</p>
            )}
      </Section>
    );
  }
export default Avis;