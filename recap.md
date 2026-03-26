MAJ 26/03/2026
npm run dev
npm run predeploy
npm run deploy

// ================================================
// 🏗️ ARCHITECTURE COMPLÈTE DU PROJET
// ================================================

/*
📊 FLUX DE DONNÉES
==================

1. Google Sheets (source)
   ↓ [Manuel: Apps Script]
2. JSON local (src/data/sheets-data.json)
   ↓ [Import direct]
3. React App
   ↓
4. GitHub Pages (hébergement statique)

📁 IMAGES
=========
- Primaire: Google Drive (URLs dynamiques)
- Fallback: Images locales dans public/img/
*/

// ================================================
// 1. STRUCTURE DES FICHIERS ET LEURS RÔLES
// ================================================

const ARCHITECTURE = {
  // 📂 src/
  "src/": {
    
    // 📄 App.jsx - Point d'entrée principal
    "App.jsx": {
      role: "Composant racine qui orchestre toute l'application",
      imports: [
        "useSheetsData (hook)",
        "Tous les composants de sections"
      ],
      responsabilités: [
        "Appeler useSheetsData() pour récupérer les données",
        "Distribuer les données aux composants enfants",
        "Gérer l'état de chargement global"
      ],
      flux: `
        1. Monte le composant
        2. Appelle useSheetsData()
        3. Affiche loading ou erreur
        4. Rend les sections avec les données
      `
    },

    // 📂 hooks/
    "hooks/useSheetsData.js": {
      role: "Hook personnalisé pour charger les données JSON",
      imports: [
        "../data/sheets-data.json (données statiques)",
        "../utils/normalize (transformation)"
      ],
      responsabilités: [
        "Charger le JSON local instantanément",
        "Normaliser les données (snake_case → camelCase)",
        "Gérer les états: loading, error, data",
        "Option de fallback sur API (mode legacy)"
      ],
      flux: `
        MODE LOCAL:
        1. Import du JSON (synchrone, 0ms)
        2. normalizeAll() transforme les données
        3. Return { data, loading: false }
        
        MODE API (ancien):
        1. Check sessionStorage (cache)
        2. Fetch depuis Google Apps Script
        3. Attente réseau (2-5 secondes)
        4. Parse + normalize
        5. Return { data, loading: false }
      `
    },

    "hooks/useGalleryImages.js": {
      role: "Gestion intelligente des images avec fallback",
      responsabilités: [
        "Tenter de charger depuis Google Drive",
        "Basculer sur images locales si échec",
        "Tracking des images échouées",
        "Mode backup automatique"
      ]
    },

    // 📂 utils/
    "utils/normalize.js": {
      role: "Transformation et normalisation des données",
      fonctions: {
        "normalizeAll()": "Transforme toute la structure de données",
        "normalizeSections()": "snake_case → camelCase pour sections",
        "normalizeKeyValue()": "Transforme [{key, value}] → {key: value}"
      },
      pourquoi: "Uniformise les données peu importe la source"
    },

    "utils/imageHelpers.js": {
      role: "Utilitaires pour les URLs d'images Google",
      fonctions: {
        "parseGoogleUrl()": "Extrait ID et génère URLs optimisées",
        "preloadImages()": "Précharge les images pour performance",
        "checkImageUrl()": "Vérifie si une image est accessible"
      }
    },

    // 📂 data/
    "data/sheets-data.json": {
      role: "Données statiques exportées de Google Sheets",
      structure: `{
        "fromCache": false,
        "data": {
          "site_meta": [{key: "titre", value: "..."}],
          "sections_meta": [...],
          "tarif": [...],
          "photos": [...],
          "faq": [{ questions: [...] }],
          // etc...
        }
      }`,
      mise_à_jour: "Manuelle via Apps Script + copier/coller"
    },

    "data/galleryBackup.js": {
      role: "Configuration des images locales de secours",
      contenu: "Liste des images dans public/img/"
    },

    // 📂 api/ (Legacy - plus utilisé mais conservé)
    "api/client.js": {
      role: "[LEGACY] Appels API vers Google Apps Script",
      status: "Conservé mais non utilisé en mode local"
    },

    "api/sheets.js": {
      role: "[LEGACY] Wrapper pour fetchSheets",
      status: "Conservé pour compatibilité"
    },

    // 📂 components/
    "components/": {
      "Gallery/": {
        "index.jsx": "Composant galerie principal",
        "GalleryImage.jsx": "Image individuelle avec fallback",
        flux: `
          1. Reçoit photos depuis App.jsx
          2. useGalleryImages() gère le fallback
          3. Tente Google Drive
          4. Bascule sur local si échec
          5. Affiche avec Lightbox
        `
      },
      "Tarifs.jsx": {
        role: "Affiche tableau des tarifs",
        données: "data.tarif + data.tarifInfos"
      },
      "FAQ.jsx": {
        role: "Affiche questions/réponses",
        données: "data.faq[0].questions"
      }
      // ... autres composants
    }
  },

  // 📂 public/
  "public/": {
    "img/": {
      role: "Images locales de backup",
      avantages: [
        "Chargement instantané",
        "Pas de dépendance externe",
        "Fonctionne hors ligne"
      ]
    }
  },

  // 📂 scripts/
  "scripts/": {
    "sync-sheets.cjs": {
      role: "Script Node.js pour synchroniser Google Sheets → JSON",
      problème_initial: "Ne lisait pas le .env",
      solution: "require('dotenv').config() ou variable d'env directe"
    }
  },

  // 🔧 Configuration
  "package.json": {
    scripts: {
      "sync": "Récupère données depuis Google Sheets",
      "dev": "Serveur de développement",
      "build": "Compile pour production",
      "deploy": "Publie sur GitHub Pages"
    }
  },

  "vite.config.js": {
    role: "Configuration du bundler",
    important: "base: '/nom-repo/' pour GitHub Pages"
  }
};

// ================================================
// 2. FLUX D'EXÉCUTION COMPLET
// ================================================

const EXECUTION_FLOW = `
DÉMARRAGE DE L'APPLICATION
===========================

1. index.html charge le bundle JS
   ↓
2. main.jsx monte <App />
   ↓
3. App.jsx s'exécute:
   a. const { data, loading } = useSheetsData()
   b. SI loading → affiche spinner
   c. SINON → rend tous les composants
   ↓
4. useSheetsData() (MODE LOCAL):
   a. import sheetsData from '../data/sheets-data.json'
   b. normalizeAll(sheetsData.data) [INSTANTANÉ]
   c. return { data: normalized, loading: false }
   ↓
5. Composants reçoivent les données:
   - <Tarifs rows={data.tarif} />
   - <Gallery photos={data.photos} />
   - <FAQ questions={data.faq[0].questions} />
   ↓
6. Gallery tente de charger images Google:
   a. Parse URL Google Drive → génère thumb + full
   b. SI échec → bascule sur /img/local.jpg
   c. Affiche avec indicateur source
`;

// ================================================
// 3. POURQUOI C'ÉTAIT LENT AVANT ?
// ================================================

const PERFORMANCE_ANALYSIS = {
  
  "🐌 ANCIEN SYSTÈME (Dynamique via API)": {
    
    problemes: {
      
      "1. Latence réseau Google Apps Script": {
        durée: "2-5 secondes",
        causes: [
          "Cold start du script (~2s)",
          "Lecture des sheets (~1s)",
          "Sérialisation JSON (~0.5s)",
          "Transfert réseau (~0.5s)"
        ],
        détails: `
          Google Apps Script n'est PAS une API rapide:
          - Exécution sur serveurs Google partagés
          - Pas de cache côté serveur efficace
          - Limite de 30 secondes d'exécution
          - Throttling si trop de requêtes
        `
      },
      
      "2. CORS et redirections": {
        impact: "+500ms à 1s",
        raison: "L'URL Apps Script fait plusieurs redirections"
      },
      
      "3. Pas de CDN": {
        problème: "Données servies depuis un seul datacenter Google",
        impact: "Latence variable selon localisation utilisateur"
      },
      
      "4. Blocking render": {
        problème: "React attend les données avant d'afficher",
        impact: "Page blanche pendant 2-5 secondes"
      },
      
      "5. Parsing côté client": {
        problème: "JSON.parse() sur gros payload",
        impact: "100-200ms sur mobile"
      }
    },
    
    timeline_typique: `
      0ms    - Page charge
      100ms  - React monte
      150ms  - useSheetsData démarre fetch
      2500ms - Réponse Google Apps Script [🔴 GOULOT]
      2600ms - Parse JSON
      2650ms - Normalize data  
      2700ms - React render
      2800ms - Images commencent à charger
      5000ms - Site utilisable
    `
  },

  "⚡ NOUVEAU SYSTÈME (JSON Local)": {
    
    avantages: {
      
      "1. Import synchrone": {
        durée: "0ms",
        méthode: "Import ES6 du JSON bundlé",
        détails: "Le JSON est dans le bundle JS = instantané"
      },
      
      "2. Pas de réseau": {
        gain: "2-5 secondes économisées",
        bonus: "Fonctionne hors ligne"
      },
      
      "3. CDN automatique": {
        avec: "GitHub Pages + Cloudflare",
        impact: "Données servies depuis edge proche"
      },
      
      "4. Optimisations build": {
        "Tree shaking": "Données non utilisées supprimées",
        "Minification": "JSON compressé",
        "Gzip": "Compression HTTP ~70%"
      }
    },
    
    timeline_nouveau: `
      0ms   - Page charge
      50ms  - React monte + données déjà là
      60ms  - Normalize (en mémoire)
      80ms  - React render complet
      100ms - Images commencent à charger
      500ms - Site complètement utilisable
      
      🎯 GAIN: ~4.5 secondes !
    `
  },

  "📊 COMPARAISON": {
    "Temps avant affichage": {
      ancien: "2-5 secondes",
      nouveau: "< 100ms",
      gain: "95% plus rapide"
    },
    "Taille bundle": {
      ancien: "~200KB (sans données)",
      nouveau: "~250KB (avec données)",
      impact: "Négligeable avec compression"
    },
    "Fiabilité": {
      ancien: "Dépend de Google Apps Script",
      nouveau: "100% autonome"
    }
  }
};

// ================================================
// 4. ARCHITECTURE SANS SERVEUR
// ================================================

const SERVERLESS_ARCHITECTURE = `
OUI, votre site fonctionne SANS SERVEUR !

COMMENT ÇA MARCHE ?
===================

1. BUILD TIME (npm run build):
   - Vite compile tout en fichiers statiques
   - JSON embarqué dans le bundle JS
   - HTML + CSS + JS = fichiers statiques

2. HÉBERGEMENT (GitHub Pages):
   - Simple serveur de fichiers statiques
   - Pas d'exécution côté serveur
   - CDN gratuit inclus

3. RUNTIME (Navigateur):
   - React s'exécute côté client
   - Données déjà présentes (JSON local)
   - Images : tentative Google → fallback local

AVANTAGES:
- Gratuit (GitHub Pages)
- Ultra rapide (CDN)
- Scalable à l'infini
- Sécurisé (pas de serveur à hacker)
- Fonctionne hors ligne (avec images locales)

INCONVÉNIENTS:
- Données non dynamiques en temps réel
- Mise à jour manuelle nécessaire
- Pas de fonctionnalités serveur (auth, DB, etc.)

PARFAIT POUR:
✅ Sites vitrines
✅ Locations saisonnières
✅ Portfolios
✅ Documentation
`;

// ================================================
// 5. RÉSUMÉ DES RELATIONS
// ================================================

const RELATIONS_MAP = `
App.jsx
  ├── useSheetsData() → data/sheets-data.json
  │     └── normalize() → transforme les données
  │
  ├── <Gallery photos={data.photos} />
  │     ├── useGalleryImages() → gère fallback
  │     ├── imageHelpers.parseGoogleUrl() → parse URLs
  │     └── public/img/*.jpg → backup local
  │
  ├── <Tarifs rows={data.tarif} />
  │     └── données directes du JSON
  │
  └── <FAQ questions={data.faq} />
        └── données directes du JSON

FLUX DE MISE À JOUR:
Google Sheets → Apps Script → JSON → Git → GitHub Pages
`;

export { 
  ARCHITECTURE, 
  EXECUTION_FLOW, 
  PERFORMANCE_ANALYSIS, 
  SERVERLESS_ARCHITECTURE,
  RELATIONS_MAP 
};