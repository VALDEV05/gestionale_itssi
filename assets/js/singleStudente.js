const path = window.location.pathname;
const idStudente = path.split("/").pop();

if (!idStudente) {
    document.body.innerHTML += '<p class="text-danger">ID studente non fornito.</p>';
} else {
    fetch(`/api/studente/${idStudente}`)
        .then(res => {
            if (!res.ok) throw new Error('Studente non trovato');
            return res.json();
        })
        .then(studente => {

            console.log(studente);
            console.log(studente.infoPersonali);
            
            document.getElementById("studenteNome").textContent = studente.infoPersonali.nome;
            document.getElementById("studenteCognome").textContent = studente.infoPersonali.cognome;
            document.getElementById("studenteEmail").textContent = studente.infoPersonali.email;
            document.getElementById("studenteTelefono").textContent = studente.infoPersonali.telefono;
            document.getElementById("studenteCF").textContent = studente.infoPersonali.codiceFiscale;
            document.getElementById('sesso').textContent = studente.infoPersonali.sesso;
            /* document.getElementById("sesso") = studente.infoPersonali.sesso; */
            //document.getElementById("studenteDataNascita").textContent = studente.infoPersonali.infoNascita.dataNascita;
            document.getElementById("studenteLuogoNascita").textContent = studente.infoPersonali.infoNascita.luogoNascita;
             document.getElementById("studenteNazionalita").textContent = studente.infoPersonali.infoNascita.nazionalita;
            document.getElementById("studenteIndirizzo").textContent = studente.infoPersonali.residenza.indirizzo;
            document.getElementById("studenteCAP").textContent = studente.infoPersonali.residenza.cap;
            document.getElementById("studenteProvincia").textContent = studente.infoPersonali.residenza.provincia;
            document.getElementById("studenteNazione").textContent = studente.infoPersonali.residenza.nazione;
            document.getElementById("studenteCorso").textContent =  studente.corso;
            document.getElementById("studenteNote").textContent = studente.note;
            document.getElementById("studenteAnno").textContent = 'ID Studente: ' + idStudente;

            // Precompilare i campi del form modificaDatiUtenteForm

             document.getElementById('nome').value = studente.infoPersonali.nome || '';
            document.getElementById('cognome').value = studente.infoPersonali.cognome || '';
            document.getElementById('email').value = studente.infoPersonali.email || '';
            document.getElementById('telefono').value = studente.infoPersonali.telefono || '';
            document.getElementById('codiceFiscale').value = studente.infoPersonali.codiceFiscale || '';
            document.getElementById('sesso').value = studente.infoPersonali.sesso.toLowerCase() || '';
            
            //document.getElementById('dataNascita').value = studente.infoPersonali.infoNascita.dataNascita || '';
            document.getElementById('luogoNascita').value = studente.infoPersonali.infoNascita.luogoNascita || '';
            document.getElementById('nazionalita').value = studente.infoPersonali.infoNascita.nazionalita || '';
            document.getElementById('indirizzoResidenza').value = studente.infoPersonali.residenza.indirizzo || '';
            document.getElementById('capResidenza').value = studente.infoPersonali.residenza.cap || '';
            document.getElementById('provincia').value = studente.infoPersonali.residenza.provincia || '';
            document.getElementById('nazione').value = studente.infoPersonali.residenza.nazione || '';
            document.getElementById('corso').value = studente.corso || '';

            document.getElementById('note').value = studente.note || ''; 

        })
        .catch(err => {
            document.body.innerHTML += `<p class="text-danger">${err.message}</p>`;
        });
}


  document.getElementById('modificaDatiPersonali').addEventListener('click', () => {
    const container = document.querySelector('.container-modificaFormToggle');
    if (container) {
        container.classList.toggle('d-none');
    }
}); 

document.getElementById('modificaDatiUtenteForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const cognome = document.getElementById('cognome').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const codiceFiscale = document.getElementById('codiceFiscale').value;
    const sesso = document.getElementById('sesso').value; 
    //const dataNascita = document.getElementById('dataNascita').value;
    const luogoNascita = document.getElementById('luogoNascita').value;
    const nazionalita = document.getElementById('nazionalita').value;
    const indirizzoResidenza = document.getElementById('studenteIndirizzo').value;
    const capResidenza = document.getElementById('studenteCAP').value;
    const provincia = document.getElementById('provincia').value;
    const nazione = document.getElementById('nazione').value;
    const corso = document.getElementById('corso').value; 
    const note = document.getElementById('note').value;

    const updatedStudente = {
        infoPersonali: {
            nome: nome,
            cognome: cognome,
            email: email,
            telefono: telefono,
            codiceFiscale: codiceFiscale,
            sesso: sesso,
            infoNascita: {
                //dataNascita: dataNascita,
                luogoNascita: luogoNascita,
                nazionalita: nazionalita
            },
            residenza: {
                indirizzo: indirizzoResidenza,
                cap: capResidenza,
                provincia: provincia,
                nazione: nazione
            }
        },
        corso: corso,
        note: note
    };

    fetch(`/api/studente/${idStudente}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStudente)
    })
    .then(res => {
        if (!res.ok) throw new Error('Errore durante l\'aggiornamento');
        return res.json();
    })
    .then(data => {
        alert('Dati aggiornati con successo!');
        setTimeout(() => {
            location.reload();
        }, 1500);
    })
    .catch(err => {
        alert(`Errore: ${err.message}`);
    });
}); 