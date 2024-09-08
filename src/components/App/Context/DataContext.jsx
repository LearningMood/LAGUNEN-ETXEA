import React, { createContext, useState, useEffect } from "react";

// Créer un contexte
export const SheetDataContext = createContext();

export const SheetDataProvider = ({ children }) => {
    const [introData, setIntroData] = useState([]);
    const [logementData, setLogementData] = useState([]);
    const [remarquesData, setRemarquesData] = useState([]);
    const [tarifData, setTarifData] = useState([]);
    const [avisData, setAvisData] = useState([]);
    const [equipementsData, setEquipementsData] = useState([]);
    const [emplacementData, setEmplacementData] = useState([]);
    const [faqData, setFaqData] = useState([]);
    const [contactData, setContactData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const baseURL = process.env.NODE_ENV === 'production' 
    ? 'https://lagunen-etxea.com'  // URL de votre backend en production
    : 'http://localhost:3000';           // URL locale pour le développement

    const fetchDataForSheet = async (sheetName, setData) => {
        try {
            const response = await fetch(`${baseURL}/get-sheets-data/${sheetName}`);
            if (!response.ok) throw new Error(`Erreur lors de la requête pour ${sheetName}`);
            const data = await response.json();
            setData(data.values); // Mets à jour les données de l'onglet
        } catch (error) {
            setError(`Erreur lors de la récupération des données pour l'onglet ${sheetName} : ${error.message}`);
        }
    };

    // Fonction pour charger toutes les données des différents onglets
    const fetchAllData = async () => {
        setLoading(true);
        try {
            await Promise.all([
                fetchDataForSheet('intro', setIntroData),
                fetchDataForSheet('logement', setLogementData),
                fetchDataForSheet('remarques', setRemarquesData),
                fetchDataForSheet('tarif', setTarifData),
                fetchDataForSheet('avis', setAvisData),
                fetchDataForSheet('equipements', setEquipementsData),
                fetchDataForSheet('emplacement', setEmplacementData),
                fetchDataForSheet('faq', setFaqData),
                fetchDataForSheet('contact', setContactData),
                // Ajouter d'autres fetch pour chaque onglet si nécessaire
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    return (
        <SheetDataContext.Provider value={{
            introData,
            logementData,
            remarquesData,
            tarifData,
            avisData,
            equipementsData,
            emplacementData,
            faqData,
            contactData,
            loading,
            error
        }}>
            {children}
        </SheetDataContext.Provider>
    );
};
