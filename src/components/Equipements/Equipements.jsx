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
  const titre = header?.titre || "Équipements";
  const description = header?.description || "Ce que propose le logement";

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

      <div className="space-y-8">
        {Object.entries(groups).map(([cat, list]) => (
          <div key={cat}>
            {cat !== "Divers" && <h3 className="font-semibold mb-3">{cat}</h3>}
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {list.map((e, i) => (
                <li key={`${cat}-${i}`} className="flex items-center gap-3 p-3 rounded-xl border bg-white">
                  <img
                    src={`/pictos/${e.picto}.svg`}
                    alt={e.alt || e.label}
                    width={28}
                    height={28}
                    className="shrink-0"
                    onError={(ev) => { ev.currentTarget.src = "/pictos/baignoire.svg"; }}
                  />
                  <span className="text-sm">{e.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
