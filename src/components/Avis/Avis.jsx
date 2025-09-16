import ParagrapheCenter from "../Layout/ParagrapheCenter";
import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";
import Slider from "react-slick";


function formatDateFR(value) {
  try {
    return new Date(value).toLocaleDateString("fr-FR", { year: "numeric", month: "long" });
  } catch {
    return value || "";
  }
}

function Stars({ n = 0 }) {
  const v = Math.max(0, Math.min(10, Number(n) || 0));      // vote sur 10
  const full = Math.round(v / 2);                            // étoiles sur 5
  return (
    <span aria-label={`${v}/10`}>
      {"★".repeat(full)}{"☆".repeat(5 - full)}
    </span>
  );
}

export default function Avis({ header, items = [] }) {
  const titre = header?.titre || "Les avis";
  const description = header?.description || "C’est vous qui en parlez le mieux !";

  // tri anti-chronologique, on garde des champs sûrs
  const slides = (Array.isArray(items) ? items : [])
    .filter(a => a && (a.texte || a.titre))
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    .map(a => ({
      auteur: a.auteur || "Invité",
      titre: a.titre || "",
      texte: a.texte || "",
      date: formatDateFR(a.date),
      vote: Number(a.vote) || 0,
    }));

  if (!slides.length) {
    return (
      <Section id="avis">
        <TitreSection titre={titre} />
        {description && <ParagrapheCenter texte={description} /> }
        <p className="txt-center text-gray-600">Aucun avis disponible pour le moment.</p>
      </Section>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 2 } },
      { breakpoint: 768,  settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Section id="avis" wrapperSup="wrapper--lg">
      <TitreSection titre={titre} />
      {description && <ParagrapheCenter texte={description} />}

      <Slider {...settings}>
        {slides.map((av, i) => (
          <blockquote key={i} className="avis-slide">
            {av.titre && <h3 className="font-medium">{av.titre}</h3>}
            <p className="description">“{av.texte}”</p>
            <footer>
              <Stars n={av.vote} />
              <span> • </span>
              <span>{av.auteur}</span>
              {av.date && <>
                <span> • </span>
                <time dateTime={av.date}>{av.date}</time>
              </>}
            </footer>
          </blockquote>
        ))}
      </Slider>
    </Section>
  );
}


    // return (
    //     <Section id="avis">
    //         <TitreSection titre={header.titre} />
    //         <p className="txt-center txt--lead">{header.description}</p> {/* Assure-toi d'afficher la description */}
    //         {processedAvis.length > 0 ? (
    //         <Slider {...settings}>
    //             {processedAvis.map((avisItem, index) => (
    //             <blockquote key={index} className="avis-slide">
    //                 <p className="description">{avisItem.description_avis}</p>
    //                 <p className="auteur">- {avisItem.description_auteur}</p>
    //             </blockquote>
    //             ))}
    //         </Slider>
