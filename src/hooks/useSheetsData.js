// hooks/useSheetsData.js
import { useEffect, useState } from "react";
import { fetchAllTabs } from "../api/sheets";
import { normalizeAll } from "../utils/normalize";

const CACHE_KEY = "sheets-cache:v1";       // ↑ bump si tu changes le schéma
const CACHE_TTL = 5 * 60 * 1000;           // 5 min

export default function useSheetsData() {
  const [state, setState] = useState({ loading: true, error: null, data: null });

  useEffect(() => {
    let cancelled = false;

    // 1) essayer le cache synchronement (instantané)
    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (raw) {
        const { t, data } = JSON.parse(raw);
        if (Date.now() - t < CACHE_TTL && data) {
          const norm = normalizeAll(data);
          if (!cancelled) setState({ loading: false, error: null, data: norm });
        }
      }
    } catch {}

    // 2) revalider en arrière-plan
    (async () => {
      try {
        const api = await fetchAllTabs({ nocache: false, cacheBuster: false }); // ⚠️ en PROD: Laisse le cache serveur
        if (cancelled) return;
        const norm = normalizeAll(api);
        setState({ loading: false, error: null, data: norm });
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), data: api }));
      } catch (e) {
        if (!cancelled) {
          // si on n'avait rien en cache, on affiche l'erreur
          setState(prev => prev.data ? prev : { loading: false, error: e.message, data: null });
        }
      }
    })();

    return () => { cancelled = true; };
  }, []);

  return state;
}
