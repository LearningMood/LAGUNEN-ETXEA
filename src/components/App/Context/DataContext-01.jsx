import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { filterDataBySection } from "../../../utils";

// Créer un contexte
export const SheetDataContextFirst = createContext();

export const SheetDataProviderFirst = ({ children }) => {
    const [sheetData, setSheetData] = useState([]);  // Contient toutes les données
    const [loading, setLoading] = useState(true);  // Gérer le chargement
    const [error, setError] = useState(null);  // Gérer les erreurs

    // Fonction pour charger les données
    const fetchSheetData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:3000/get-sheets-data', {
                method: 'GET',
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                console.log('1. Données récupérées depuis le backend :', data); // Log complet
    
                // Assure-toi que data a une propriété values
                if (data && data.values) {
                    console.log('Données à stocker dans sheetData :', data.values);
                    setSheetData(data.values); // Mettre à jour les données
                } else {
                    console.error('Données reçues mal formatées :', data);
                    setError('Format des données inattendu.');
                }
            } else {
                setError('Erreur lors de la requête : ' + response.statusText);
            }
        } catch (error) {
            setError('Erreur lors de la récupération des données : ' + error.message);
        } finally {
            setLoading(false);
        }
    };
    
    

    useEffect(() => {
        fetchSheetData();
    }, []);
    useEffect(() => {
        if (sheetData.length > 0) {
            console.log('2. SheetData mis à jour :', sheetData); // Log des données une fois mises à jour
        }
    }, [sheetData]);

    // Filtrage des données par section (logement, tarifs, etc.)
    const introData = filterDataBySection(sheetData, 'intro');
    const logementData = filterDataBySection(sheetData, 'logement');
    const remarquesData = filterDataBySection(sheetData, 'remarques');
    const emplacementData = filterDataBySection(sheetData, 'emplacement');
    const tarifsData = filterDataBySection(sheetData, 'tarifs'); 
    const contactData = filterDataBySection(sheetData, 'contact'); 
    const faqData = filterDataBySection(sheetData, 'faq'); 

    return (
        <SheetDataContextFirst.Provider value={{
            introData,
            logementData,
            remarquesData,
            emplacementData,
            tarifsData,
            contactData,
            faqData,
            loading, // Transmettre l'état de chargement
            error // Transmettre l'état d'erreur
        }}>
            {children}
        </SheetDataContextFirst.Provider>
    );
};
