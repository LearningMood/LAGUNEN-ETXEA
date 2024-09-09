function exportJSON() {
  var spreadsheetId = '1bcQHsKSjlly4ByBWYb0VNIPUnpr5X-bTHC9W8_ZwMOM'; // L'ID de la Google Sheets
  var folderId = '1-8JMlLo49w5sYZyUlVaxoTaD_Ur3cqd2';  //  l'ID du dossier DOC
  var sheetNames = ['faq', 'intro', 'logement', 'tarif', 'remarques', 'equipements', 'avis', 'emplacement', 'contact']; // Liste des onglets
  var jsonData = {}; // Stockage final des données
  
  for (var i = 0; i < sheetNames.length; i++) {
    var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetNames[i]);
    var rows = sheet.getDataRange().getValues(); // Obtenir les données de chaque onglet
    var headers = rows[0]; // Les en-têtes
    var sheetData = [];
    var faqQuestions = []; // Array pour stocker les questions/réponses

    // Boucle à travers chaque ligne et transformer en objets JSON
    for (var j = 1; j < rows.length; j++) {
      var rowData = {};
      for (var k = 0; k < headers.length; k++) {
        rowData[headers[k]] = rows[j][k]; // Assigner les valeurs aux clés
      }

      // Pour la section FAQ, regrouper les questions/réponses sous une seule clé
      if (sheetNames[i] === 'faq' && rowData['question_reponse']) {
        var [question, reponse] = rowData['question_reponse'].split(';').map(str => str.trim());
        faqQuestions.push({ question: question, reponse: reponse });
      } else {
        sheetData.push(rowData);
      }
    }

    // Si c'est l'onglet 'faq', ajouter toutes les questions/réponses sous une seule clé "questions"
    if (sheetNames[i] === 'faq') {
      var faqSection = {
        id: 'faq',
        section: 'faq',
        // Extraction des titres et description de la première ligne
        titre: sheet.getRange(2, 3).getValue() || '',  // Titre dans la colonne C (3e colonne), ligne 2
        description: sheet.getRange(2, 4).getValue() || '',  // Description dans la colonne D (4e colonne), ligne 2
        questions: faqQuestions
      };
      jsonData[sheetNames[i]] = [faqSection]; // Ajouter la section FAQ avec les questions
    } else {
      jsonData[sheetNames[i]] = sheetData; // Ajouter les autres onglets normalement
    }
  }

  // Exporter en fichier JSON
  var folder = DriveApp.getFolderById(folderId); // Utilisation d'un dossier Drive spécifique
  var file = folder.createFile('exported-data.json', JSON.stringify(jsonData), MimeType.PLAIN_TEXT);
  Logger.log('Fichier JSON généré : ' + file.getUrl());
}