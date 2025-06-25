# Progetto: Form di Iscrizione con Invio a JSON Server

Questo progetto dimostra come raccogliere dati da un form HTML e inviarli a un **server locale** utilizzando `fetch()` e **JSON Server**.

## 🗂 Contenuto dei file

- `index.html`  
  Contiene il form HTML per inserire:
  - Nome
  - Cognome
  - Email
  - Numero di telefono
  - Data di nascita
  - Corso di iscrizione
  - Note

- `script.js`  
  JavaScript che:
  - Raccoglie i dati dal form
  - Valida i dati
  - Invia i dati a un endpoint JSON Server con `fetch`

- `db.json`  
  File che rappresenta il database locale per JSON Server. Inizialmente contiene:
  ```json
  {
    "utenti": []
  }
  ```

---

## 🚀 Istruzioni per l'uso

### 1. Requisiti

Devi avere installato **Node.js** e **npx**. Se non lo hai già fatto:

```bash
npm install -g json-server
```

### 2. Avvia JSON Server

Apri il terminale nella cartella dove si trova il progetto e lancia:

```bash
npx json-server --watch db.json --port 3000
```

Questo renderà disponibile l'API su:
```
http://localhost:3000/utenti
```

### 3. Apri il form

Apri il file `index.html` in un browser. Compila il form e clicca su **Invia**.

Se i dati sono validi:
- Verranno inviati al server
- Appariranno in tempo reale in `db.json`
- Puoi vederli anche via browser su `http://localhost:3000/utenti`

---

## 🧪 Test

Per verificare che l'invio funzioni:

1. Apri `http://localhost:3000/utenti` prima di inviare.
2. Invia un form.
3. Ricarica la pagina per vedere i nuovi utenti.

---

## 🔧 Personalizzazione

Puoi aggiungere nuovi campi, cambiare l’endpoint o integrare un backend reale.  
Perfetto per introdurre gli studenti al concetto di **REST API**, **JSON**, e **validazione lato client**.

---

## 📚 Autore

Esercizio pensato per la didattica da un docente di sviluppo web.  
Pronto per essere esteso con `GET`, `PUT`, `DELETE` o integrazione a `localStorage`.
