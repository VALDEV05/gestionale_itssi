document.getElementById('datiUtenteForm').addEventListener('submit', function (e) {
  e.preventDefault();
  console.log("Form inviato. Inizio elaborazione...");

  const dati = prendiDatiDalForm();
  if (validaDati(dati)) {
    inviaDatiAlServer(dati);
  } else {
    console.log("Errore: Dati non validi.");
  }
});

function prendiDatiDalForm() {
  const dati = {
    nome: document.getElementById('nome').value.trim(),
    cognome: document.getElementById('cognome').value.trim(),
    email: document.getElementById('email').value.trim(),
    telefono: document.getElementById('telefono').value.trim(),
    dataNascita: document.getElementById('dataNascita').value,
    corso: document.getElementById('corso').value,
    note: document.getElementById('note').value.trim()
  };
  console.log("Dati raccolti:", dati);
  return dati;
}

function validaDati(dati) {
  let valido = true;

  if (dati.nome === "" || dati.cognome === "") {
    console.log("Nome e cognome sono obbligatori.");
    valido = false;
  }

  if (!dati.email.includes('@')) {
    console.log("Email non valida.");
    valido = false;
  }

  if (!/^\d{10}$/.test(dati.telefono)) {
    console.log("Numero di telefono non valido (attesi 10 cifre).");
    valido = false;
  }

  if (dati.corso === "") {
    console.log("Seleziona un corso.");
    valido = false;
  }

  return valido;
}

async function inviaDatiAlServer(dati) {
  console.log("Invio dei dati al server in corso...");

  try {
    const res = await fetch('http://localhost:3000/utenti');
    if (!res.ok) throw new Error("Impossibile leggere gli utenti esistenti");
    const utenti = await res.json();

    let id;
    const esisteID = (id) => utenti.some(u => u.id === id);

    // Genera un ID unico
    do {
      id = Math.random().toString(36).substring(2, 6);
    } while (esisteID(id));

    dati.id = id;

    const postResponse = await fetch('http://localhost:3000/utenti', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dati)
    });

    if (!postResponse.ok) {
      const errorText = await postResponse.text();
      throw new Error("Errore HTTP " + postResponse.status + ": " + errorText);
    }

    const data = await postResponse.json();
    console.log("Risposta del server (JSON Server):", data);
    alert("Dati inviati con successo al server locale!");
  } catch (error) {
    console.error("Errore durante l'invio:", error.message);
    alert("Errore durante l'invio dei dati: " + error.message);
  }
}
