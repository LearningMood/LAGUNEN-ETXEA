

export function normalizeAll(data) {
  const arr = (x) => Array.isArray(x) ? x : [];

  // site_meta: [{key, value}] -> { key: value, ... }
  const siteMetaArray = arr(data.site_meta);
  const siteMeta = siteMetaArray.reduce((acc, row) => {
    if (row && row.key != null) acc[String(row.key)] = row.value;
    return acc;
  }, {});

  // console.log('Dans Normalize : ', data);

  const photos = arr(data.photos)
    .filter(p => p.url)                // seulement si url non vide
    .sort((a, b) => (a.ordre || 0) - (b.ordre || 0));

  // faq: sécuriser
  const faqBlock = Array.isArray(data.faq) ? data.faq[0] : data.faq;
  // faqBlock.titre, faqBlock.description, faqBlock.questions (array {question,reponse})
  // tarif: filtre lignes vides
  const nonEmpty = (obj) => Object.values(obj || {}).some(v => String(v ?? '').trim() !== '');
  // const tarif = arr(data.tarif).filter(nonEmpty);

  const tarif = arr(data.tarif).sort((a, b) => new Date(a.start_date) - new Date(b.start_date));

  const tarifInfos = arr(data.tarif_infos).reduce((acc, { key, value }) => {
    if (key != null) acc[String(key)] = value ?? '';
    return acc;
  }, {});


  const mapMeta = arr(data.map_meta).reduce((acc, { key, value }) => {
    if (key != null) acc[String(key)] = value;
    return acc;
  }, {});

  const emplacement = arr(data.emplacement)
    .filter(b => b && (b.titre || b.description))
    .sort((a, b) => (Number(a.ordre) || 0) - (Number(b.ordre) || 0));

  const transport = arr(data.transport)
    .filter(b => b && (b.titre || b.description))
    .sort((a, b) => (Number(a.ordre) || 0) - (Number(b.ordre) || 0));

  //avis: filtre minimal
  const avis = arr(data.avis).filter(nonEmpty);
  const contact = arr(data.contact)[0] || {};

  const equipements = arr(data.equipements)
    .filter(e => e && (e.actif === true || e.actif === 'TRUE' || e.actif === 1 || e.actif === '1' || e.actif === undefined))
    .map(e => ({
      label: String(e.label || '').trim(),
      picto: String(e.picto || '').trim(),
      alt: String(e.alt || e.label || '').trim(),
      categorie: String(e.categorie || '').trim(),
      ordre: Number(e.ordre) || 0
    }))
    .filter(e => e.label) // garde seulement les lignes valides
    .sort((a, b) => a.ordre - b.ordre);

  return {
    siteMeta,
    sectionsMeta: arr(data.sections_meta),
    tarif,
    tarifInfos,
    // remarques: arr(data.remarques),   // à traiter selon ton besoin d’affichage
    photos,
    avis,
    transport,
    faq: faqBlock, // pas compris, mais ok
    contact,
    equipements,
    mapMeta,        // { map_provider, map_url, lat, lng, zoom }
    emplacement,    // [{section,titre,description,ordre}, ...]
    transport,      // [{titre,description,ordre}, ...]

  };
}

