const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.static(__dirname));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// ✅ Homepage (login.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// ✅ Endpoint per utenti
app.get('/utenti', (req, res) => {
  const filePath = path.join(__dirname, 'assets/db/db.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ errore: 'Impossibile leggere il file' });
    }

    try {
      const json = JSON.parse(data);
      res.json(json.utenti); // restituisce solo l'array utenti
    } catch (e) {
      res.status(500).json({ errore: 'Errore nella lettura del JSON' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server attivo su http://localhost:3000');
});