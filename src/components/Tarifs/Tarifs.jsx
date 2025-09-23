import ParagrapheCenter from "../Layout/ParagrapheCenter";
import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";

function f(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
  } catch { return dateStr; }
}

export default function Tarifs({ header, rows = [], infos }) {
  if (!header) return <p>Aucune donnée sur les tarifs à afficher.</p>;
  if (!rows.length) return null;


  // console.log('header : ', header);
  // console.log('DATAINFOS : ', infos);

  return (

    <Section id="tarif">
      <TitreSection titre={header.titre} />
      <ParagrapheCenter texte={header.description} />
      <div className="tableau-tarifs">
        <table>
          <thead>
            <tr>
              <th>Saison</th>
              <th>Nuit (€)</th>
              <th>Semaine (€)</th>
              <th>Du</th>
              <th>Au</th>
              <th>Min. nuits</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.saison}</td>
                <td>{r.prix_nuit ?? ''}</td>
                <td>{r.prix_we ?? ''}</td>
                <td>{f(r.start_date)}</td>
                <td>{f(r.end_date)}</td>
                <td>{r.min_nuits ?? ''}</td>
                <td>{r.note || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Textes complémentaires */}
      <div className="wrapper wrapper--medium">
        <ul className="infos">
          {infos.inclus && (
            <li><strong>INCLUS :</strong> {infos.inclus}</li>
          )}
          {infos.menage && (
            <li><strong>MÉNAGE :</strong> {infos.menage}</li>
          )}
          {infos.non_inclus && (
            <li><strong>NON INCLUS :</strong> {infos.non_inclus}</li>
          )}
          {infos.periodes && (
            <li><strong>MINIMUM NUITÉS :</strong> {infos.periodes}</li>
          )}
          {infos.note && (
            <li><strong>TAXE DE SÉJOUR :</strong> {infos.note}</li>
          )}
        </ul>
      </div>


    </Section>
  );
}
