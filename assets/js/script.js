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

function inviaDatiAlServer(dati) {
  console.log("Invio dei dati al server in corso...");

  fetch('http://localhost:5500/utenti', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dati)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Errore nella risposta del server");
    }
    return response.json();
  })
  .then(data => {
    console.log("Risposta del server (JSON Server):", data);
    alert("Dati inviati con successo al server locale!");
  })
  .catch(error => {
    console.error("Errore durante l'invio:", error);
    alert("Errore durante l'invio dei dati.");
  });
}
