 fetch('http://localhost:5502/utenti')
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore nel recupero dei dati');
        }
        return response.json();
      })
      .then(studenti => {
        const tbody = document.querySelector("#studentiTable tbody");

        studenti.forEach(studente => {
          const row = document.createElement("tr");
          row.className = studente.corso?.toLowerCase() || '';

          row.innerHTML = `
            <td>${studente.id}</td>
            <td>${studente.nome}</td>
            <td>${studente.cognome}</td>
            <td>${studente.email}</td>
            <td>${studente.telefono}</td>
            <td>${studente.dataNascita}</td>
            <td>${studente.corso}</td>
            <td>${studente.note}</td>
          `;

          tbody.appendChild(row);
        });
      })
      .catch(error => {
        document.body.innerHTML += `<p style="color:red;">${error.message}</p>`;
        console.error('Errore fetch:', error);
      });