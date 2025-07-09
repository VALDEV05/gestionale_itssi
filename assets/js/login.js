 document
        .getElementById("loginForm")
        .addEventListener("submit", function (e) {
          e.preventDefault();

          const username = document.getElementById("username").value.trim();
          const password = document.getElementById("password").value.trim();
          const messaggio = document.getElementById("messaggio");

          fetch("/assets/db/login.json")
            .then((response) => {
              if (!response.ok) {
                throw new Error("Impossibile caricare gli utenti");
              }
              return response.json();
            })
            .then((data) => {
              const utente = data.utenti.find(
                (u) => u.username === username && u.password === password
              );

              if (utente) {
                /*  messaggio.textContent = `Benvenuto, ${utente.username}`;
            messaggio.className = 'successo';
 */
                localStorage.setItem("utente", JSON.stringify(utente));
                messaggio.textContent = `Benvenuto, ${utente.username}`;
                messaggio.className = "successo";
                // Esempio: reindirizza a dashboard.html dopo 1 secondo
                setTimeout(() => {
                  window.location.href = "nuovoUtente.html";
                }, 1000);
              } else {
                messaggio.textContent = "Username o password errati";
                messaggio.className = "errore";
              }
            })
            .catch((err) => {
              messaggio.textContent = err.message;
              messaggio.className = "errore";
            });
        });