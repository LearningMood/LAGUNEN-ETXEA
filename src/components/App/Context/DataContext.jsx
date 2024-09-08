import React, { createContext, useState, useEffect } from "react";

// Créer un contexte
export const SheetDataContext = createContext();

export const SheetDataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch('/exported-data.json');
            const result = await response.json();
            console.log(result);
            setData(result);  // Stocke toutes les données dans un seul state
        } catch (error) {
            setError('Erreur lors de la récupération des données');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <SheetDataContext.Provider value={{
            data,
            loading,
            error
        }}>
            {children}
        </SheetDataContext.Provider>
    );
};
