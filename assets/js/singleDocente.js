// 1️⃣ Ottieni l'ID docente dal pathname: /docente/id
const path = window.location.pathname;
const idDocente = path.split("/").pop();

if (!idDocente) {
    document.getElementById("infoDocente").textContent =
        "ID docente non fornito.";
} else {
    // 2️⃣ Richiama l'API per un singolo docente
    fetch(`/api/docente/${idDocente}`)
        .then((res) => {
            if (!res.ok) throw new Error("docente non trovato");
            return res.json();
        })
        .then((docente) => {
            // 3️⃣ Mostra i dati in pagina in card con Bootstrap
            document.getElementById("infoDocente").innerHTML = `
            <div class="card mb-3">
              <div class="card-header">
                <h5>Dettagli Docente</h5>
              </div>
              <div class="card-body">
                <p><strong>Nome:</strong> <span id="nomeDocente">${docente.nome}</span></p>
                <p><strong>Cognome:</strong> <span id="cognomeDocente">${docente.cognome}</span></p>
                <p><strong>Email:</strong> <span id="emailDocente">${docente.email}</span></p>
                <p><strong>Telefono:</strong> <span id="telefonoDocente">${docente.telefono}</span></p>
                <p><strong>Corso:</strong> <span id="corsoDocente">${docente.corso}</span></p>
                ${docente.residenza ? `
                <p><strong>Residenza:</strong></p>
                <ul>
                  <li><strong>Via:</strong> <span id="viaDocente">${docente.residenza.via}</span></li>
                  <li><strong>Città:</strong> <span id="cittaDocente">${docente.residenza.citta}</span></li>
                  <li><strong>CAP:</strong> <span id="capDocente">${docente.residenza.cap}</span></li>
                </ul>
                ` : ''}
                <button id="modificaDatiPersonali" class="btn btn-primary mt-3">Modifica dati</button>
              </div>
            </div>
            <form id="modificaDatiUtenteForm" class="d-none">
              <div class="mb-3">
                <label for="nome" class="form-label">Nome</label>
                <input type="text" class="form-control" id="nome" name="nome" required>
              </div>
              <div class="mb-3">
                <label for="cognome" class="form-label">Cognome</label>
                <input type="text" class="form-control" id="cognome" name="cognome" required>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" name="email" required>
              </div>
              <div class="mb-3">
                <label for="telefono" class="form-label">Telefono</label>
                <input type="text" class="form-control" id="telefono" name="telefono" required>
              </div>
              <div class="mb-3">
                <label for="corso" class="form-label">Corso</label>
                <input type="text" class="form-control" id="corso" name="corso" required>
              </div>
              <fieldset>
                <legend>Residenza</legend>
                <div class="mb-3">
                  <label for="via" class="form-label">Via</label>
                  <input type="text" class="form-control" id="via" name="via">
                </div>
                <div class="mb-3">
                  <label for="citta" class="form-label">Città</label>
                  <input type="text" class="form-control" id="citta" name="citta">
                </div>
                <div class="mb-3">
                  <label for="cap" class="form-label">CAP</label>
                  <input type="text" class="form-control" id="cap" name="cap">
                </div>
              </fieldset>
              <button type="submit" class="btn btn-success">Salva modifiche</button>
              <button type="button" id="annullaModifica" class="btn btn-secondary ms-2">Annulla</button>
            </form>
          `;

            // Precompila il form con i dati attuali
            document.getElementById("nome").value = docente.nome || '';
            document.getElementById("cognome").value = docente.cognome || '';
            document.getElementById("email").value = docente.email || '';
            document.getElementById("telefono").value = docente.telefono || '';
            document.getElementById("corso").value = docente.corso || '';
            document.getElementById("via").value = (docente.residenza && docente.residenza.via) || '';
            document.getElementById("citta").value = (docente.residenza && docente.residenza.citta) || '';
            document.getElementById("cap").value = (docente.residenza && docente.residenza.cap) || '';

            // Gestione toggle form modifica dati
            const btnModifica = document.getElementById("modificaDatiPersonali");
            const formModifica = document.getElementById("modificaDatiUtenteForm");
            const cardBody = btnModifica.closest('.card-body');
            const btnAnnulla = document.getElementById("annullaModifica");

            btnModifica.addEventListener("click", () => {
                formModifica.classList.remove("d-none");
                cardBody.classList.add("d-none");
            });

            btnAnnulla.addEventListener("click", () => {
                formModifica.classList.add("d-none");
                cardBody.classList.remove("d-none");
            });

            // Gestione submit form modifica dati
            formModifica.addEventListener("submit", (e) => {
                e.preventDefault();

                const updatedDocente = {
                    nome: document.getElementById("nome").value.trim(),
                    cognome: document.getElementById("cognome").value.trim(),
                    email: document.getElementById("email").value.trim(),
                    telefono: document.getElementById("telefono").value.trim(),
                    corso: document.getElementById("corso").value.trim(),
                    residenza: {
                        via: document.getElementById("via").value.trim(),
                        citta: document.getElementById("citta").value.trim(),
                        cap: document.getElementById("cap").value.trim()
                    }
                };

                fetch(`/api/docente/${idDocente}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedDocente),
                })
                    .then((res) => {
                        if (!res.ok) throw new Error("Errore durante l'aggiornamento");
                        return res.json();
                    })
                    .then((docenteAggiornato) => {
                        // Aggiorna la visualizzazione con i nuovi dati
                        document.getElementById("nomeDocente").textContent = docenteAggiornato.nome;
                        document.getElementById("cognomeDocente").textContent = docenteAggiornato.cognome;
                        document.getElementById("emailDocente").textContent = docenteAggiornato.email;
                        document.getElementById("telefonoDocente").textContent = docenteAggiornato.telefono;
                        document.getElementById("corsoDocente").textContent = docenteAggiornato.corso;

                        if (docenteAggiornato.residenza) {
                            if (!document.getElementById("viaDocente")) {
                                // se residenza non esisteva prima aggiungila
                                const residenzaHtml = `
                                <p><strong>Residenza:</strong></p>
                                <ul>
                                  <li><strong>Via:</strong> <span id="viaDocente">${docenteAggiornato.residenza.via}</span></li>
                                  <li><strong>Città:</strong> <span id="cittaDocente">${docenteAggiornato.residenza.citta}</span></li>
                                  <li><strong>CAP:</strong> <span id="capDocente">${docenteAggiornato.residenza.cap}</span></li>
                                </ul>
                                `;
                                const cardBodyElem = document.querySelector(".card-body");
                                cardBodyElem.insertAdjacentHTML('beforeend', residenzaHtml);
                            } else {
                                document.getElementById("viaDocente").textContent = docenteAggiornato.residenza.via;
                                document.getElementById("cittaDocente").textContent = docenteAggiornato.residenza.citta;
                                document.getElementById("capDocente").textContent = docenteAggiornato.residenza.cap;
                            }
                        } else {
                            // se residenza è stata rimossa, togli la sezione
                            const viaElem = document.getElementById("viaDocente");
                            if (viaElem) {
                                viaElem.closest('ul').previousElementSibling.remove(); // rimuove <p><strong>Residenza:</strong></p>
                                viaElem.closest('ul').remove();
                            }
                        }

                        // Nascondi form e mostra card
                        formModifica.classList.add("d-none");
                        cardBody.classList.remove("d-none");
                    })
                    .catch((err) => {
                        alert(err.message);
                    });
            });
        })
        .catch((err) => {
            document.getElementById("infoDocente").textContent = err.message;
        });
}