# Lagunen-Etxea
Page de présentation de la location

<!-- INFOS -->

Les différences entre les scripts package.json :

## 📋 Analyse des scripts

### Scripts actuels :
- **`sync`** : Synchronise les données Google Sheets → JSON local
- **`dev`** : Lance le serveur de développement
- **`build`** : Compile pour la production
- **`predeploy`** : S'exécute AVANT `deploy` (crée une copie 404.html pour le routing SPA)
- **`deploy`** : Publie sur GitHub Pages


## 📝 Points importants

1. **`predeploy`** copie `index.html` vers `404.html` pour que le routing SPA fonctionne sur GitHub Pages
2. **`gh-pages -d dist`** publie le dossier `dist/` sur la branche `gh-pages`
3. **Pas besoin de `sync`** à chaque deploy si les données n'ont pas changé
4. GitHub Pages se met à jour automatiquement (~2-5 min après le deploy)

## 🔄 Workflow de mise à jour

### **Cas 1 : Mise à jour des DONNÉES (textes, tarifs, etc.)**

```bash
# 1. Modifier dans Google Sheets
# 2. Générer le nouveau JSON
npm run sync  # OU manuellement via Apps Script

# 3. Vérifier en local
npm run dev

# 4. Déployer
npm run deploy  # fait automatiquement build + deploy
```

### **Cas 2 : Mise à jour du CODE (composants, styles)**

```bash
# 1. Faire vos modifications
# 2. Tester
npm run dev

# 3. Déployer
npm run deploy
```

### **Cas 3 : Mise à jour COMPLÈTE (données + code)**

```bash
# 1. Synchroniser les données
npm run sync

# 2. Développer/tester
npm run dev

# 3. Tout déployer
npm run deploy
```

## ✨ Scripts optimisés suggérés

```json
{
  "scripts": {
    "sync": "node scripts/sync-sheets.cjs",
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    
    // Workflow simplifié
    "update-data": "npm run sync && git add . && git commit -m 'Update data' && git push",
    "deploy": "npm run build && cp dist/index.html dist/404.html && gh-pages -d dist",
    
    // Tout-en-un
    "update-all": "npm run sync && npm run deploy && git add . && git commit -m 'Update site' && git push"
  }
}
```

## 🎯 Commandes pratiques

### Pour une mise à jour quotidienne :
```bash
# Si juste les données ont changé dans Google Sheets
npm run sync          # Récupère les nouvelles données
npm run deploy        # Publie sur GitHub Pages
```

### Pour garder une trace Git :
```bash
npm run sync
git add .
git commit -m "Mise à jour tarifs janvier 2025"
git push
npm run deploy
```
