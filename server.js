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
app.get('/cerca', (req, res) => {
  res.sendFile(path.join(__dirname, 'ricerca.html'));
});
app.get('/aggiungiStudente', (req, res) => {
  res.sendFile(path.join(__dirname, 'nuovoStudente.html'));
});
app.get('/visualizzaStudenti', (req, res) => {
  res.sendFile(path.join(__dirname, 'visuStudenti.html'));
});

app.get('/aggiungiDocente', (req, res) => {
  res.sendFile(path.join(__dirname, 'nuovoDocente.html'));
});
app.get('/visualizzaDocenti', (req, res) => {
  res.sendFile(path.join(__dirname, 'visuDocenti.html'));
});

// route single studente
app.get('/studente/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'studente.html'));
});
// route single docente
app.get('/docente/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'docente.html'));
});


// ✅ Endpoint per studenti
app.get('/api/studenti', (req, res) => {
  console.log("✅ POST ricevuto:", req.body);
  const filePath = path.join(__dirname, 'assets/db/studenti.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ errore: 'Impossibile leggere il file' });
    }

    try {
      const json = JSON.parse(data);
      res.json(json.studenti); // restituisce solo l'array studenti
    } catch (e) {
      res.status(500).json({ errore: 'Errore nella lettura del JSON' });
    }
  });
});

app.post('/api/studenti', (req, res) => {
  const filePath = path.join(__dirname, 'assets/db/studenti.json');
  const nuovostudente = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ errore: 'Errore di lettura file' });

    try {
      const db = JSON.parse(data);
      const idEsistente = db.studenti.some(u => u.id === nuovostudente.id);
      if (idEsistente) {
        return res.status(400).json({ errore: 'ID già esistente' });
      }

      db.studenti.push(nuovostudente);

      fs.writeFile(filePath, JSON.stringify(db, null, 2), (err) => {
        if (err) return res.status(500).json({ errore: 'Errore di scrittura' });
        res.status(201).json(nuovostudente);
      });
    } catch (e) {
      res.status(500).json({ errore: 'Errore nel parsing JSON' });
    }
  });
});

//put

app.put('/api/studente/:id', (req, res) => {
  const filePath = path.join(__dirname, 'assets/db/studenti.json');
  const id = req.params.id;
  const updatedData = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ errore: 'Errore di lettura file' });

    try {
      const db = JSON.parse(data);
      const index = db.studenti.findIndex(u => u.id === id);

      if (index === -1) {
        return res.status(404).json({ errore: 'Studente non trovato' });
      }

      db.studenti[index] = { ...db.studenti[index], ...updatedData };

      fs.writeFile(filePath, JSON.stringify(db, null, 2), (err) => {
        if (err) return res.status(500).json({ errore: 'Errore di scrittura' });
        res.json(db.studenti[index]);
      });
    } catch (e) {
      res.status(500).json({ errore: 'Errore nel parsing JSON' });
    }
  });
});


//studente singolo
app.get('/api/studente/:id', (req, res) => {
  const filePath = path.join(__dirname, 'assets/db/studenti.json');
  const userId = req.params.id;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ errore: 'Errore di lettura file' });

    try {
      const db = JSON.parse(data);
      const studente = db.studenti.find(u => u.id === userId);

      if (studente) {
        res.json(studente);
      } else {
        res.status(404).json({ errore: 'studente non trovato' });
      }
    } catch {
      res.status(500).json({ errore: 'Errore nel parsing JSON' });
    }
  });
});



// ✅ Endpoint per docenti
app.get('/api/docenti', (req, res) => {
  console.log("✅ POST ricevuto:", req.body);
  const filePath = path.join(__dirname, 'assets/db/docenti.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ errore: 'Impossibile leggere il file' });
    }

    try {
      const json = JSON.parse(data);
      res.json(json.docenti); // restituisce solo l'array docenti
    } catch (e) {
      res.status(500).json({ errore: 'Errore nella lettura del JSON' });
    }
  });
});

app.post('/api/docenti', (req, res) => {
  const filePath = path.join(__dirname, 'assets/db/docenti.json');
  const nuovodocente = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ errore: 'Errore di lettura file' });

    try {
      const db = JSON.parse(data);
      const idEsistente = db.docenti.some(u => u.id === nuovodocente.id);
      if (idEsistente) {
        return res.status(400).json({ errore: 'ID già esistente' });
      }

      db.docenti.push(nuovodocente);

      fs.writeFile(filePath, JSON.stringify(db, null, 2), (err) => {
        if (err) return res.status(500).json({ errore: 'Errore di scrittura' });
        res.status(201).json(nuovodocente);
      });
    } catch (e) {
      res.status(500).json({ errore: 'Errore nel parsing JSON' });
    }
  });
});

//docente singolo
app.get('/api/docente/:id', (req, res) => {
  const filePath = path.join(__dirname, 'assets/db/docenti.json');
  const userId = req.params.id;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ errore: 'Errore di lettura file' });

    try {
      const db = JSON.parse(data);
      const docente = db.docenti.find(u => u.id === userId);

      if (docente) {
        res.json(docente);
      } else {
        res.status(404).json({ errore: 'docente non trovato' });
      }
    } catch {
      res.status(500).json({ errore: 'Errore nel parsing JSON' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server attivo su http://localhost:3000');
});