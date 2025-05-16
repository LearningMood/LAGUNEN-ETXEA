/**
 *  Spécifique à l’onglet FAQ : extrait la 1ʳᵉ ligne (id/titre/description) + construit questions[]	
 *  Appelé par SheetDataContext uniquement pour l’onglet faq
 */
export function parseFaq(values = []) {
  if (!values.length) return { id:'', titre:'', description:'', questions:[] };
  const [headers, ...rows] = values;
  const objs = rows.map(r =>
    Object.fromEntries(headers.map((h,i) => [h, r[i] ?? '']))
  );

  const meta   = objs[0];         // première ligne : id / titre / description
  const questions = objs.slice(1) // lignes suivantes : Q/R
                     .filter(o => o.questions || o.reponses)
                     .map(({questions, reponses}) => ({question: questions, reponse: reponses}));

  // Attention je retourne un tableau, ajout de [...]
    return [{
    id:          meta.id          || 'faq',
    section:       meta.section       || 'faq',
    titre:       meta.titre       || '',
    description: meta.description || '',
    questions
  }];
}
