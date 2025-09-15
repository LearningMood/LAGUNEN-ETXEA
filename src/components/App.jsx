import useSheetsData from "../hooks/useSheetsData.js";
import Avis from "./Avis/Avis.jsx";
import Contact from "./Contact/Contact.jsx";
import Emplacement from "./Emplacement/Emplacement.jsx";
import Footer from "./Footer/Footer.jsx";
import Galerie from "./Galerie/Galerie.jsx";
import GaleriePictos from "./GaleriePictos.jsx";
import Header from "./Header/Header.jsx";
import Nav from "./Header/Nav.jsx";
import Intro from "./Intro/Intro.jsx";
import Logement from "./Logement/Logement.jsx";
import Questions from "./Questions/Questions.jsx";
import Tarifs from "./Tarifs/Tarifs.jsx";
import Remarques from "./Remarques/Remarques.jsx";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function App() {
    const { loading, error, data } = useSheetsData();

    if (loading) return <p>Chargement…</p>;
    if (error) return <p>Erreur : {error}</p>;

    const { siteMeta, tarif, faq, equipements, avis, contact } = data;

    const sectionsMeta = data.sectionsMeta || data.sections_meta || [];

    const ALLOWED = new Set(["logement", "tarif", "avis", "faq"]);
    const ORDER_DEFAULT = { logement: 1, tarif: 2, avis: 3, faq: 4 };
    const LABEL_FALLBACK = { logement: "Le logement", tarif: "Tarifs", avis: "Avis", faq: "Questions fréquentes" };

    const navSections = sectionsMeta
        .filter(s => s && ALLOWED.has(String(s.section)))
        .map(s => ({
            id: String(s.section),
            label: (s.titre && String(s.titre).trim()) || LABEL_FALLBACK[s.section],
            order: Number(s.ordre) || ORDER_DEFAULT[s.section] || 99
        }))
        .sort((a, b) => a.order - b.order);
    console.log(data);

    const intro = sectionsMeta.find(s => s.section === "intro");
    const logement = sectionsMeta.find(s => s.section === "logement")
    const remarques = sectionsMeta.find(s => s.section === "remarques")

    return (
        //   <pre>{JSON.stringify(data, null, 2)}</pre>;
        <div className="app">
            <Nav sections={navSections} />
            <Header />
            <Intro intro={intro} />
            <Galerie />
            <Logement logement={logement} />
            <Remarques remarques={remarques} />
            {/* <GaleriePictos data={data.equipements} /> */}
            {/* <Tarifs data={data.tarif} /> */}
            {/* <Avis data={data.avis} /> */}
            {/* <Emplacement data={data.emplacement} /> */}
            {/* <Contact data={data.contact} /> */}
            {/* <Questions data={data.faq} /> */}
            <Footer />
        </div>

    )


}
