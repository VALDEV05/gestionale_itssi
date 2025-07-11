const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json()); // Necessario per leggere il body delle POST

app.use(express.static(__dirname));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// ✅ Homepage (login.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// route single utente
app.get('/utente/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'utente.html'));
});



// ✅ Endpoint per utenti
app.get('/utenti', (req, res) => {
  console.log("✅ POST ricevuto:", req.body);
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

app.post('/utenti', (req, res) => {
  const filePath = path.join(__dirname, 'assets/db/db.json');
  const nuovoUtente = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ errore: 'Errore di lettura file' });

    try {
      const db = JSON.parse(data);
      const idEsistente = db.utenti.some(u => u.id === nuovoUtente.id);
      if (idEsistente) {
        return res.status(400).json({ errore: 'ID già esistente' });
      }

      db.utenti.push(nuovoUtente);

      fs.writeFile(filePath, JSON.stringify(db, null, 2), (err) => {
        if (err) return res.status(500).json({ errore: 'Errore di scrittura' });
        res.status(201).json(nuovoUtente);
      });
    } catch (e) {
      res.status(500).json({ errore: 'Errore nel parsing JSON' });
    }
  });
});

//utente singolo
app.get('/api/utente/:id', (req, res) => {
  const filePath = path.join(__dirname, 'assets/db/db.json');
  const userId = req.params.id;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ errore: 'Errore di lettura file' });

    try {
      const db = JSON.parse(data);
      const utente = db.utenti.find(u => u.id === userId);

      if (utente) {
        res.json(utente);
      } else {
        res.status(404).json({ errore: 'Utente non trovato' });
      }
    } catch {
      res.status(500).json({ errore: 'Errore nel parsing JSON' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server attivo su http://localhost:3000');
});