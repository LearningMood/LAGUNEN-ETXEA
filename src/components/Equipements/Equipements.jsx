import ParagrapheCenter from "../Layout/ParagrapheCenter";
import Section from "../Layout/Section";
import TitreSection from "../Layout/TitreSection";

function groupBy(arr, key) {
  return arr.reduce((acc, it) => {
    const k = it[key] || "Divers";
    (acc[k] ||= []).push(it);
    return acc;
  }, {});
}

export default function Equipements({ header, items = [] }) {
  const titre = header?.titre || "Les équipements";
  const description = header?.description || "Retrouvez la liste des équipements mis à votre disposition pour un séjour le plus agréable possible.";

  if (!items.length) {
    return (
      <Section id="equipements">
        <TitreSection titre={titre} />
        {description && <ParagrapheCenter texte={description} />}
        <p className="text-gray-600">Aucun équipement renseigné.</p>
      </Section>
    );
  }

  const groups = groupBy(items, "categorie");

  return (
    <Section id="equipements">
      <TitreSection titre={titre} />

      {description && <ParagrapheCenter texte={description} />}

      <div>
        {Object.entries(groups).map(([cat, list]) => (
          <div key={cat}>
            {cat !== "Divers" && <h3>{cat}</h3>}
            <ul>
              {list.map((e, i) => (
                <li key={`${cat}-${i}`}>
                  <img
                    src={`/pictos/${e.picto}.svg`}
                    alt={e.alt || e.label}
                    // width={28}
                    // height={28}
                    onError={(ev) => { ev.currentTarget.src = "/pictos/baignoire.svg"; }}
                  />
                  <span>{e.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
