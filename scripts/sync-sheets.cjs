// ================================================
// 1. SCRIPT NODE.JS POUR GÉNÉRER LE JSON LOCAL
// ================================================
// scripts/sync-sheets.js


const fs = require('fs');
const path = require('path');

// Lire et parser le .env
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    if (!line || line.startsWith('#')) return;
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length) {
      let value = valueParts.join('=').trim();
      // Enlever les guillemets si présents
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      process.env[key.trim()] = value;
    }
  });
  console.log('✅ Fichier .env chargé manuellement');
}

// Vérifier que ça marche
console.log('📍 URL depuis .env:', process.env.VITE_WEBAPP_URL);
const https = require('https');


// Configuration
const CONFIG = {
  SHEETS_API_URL: process.env.VITE_WEBAPP_URL || process.env.SHEETS_API_URL || 'https://script.google.com/macros/s/AKfycbz6lUJedZe3VwrUqyeqSgXojlQNqpvdJrBfWIOii2YJjexANIu5OsITvU3dSOCyGtlY/exec',
  
  // Où sauvegarder les données
  OUTPUT_DIR: path.join(process.cwd(), 'src', 'data'),
  OUTPUT_FILE: 'sheets-data.json',
  
  // Fichier de backup au cas où
  BACKUP_FILE: 'sheets-data.backup.json',
  
  // Timestamp pour savoir quand les données ont été synchronisées
  TIMESTAMP_FILE: 'last-sync.json'
};

// Fonction pour récupérer les données depuis Google Sheets
async function fetchSheetsData() {
  return new Promise((resolve, reject) => {
    console.log('📡 Récupération des données depuis Google Sheets...');
    
    https.get(CONFIG.SHEETS_API_URL, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          console.log('✅ Données récupérées avec succès');
          resolve(parsed);
        } catch (error) {
          reject(new Error('Impossible de parser le JSON: ' + error.message));
        }
      });
    }).on('error', reject);
  });
}

// Fonction pour sauvegarder les données localement
async function saveDataLocally(data) {
  // Créer le dossier si nécessaire
  if (!fs.existsSync(CONFIG.OUTPUT_DIR)) {
    fs.mkdirSync(CONFIG.OUTPUT_DIR, { recursive: true });
  }
  
  const outputPath = path.join(CONFIG.OUTPUT_DIR, CONFIG.OUTPUT_FILE);
  const backupPath = path.join(CONFIG.OUTPUT_DIR, CONFIG.BACKUP_FILE);
  const timestampPath = path.join(CONFIG.OUTPUT_DIR, CONFIG.TIMESTAMP_FILE);
  
  // Faire un backup de l'ancienne version si elle existe
  if (fs.existsSync(outputPath)) {
    console.log('📦 Création d\'un backup...');
    fs.copyFileSync(outputPath, backupPath);
  }
  
  // Sauvegarder les nouvelles données
  const dataToSave = {
    ...data,
    _metadata: {
      lastSync: new Date().toISOString(),
      source: 'google-sheets',
      version: '1.0'
    }
  };
  
  fs.writeFileSync(outputPath, JSON.stringify(dataToSave, null, 2));
  console.log(`✅ Données sauvegardées dans ${outputPath}`);
  
  // Sauvegarder le timestamp
  fs.writeFileSync(timestampPath, JSON.stringify({
    lastSync: new Date().toISOString(),
    success: true
  }, null, 2));
}

// Fonction principale de synchronisation
async function syncSheets() {
  try {
    console.log('🔄 Démarrage de la synchronisation...');
    console.log(`📍 API URL: ${CONFIG.SHEETS_API_URL}`);
    
    const data = await fetchSheetsData();
    await saveDataLocally(data);
    
    console.log('✨ Synchronisation terminée avec succès!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation:', error.message);
    process.exit(1);
  }
}

// Lancer la synchronisation
if (require.main === module) {
  syncSheets();
}

module.exports = { syncSheets, fetchSheetsData };
