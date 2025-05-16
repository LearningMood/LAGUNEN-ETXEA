  /**
   * Interroge l’API Google Sheets
   *  Fait une requête batchGet pour récupérer tous les onglets
  */ 
// src/api/sheets.js
import { valuesToObjects } from './valuesToObjects';
import { parseFaq } from './parseFaq';

const SHEET_ID = import.meta.env.VITE_SHEET_ID   || process.env.REACT_APP_SHEET_ID;
const API_KEY  = import.meta.env.VITE_GOOGLE_API_KEY || process.env.REACT_APP_GOOGLE_API_KEY;
const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}`;

export async function fetchAllTabs() {
  // 1) titres d’onglets
  const metaUrl = `${BASE_URL}?fields=sheets.properties.title&key=${API_KEY}`;
   console.log('✅ Les onglets :', metaUrl); 
  const metaRes = await fetch(metaUrl);
  if (!metaRes.ok) throw new Error('Impossible de récupérer la liste des onglets');
  const meta = await metaRes.json();
  const tabNames = meta.sheets.map(s => s.properties.title);
  console.log ('✅ Les titre des onglets : ', tabNames);

  // 2) batchGet (POST pour éviter l’URL trop longue)
  const ranges = tabNames
  .map(t => encodeURIComponent(`${t}!A1:Z`))
  .join('&ranges=');

const batchUrl = `${BASE_URL}/values:batchGet?ranges=${ranges}&key=${API_KEY}`;
const dataRes  = await fetch(batchUrl);

  if (!dataRes.ok) throw new Error(`HTTP ${dataRes.status} sur batchGet`);
  const json = await dataRes.json();
  if (json.error) throw new Error(json.error.message);

  // 3) transformation
  const structured = json.valueRanges.reduce((acc, vr) => {
  const [name] = vr.range.split('!');
  acc[name] = name === 'faq'
    ? parseFaq(vr.values ?? [])
    : valuesToObjects(vr.values ?? []);
  return acc;
}, {});
return structured;

}
