import { fetchSheets } from "./client.js";

export async function fetchAllTabs({ nocache = false, sheet = null } = {}) {
  const { data } = await fetchSheets({ nocache, sheet });
  console.log("Mon classeur complet :", data);
  return data; // { faq: [...], intro: [...], ... }
}
