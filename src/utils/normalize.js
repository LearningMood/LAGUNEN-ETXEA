

export function normalizeAll(data) {
  const arr = (x) => Array.isArray(x) ? x : [];

  // site_meta: [{key, value}] -> { key: value, ... }
  const siteMetaArray = arr(data.site_meta);
  const siteMeta = siteMetaArray.reduce((acc, row) => {
    if (row && row.key != null) acc[String(row.key)] = row.value;
    return acc;
  }, {});

  console.log('Dans Normalize : ', data);

  const photos = arr(data.photos)
  .filter(p => p.url)                // seulement si url non vide
  .sort((a, b) => (a.ordre||0) - (b.ordre||0));

  // faq: sécuriser
const faqBlock = Array.isArray(data.faq) ? data.faq[0] : data.faq;
// faqBlock.titre, faqBlock.description, faqBlock.questions (array {question,reponse})
    // tarif: filtre lignes vides
  const nonEmpty = (obj) => Object.values(obj || {}).some(v => String(v ?? '').trim() !== '');
  // const tarif = arr(data.tarif).filter(nonEmpty);

  const tarif = arr(data.tarif).sort((a,b)=> new Date(a.start_date) - new Date(b.start_date));

  const tarifInfos = arr(data.tarif_infos).reduce((acc, {key, value}) => {
    if (key != null) acc[String(key)] = value ?? '';
    return acc;
  }, {});

  // equipements / transport / avis: filtre minimal
  const equipements = arr(data.equipements).filter(nonEmpty);
  const transport   = arr(data.transport).filter(nonEmpty);
  const avis        = arr(data.avis).filter(nonEmpty);
  const contact     = arr(data.contact)[0] || {};

  return {
    siteMeta,
    sectionsMeta: arr(data.sections_meta),
    tarif,
    tarifInfos,
    // remarques: arr(data.remarques),   // à traiter selon ton besoin d’affichage
    equipements,
    photos,
    avis,
    transport,
    faq: faqBlock, // pas compris, mais ok
    contact,

  };
}

