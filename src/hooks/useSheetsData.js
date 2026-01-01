// ================================================
// ALTERNATIVE : VERSION SIMPLIFIÉE POUR LOCAL ONLY
// ================================================
// Si vous voulez une version plus simple sans le code API

import { normalizeAll } from "../utils/normalize";
import localData from '../data/data.json';

export default function useSheetsDataSimple() {
  try {
    // Normaliser une seule fois
    const normalized = normalizeAll(localData.data);
    
    // Retourner directement les données (pas de loading !)
    return {
      loading: false,
      error: null,
      data: normalized
    };
  } catch (err) {
    console.error('Erreur JSON local:', err);
    
    // Structure de fallback pour éviter les erreurs
    return {
      loading: false,
      error: `Erreur: ${err.message}`,
      data: {
        sectionsMeta: [],
        sections_meta: [],
        siteMeta: {},
        site_meta: {},
        tarif: [],
        photos: [],
        tarifInfos: {},
        tarif_infos: {},
        faq: [],
        avis: [],
        equipements: [],
        emplacement: [],
        transport: [],
        mapMeta: {},
        map_meta: {}
      }
    };
  }
}

