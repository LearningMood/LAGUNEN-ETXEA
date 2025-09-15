export function normalizeAll(data) {
  const arr = (x) => Array.isArray(x) ? x : [];

  // site_meta: [{key, value}] -> { key: value, ... }
  const siteMetaArray = arr(data.site_meta);
  const siteMeta = siteMetaArray.reduce((acc, row) => {
    if (row && row.key != null) acc[String(row.key)] = row.value;
    return acc;
  }, {});

  // tarif: filtre lignes vides
  const nonEmpty = (obj) => Object.values(obj || {}).some(v => String(v ?? '').trim() !== '');
  const tarif = arr(data.tarif).filter(nonEmpty);

  // faq: sécuriser
  const faqBlock = arr(data.faq)[0] || {};
  const faq = {
    titre: String(faqBlock.titre ?? '') || 'Questions fréquentes',
    description: String(faqBlock.description ?? ''),
    questions: arr(faqBlock.questions).filter(q =>
      (q && (q.question || q.reponse))
    )
  };

  // equipements / transport / avis: filtre minimal
  const equipements = arr(data.equipements).filter(nonEmpty);
  const transport   = arr(data.transport).filter(nonEmpty);
  const avis        = arr(data.avis).filter(nonEmpty);
  const contact     = arr(data.contact)[0] || {};

  return {
    siteMeta,
    sectionsMeta: arr(data.sections_meta),
    tarif,
    // remarques: arr(data.remarques),   // à traiter selon ton besoin d’affichage
    equipements,
    avis,
    transport,
    faq,
    contact
  };
}
