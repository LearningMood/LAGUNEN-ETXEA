import { useContext, useEffect } from "react";
import Avis from "../Avis/Avis";
import Contact from "../Contact/Contact";
import { SheetDataContext } from "../Context/DataContext";
import Emplacement from "../Emplacement/Emplacement";
import Footer from "../Footer/Footer";
import Galerie from "../Galerie/Galerie";
import GaleriePictos from "../GaleriePictos";
import Header from "../Header/Header";
import Nav from "../Header/Nav";
import Intro from "../Intro/Intro";
import Logement from "../Logement/Logement";
import Questions from "../Questions/Questions";
import Tarifs from "../Tarifs/Tarifs";
import Remarques from "../Remarques/Remarques";

function Main() {
    const { data, loading, error } = useContext(SheetDataContext);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    const sections = [
        ...(data.logement || []),
        ...(data.tarif || []),
        ...(data.emplacement || []),
        ...(data.faq || [])
    ];

    return (
        <div className="app">
            <Nav sections={sections}/>
            <Header />
            <Intro data={data.intro} />
            <Galerie />
            <Logement data={data.logement} />
            <Remarques data={data.remarques} />
            <GaleriePictos data={data.equipements} />
            <Tarifs data={data.tarif} />
            <Avis data={data.avis} />
            <Emplacement data={data.emplacement} />
            <Contact data={data.contact} />
            <Questions data={data.faq} />
            <Footer />
        </div>
    );
}

export default Main;
