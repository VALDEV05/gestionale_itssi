
# 🌐 Progetto Gestionale Web – Guida Completa

Benvenuto nel progetto **Gestionale Web**, un'app educativa che unisce HTML, CSS e JavaScript moderno con JSON Server per simulare backend e login.

---

## 📁 Struttura del Progetto

```
gestionale/
├── login.html           # Pagina login
├── nuovoUtente.html     # Pagina utente loggato
├── visuUtenti.html      # Visualizza lista utenti
├── assets/
│   ├── js/
│   │   └── login.js     # Script JS login e routing
│   └── db/
│       └── login.json   # Dati utenti mock
├── db.json              # Database per JSON Server
├── server.js            # Avvio server Node (opzionale)
└── README.md            # Guida progetto
```

---

## 🔐 Funzionalità Login

- Login via form (`login.html`)
- Verifica utente/password con `fetch()`
- Se corretto: salva in `localStorage` + redirect
- Se errato: mostra `alert-danger` dinamico Bootstrap

```js
fetch("/assets/db/login.json")
  .then(res => res.json())
  .then(data => {
    const utente = data.utenti.find(...);
    localStorage.setItem("utente", JSON.stringify(utente));
  });
```

---

## ✅ Form di Registrazione (con JSON Server)

- Form HTML raccoglie:
  - Nome, Cognome, Email, Telefono, Data nascita, Corso, Note
- I dati vengono inviati con `POST` a:

```bash
http://localhost:3000/utenti
```

- Usando `fetch`:

```js
fetch("http://localhost:3000/utenti", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify(nuovoUtente)
});
```

---

## 🗃 Uso di JSON Server

### Installazione
```bash
npm install 
```

### Avvio server
```bash
```

- Accesso su `http://localhost:3000/utenti`
- Ottimo per simulare backend CRUD

---

## 💾 Gestione Stato con localStorage

- Login salvato così:
```js
localStorage.setItem("utente", JSON.stringify(utente));
```

- Recuperabile in ogni pagina:
```js
const utente = JSON.parse(localStorage.getItem("utente"));
```

---

## 🚀 Deploy suggerito

### 🔹 GitHub Pages
Per frontend statico (senza fetch da file locali)

### 🔹 Netlify o Vercel
Per deploy completo con `index.html` + backend mock (in build)

---

## 🧪 Testing

### ✅ Manuale
1. Prova login valido/errato
2. Verifica salvataggio in localStorage
3. Testa `fetch` in DevTools

### ✅ JSON Server
1. Prova `GET` su `/utenti`
2. Inserisci nuovo utente con `POST`
3. Controlla aggiornamento file `db.json`

---

## 👩‍🏫 Obiettivi Didattici

- Gestione moduli e eventi con JS
- Manipolazione DOM
- Integrazione `fetch`, JSON e persistenza locale
- Simulazione architettura client-server
- Best practices di UI/UX con Bootstrap

---

## ✨ Miglioramenti possibili

- Login con hash/sicurezza
- CRUD completo (modifica/elimina utenti)
- Ruoli: admin vs utente
- Routing dinamico con JS
- Librerie: Vite, Vue, React (fase avanzata)

---

> ✍️ Creato per uso educativo – progetto ideale per esercitazioni in aula e portfolio studente!
