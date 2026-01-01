import useSheetsData from "../hooks/useSheetsData.js";
import Chargement from "./Loading/Chargement.jsx";
import Error from "./Loading/Error.jsx";

import LoadingPictos from "./Loading/LoadingPictos.jsx";
import Header from "./Header/Header.jsx";
import Nav from "./Header/Nav.jsx";
import Intro from "./Intro/Intro.jsx";
import Logement from "./Logement/Logement.jsx";
import Galerie from "./Galerie/Index.jsx";
import Remarques from "./Remarques/Remarques.jsx";
import Tarifs from "./Tarifs/Tarifs.jsx";
import Emplacement from "./Emplacement/Emplacement.jsx";
import GaleriePictos from "./GaleriePictos.jsx";
import Questions from "./Questions/Questions.jsx";
import Avis from "./Avis/Avis.jsx";
import Footer from "./Footer/Footer.jsx";
import Contact from "./Contact/Contact.jsx";



import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function App() {
    const { loading, error, data } = useSheetsData();
    // chemins depuis /public (pas d'import nécessaire)
    const ICONS = [
        "/pictos/wifi.svg", "/pictos/parking.svg", "/pictos/cuisine.svg", "/pictos/lave-linge.svg",
        "/pictos/television.svg", "/pictos/shampoing.svg", "/pictos/cafetiere.svg", "/pictos/draps.svg"
    ];
    if (error) return <Error error={error} />
    // console.log('DANS APP : ', data);

    if (loading) {
        return <LoadingPictos icons={ICONS} message="Chargement en cours..." />;
    }

    // 🔧 Normalisations tolérantes (camelCase OU snake_case)
    const sections = Array.isArray(data.sectionsMeta) ? data.sectionsMeta
        : Array.isArray(data.sections_meta) ? data.sections_meta
            : [];
    const siteMeta = data.siteMeta ?? data.site_meta ?? {};
    const tarifRows = data.tarif ?? [];
    const photos = data.photos ?? [];
    const tarifInfos = data.tarifInfos ?? data.tarif_infos ?? {};
    // bloc FAQ venant de l’API (tableau avec un objet)
    const faqBlock = Array.isArray(data.faq) ? data.faq[0] : data.faq || null;


    // 🧭 Nav filtrée
    const ALLOWED = new Set(["logement", "tarif", "equipements", "avis", "faq", "contact"]);
    const ORDER_DEFAULT = { logement: 1, tarif: 2, equipements: 3, avis: 4, faq: 5, contact: 6 };
    const LABEL_FALLBACK = { logement: "Le logement", tarif: "Tarifs", equipement: "Équipements", avis: "Avis", faq: "Questions fréquentes", contact: "contact" };

    const navSections = sections
        .filter(s => s && ALLOWED.has(String(s.section)))
        .map(s => ({
            id: String(s.section),
            label: (s.titre && String(s.titre).trim()) || LABEL_FALLBACK[s.section],
            order: Number(s.ordre) || ORDER_DEFAULT[s.section] || 99
        }))
        .sort((a, b) => a.order - b.order);

    // 🔎 Sélections de sections (on part TOUJOURS de `sections`)
    const sectionIntro = sections.find?.(s => s.section === "intro") || null;
    const sectionLogement = sections.find?.(s => s.section === "logement") || null;
    const sectionRemarques = sections.find?.(s => s.section === "remarques") || null;
    const sectionTarif = sections.find?.(s => s.section === "tarif") || null;
    const sectionFaq = sections.find?.(s => s.section === "faq") || null;
    const sectionAvis = sections.find?.(s => s.section === "avis") || null;
    const sectionEmplacement = sections.find?.(s => s.section === "emplacement") || null;
    const sectionEquipements = sections.find?.(s => s.section === "equipements") || null;



    return (
        <div className="app">
            <Nav sections={navSections} />
            <Header title={siteMeta["titre_site"]} />
            <Intro header={sectionIntro} />
            <Logement header={sectionLogement} />
            <Galerie photos={photos} />
            <Remarques header={sectionRemarques} />
            <Tarifs header={sectionTarif} rows={tarifRows} infos={tarifInfos} />
            <Emplacement header={sectionEmplacement}
                blocks={data.emplacement}
                transport={data.transport}
                mapMeta={data.mapMeta} />
            <GaleriePictos header={sectionEquipements} data={data.equipements} />
            <Avis header={sectionAvis} items={data.avis} />
            <Questions header={sectionFaq} questions={faqBlock?.questions} />
            <Footer data={siteMeta} />

        </div>
    );
}
