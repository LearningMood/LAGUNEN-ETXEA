//Version 31/12/2025

const SPREADSHEET_ID = SpreadsheetApp.getActive().getId();
const SHEET_NAMES = ['site_meta','sections_meta', 'tarif', 'tarif_infos','remarques', 'equipements', 'photos', 'avis', 'transport', 'map_meta','emplacement','transport', 'faq', 'contact'];
const CACHE_SECONDS = 30;

const names = SpreadsheetApp.openById(SPREADSHEET_ID)
  .getSheets()
  .map(s => s.getName());
Logger.log('ONGLETS DISPONIBLES: ' + JSON.stringify(names));

/** Helpers **/
function isBlank(v){ return v === null || v === undefined || String(v).trim() === ''; }
function rowIsAllBlank(row){ return row.every(isBlank); }
function cleanHeader(h){ return String(h || '').trim(); }
function toISODate(v){
  if (!v) return '';
  if (Object.prototype.toString.call(v) === '[object Date]' && !isNaN(v)) {
    const y=v.getFullYear(), m=String(v.getMonth()+1).padStart(2,'0'), d=String(v.getDate()).padStart(2,'0');
    return `${y}-${m}-${d}`;
  }
  const s = String(v).trim();
  return s.replace(/T.*$/,''); // enlève l'heure si présent
}
function mapRows(headers, rows, { dateKeys=[] } = {}){
  const H = headers.map(cleanHeader);
  const out = [];
  rows.forEach(r => {
    if (!r || rowIsAllBlank(r)) return;
    const obj = {};
    for (let i=0;i<H.length;i++){
      const key = H[i] || `col_${i}`;
      let val = r[i];
      if (dateKeys.includes(key)) {
        val = toISODate(val);
      } else if (typeof val === 'string') {
        val = val.trim();
      }
      obj[key] = val;
    }
    if (Object.values(obj).some(v => !isBlank(v))) out.push(obj);
  });
  return out;
}

/** Lecture FAQ : colonnes `question` + `reponse`, ou fallback `question_reponse` **/
function readFAQ(sheet) {
  const rows = sheet.getDataRange().getValues();
  if (!rows.length) {
    return [{ id: 'faq', section: 'faq', titre: 'Questions fréquentes', description: '', questions: [] }];
  }

  const headers = rows.shift().map(h => String(h || '').trim().toLowerCase());
  const idxQ = headers.indexOf('question');
  const idxA = headers.indexOf('reponse'); // sans accent pour rester simple

  const isBlank = v => v === null || v === undefined || String(v).trim() === '';
  const questions = [];

  rows.forEach(r => {
    const q = r[idxQ];
    const a = r[idxA];
    if (!isBlank(q) || !isBlank(a)) {
      questions.push({
        question: String(q || '').trim(),
        reponse:  String(a || '').trim()
      });
    }
  });

  return [{
    id: 'faq',
    section: 'faq',
    titre: 'Questions fréquentes', // défaut
    description: '',               // défaut
    questions
  }];
}


/** doGet : point d’entrée Web App **/
function doGet(e){
  const params = (e && e.parameter) || {};
  const clear = params.clearcache === 'true'; // …/exec?clearcache=true
  const sheetParam = params.sheet;           // ex: ?sheet=faq
  const bypassCache = params.nocache === 'true';
  const cache = CacheService.getScriptCache();
  const key = sheetParam ? `sheet_${sheetParam}` : 'all';
  

  // 1) Cache
  if (!bypassCache){
    const cached = cache.get(key);
    if (cached){
      return ContentService.createTextOutput(
        JSON.stringify({ fromCache:true, data: JSON.parse(cached) })
      ).setMimeType(ContentService.MimeType.JSON);
    }
  }

  // 2) Lecture Sheets
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const targets = sheetParam ? [sheetParam] : SHEET_NAMES;
  const dateKeysBySheet = {
    tarif: ['start_date','end_date','date'],
    avis:  ['date']
  };

  

  const result = {};
  targets.forEach(name => {
    const sh = ss.getSheetByName(name);
    if (!sh) { result[name] = []; return; }
    const values = sh.getDataRange().getValues();
    if (!values.length) { result[name] = []; return; }

    if (name === 'faq') {
      result[name] = readFAQ(sh);
      return;
    }

  // clé/valeur
  if (name === 'site_meta' || name === 'tarif_infos' || name === 'map_meta') {
    const rows = values.slice(1);
    result[name] = rows
      .filter(r => r[0] !== '' && r[0] != null)
      .map(r => ({ key: String(r[0]).trim(), value: r[1] }));
    return;
  }

  // cas général
  const headers = values[0], body = values.slice(1);
  result[name] = mapRows(headers, body, { dateKeys: (dateKeysBySheet[name] || []) });

  });

  // 3) Mise en cache
  cache.put(key, JSON.stringify(result), CACHE_SECONDS);

  // 4) Réponse JSON
  return ContentService.createTextOutput(
    JSON.stringify({ fromCache:false, data: result })
  ).setMimeType(ContentService.MimeType.JSON);
}
