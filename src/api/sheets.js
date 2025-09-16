import { fetchSheets } from "./client.js";

export async function fetchAllTabs({ nocache = false, sheet = null } = {}) {
  const { data } = await fetchSheets({ nocache, sheet });
  console.log("Mon classeur complet :", data);
  return data; // { faq: [...], intro: [...], ... }
}


//   // 3) transformation
//   const structured = json.valueRanges.reduce((acc, vr) => {
//   const [name] = vr.range.split('!');
//   acc[name] = name === 'faq'
//     ? parseFaq(vr.values ?? [])
//     : valuesToObjects(vr.values ?? []);
//   return acc;
// }, {});
// return structured;

// }
