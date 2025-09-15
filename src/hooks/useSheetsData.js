import { useEffect, useState } from "react";
import { fetchAllTabs } from "../api/sheets";
import { normalizeAll } from "../utils/normalize";

export default function useSheetsData() {
  const [state, setState] = useState({ loading: true, error: null, data: null });

 useEffect(() => {
    (async () => {
      try {
        const raw = await fetchAllTabs({ nocache: true }); // nocache en phase d'intégration
        const data = normalizeAll(raw);
        setState({ loading: false, error: null, data });
      } catch (e) {
        setState({ loading: false, error: e.message, data: null });
      }
    })();
  }, []);

  return state;
}
