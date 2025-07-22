 fetch('http://localhost:3000/api/studenti')
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore nel recupero dei dati');
        }
        return response.json();
      })
      .then(studenti => {
        const tbody = document.querySelector("#studentiTable tbody");

        studenti.forEach(studente => {

          console.log(studente.id);
          
          //for deploy
          console.log(studente);
          
          const row = document.createElement("tr");
          row.className = studente.corso?.toLowerCase() || '';
          

          row.innerHTML = `
            <td><a href="http://localhost:3000/studente/${studente.id}" target="_blank">${studente.id}</a></td>
            <td>${studente.infoPersonali.nome}</td>
            <td>${studente.infoPersonali.cognome}</td>
            <td>${studente.infoPersonali.email}</td>
            <td>${studente.infoPersonali.tel}</td>
            <td>${studente.infoPersonali.CF}</td>
            <td>${studente.infoPersonali.infoNascita.dataNascita}</td>
            <td>${studente.corso}</td>
            <td><a class="btn btn-primary btn-altro" href="http://localhost:3000/studente/${studente.id}" target="_blank">altro</a></td>
          `;

          tbody.appendChild(row);
        });
      })
      .catch(error => {
        document.body.innerHTML += `<p style="color:red;">${error.message}</p>`;
        console.error('Errore fetch:', error);
      });