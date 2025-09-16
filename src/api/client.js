const WEBAPP_URL = import.meta.env.VITE_WEBAPP_URL;

export async function fetchSheets(params = {}) {

  const q = new URLSearchParams();
  if (params.sheet) q.set("sheet", params.sheet);
  if (params.nocache) q.set("nocache", "true");
  q.set("_", Date.now().toString()); // cache-busting léger

  const url = `${WEBAPP_URL}${q.toString() ? "?" + q.toString() : ""}`; // ici je définis l'URL
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    const txt = await res.text().catch(()=> "");
    throw new Error(`API ${res.status}: ${txt || res.statusText}`);
  }
  const json = await res.json(); // <- { fromCache, data }
  return json;
}