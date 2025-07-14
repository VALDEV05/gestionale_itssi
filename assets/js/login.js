document
  .getElementById("loginForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const alertBox = document.getElementById("alertBox");


    console.log(username, password);
    

    function showAlert(message, type = "danger") {
      if (!alertBox) return;
      alertBox.className = "alert alert-" + type + " mt-3";
      alertBox.textContent = message;
      alertBox.classList.remove("invisible");
      setTimeout(() => {
        alertBox.classList.add("invisible");
      }, 5000);
    }

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
          localStorage.setItem("utente", JSON.stringify(utente));
          showAlert(`Benvenuto, ${utente.username}`, "success");

          setTimeout(() => {
            window.location.href = "/aggiungiStudente";
          }, 1000);
        } else {
          showAlert("Username o password errati", "danger");
        }
      })
      .catch((err) => {
        showAlert(err.message, "danger");
      });
  });