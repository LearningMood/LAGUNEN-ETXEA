/**
 * orchestrateur & stockage global
 * - Fait l’appel de données au 1ᵉʳ montage (useEffect)
 * - Stocke data, loading, error dans un React Context	Utilisé dans toute la React-App (useContext) pour accéder aux données
 */

import React, { createContext, useState, useEffect } from 'react';
import { fetchAllTabs } from '../../../api/sheets';

export const SheetDataContext = createContext();

export function SheetDataProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

useEffect(() => {
  (async () => {
    try {
      const structured = await fetchAllTabs();  // ✅ déjà prêt
      setData(structured);
    } catch (err) { 
      setError(err.message || 'Lecture impossible');
    } finally {
        setLoading(false);
      } 
  })();
}, []);


  return (
    <SheetDataContext.Provider value={{ 
        data, 
        loading, 
        error }}>
      {children}
    </SheetDataContext.Provider>
  );
}
