/**
 * Le convertisseur générique
 * On l’utilise pour tous les onglets classiques (intro, tarif, etc.).
 * Le résultat est un tableau d’objets prêt à l’emploi.
 * Transforme un tableau brut [ [h1,h2], [v11,v12], … ] en [ {h1:v11, h2:v12}, … ]	
 * Appelé par SheetDataContext pour chaque onglet « standard »
 * Transforme un tableau de tableaux (values) issu de Google Sheets
 * en un tableau d’objets, en considérant la première ligne comme en-têtes.
 *
 * @param {Array<Array<any>>} values
 * @returns {Array<Object>}
 */
export function valuesToObjects(values = []) {
  if (!values.length) return [];
  const [headers, ...rows] = values;
  return rows
    .filter(r => r.some(c => c !== ''))          // on saute les lignes vides
    .map(r => Object.fromEntries(headers.map((h,i) => [h, r[i] ?? ''])));
}
