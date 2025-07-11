 fetch('http://localhost:3000/utenti')
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore nel recupero dei dati');
        }
        return response.json();
      })
      .then(studenti => {
        const tbody = document.querySelector("#studentiTable tbody");

        studenti.forEach(studente => {
          //for deploy
          console.log(studente);
          
          const row = document.createElement("tr");
          row.className = "row " +  studente.corso?.toLowerCase() || '';
          

          row.innerHTML = `
            <td class="col"><a href="http://localhost:3000/utente/${studente.id}" target="_blank">${studente.id}</a></td>
            <td class="col">${studente.nome}</td>
            <td class="col">${studente.cognome}</td>
            <td class="col">${studente.email}</td>
            <td class="col">${studente.telefono}</td>
            <td class="col">${studente.codiceFiscale}</td>
            <td class="col">${studente.dataNascita}</td>
            <td class="col">${studente.corso}</td>
            <td class="col">${studente.note}</td>
          `;

          tbody.appendChild(row);
        });
      })
      .catch(error => {
        document.body.innerHTML += `<p style="color:red;">${error.message}</p>`;
        console.error('Errore fetch:', error);
      });