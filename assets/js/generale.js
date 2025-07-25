window.addEventListener("DOMContentLoaded", () => {
  const currentURL = window.location.href.toLowerCase();
  const path = window.location.pathname; // "/aggiungiStudente"
  const lastSegment = path.split("/").filter(Boolean).pop().toLowerCase();
  console.log(lastSegment); // "aggiungiStudente"


  let target = null;
  let menuClass = null;

  if (lastSegment.includes("student")) {
    target = "tp_studenti";
    menuClass = "menu-active-studenti";
  } else if (lastSegment.includes("docent")) {
    target = "tp_docenti";
    menuClass = "menu-active-docenti";
  } else if (lastSegment.includes("amministrativ")) {
    target = "tp_amministrativo";
    menuClass = "menu-active-amministrativo";
  }

  if (target && menuClass) {
    // Attiva il blocco pulsanti giusto
    document.querySelectorAll('.tp-button-menu').forEach(menu => {
      menu.classList.remove('active', 'd-none');
      if (!menu.classList.contains(target)) {
        menu.classList.add('d-none');
      } else {
        menu.classList.add('active');
      }
    });

    // Attiva la tab corretta nel menu di sinistra
    document.querySelectorAll('.nav-menu-left .menu-item').forEach(item => {
      item.classList.remove('active');
    });
    const activeItem = document.querySelector(`.nav-menu-left .${menuClass}`);
    if (activeItem) {
      activeItem.classList.add('active');
    }
  }

});


function addFavicon() {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/png';
  link.href = './assets/img/favicon.png';
  document.head.appendChild(link);
}

function headerConstruction() {
  const header = `  
      <nav class="container">
        <div class="row">
          <div class="col-md-4">
            <ul class="nav-menu nav-menu-left">
              <li class="menu-item active menu-active-studenti">
                <a href="javascript:void(0)" data-target="tp_studenti"
                  >Studenti</a
                >
              </li>
              <li class="menu-item menu-active-docenti">
                <a
                  href="javascript:void(0)"
                  data-target="tp_docenti"
                  >Docenti</a
                >
              </li>
              <li class="menu-item menu-active-amministrativo d-none">
                <a href="javascript:void(0)"
                data-target="tp_amministrativo"
                  >Amministrativo</a
                >
              </li>
            </ul>
          </div>
          <div class="col-md-4">
            <div class="nav-logo">
              <svg
                width="47"
                height="43"
                viewBox="0 0 47 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30 0H45C45.2 7.05 45.67 13.64 40.85 19.35C39.42 21.05 34.73 23.35 35.09 25.36L47 43.01H31.5C30.05 43.01 22.34 28.01 21.44 27.95C13.38 27.34 15.9 43.01 15 43.01H1C-0.03 32.23 1.34 22.38 11.99 17.51L0 0H16.5C17.76 0 23.64 12.61 25.62 12.95C31.68 11.07 29.83 4.93 30 0Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
          <div class="col-md-4">
            <ul class="nav-menu nav-menu-right">
              <li class="menu-item">
                <a href="http://localhost:3000/cerca">Cerca</a>
              </li>
              <li class="menu-item"><a href="#">Account</a></li>
              <li class="menu-item"><a href="#">Contatti</a></li>
            </ul>
          </div>
        </div>
        <div class="row row-bottom">
          <div class="tp_studenti tp-button-menu active">
            <button class="btn btn-outline-dark">
              <a href="http://localhost:3000/aggiungiStudente">Inserisci studente</a> 
            </button>
            <button class="btn btn-outline-dark">
              <a href="http://localhost:3000/visualizzaStudenti">Visualizza studenti</a> 
            </button>
            <button class="btn btn-outline-dark disabled">Visualizza statistiche</button>
          </div>
          <div class="tp_docenti tp-button-menu">
            <button class="btn btn-outline-dark">
              <a href="http://localhost:3000/aggiungiDocente">Inserisci docente</a> 
            </button>
            <button class="btn btn-outline-dark">
              <a href="http://localhost:3000/visualizzaDocenti">Visualizza docenti</a> 
            </button>
            <button class="btn btn-outline-dark disabled">Visualizza statistiche</button>
          </div>
          <div class="tp_studenti d-none">
            <button class="btn btn-outline-dark">Inserisci amministrativo</button>
            <button class="btn btn-outline-dark">Visualizza amministrativi</button>
            <button class="btn btn-outline-dark">Visualizza statistiche</button>
          </div>
        </div>
      </nav>
    `;
  const headerElement = document.getElementById('site-header');
  console.log(headerElement);
  headerElement.innerHTML = header

}


function footerConstruction() {
  const footer = `
      Copyright ITSSIxellence © All rights reserved. design with &hearts; by
      <a href="https://valeriocorda.it">valeriocorda.it</a>`;
  const footerElement = document.getElementById('site-footer');
  console.log(footerElement);
  footerElement.innerHTML = footer
}

function activeBtnHeader() {
  document.querySelectorAll('.nav-menu-left a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      // Nasconde tutti i gruppi di pulsanti
      document.querySelectorAll('.tp-button-menu').forEach(menu => {
        menu.classList.remove('active');
        menu.classList.add('d-none');
      });

      // Rimuove classe active dal menu
      document.querySelectorAll('.nav-menu-left .menu-item').forEach(item => {
        item.classList.remove('active');
      });

      // Aggiunge active all'elemento cliccato
      this.closest('.menu-item').classList.add('active');

      // Mostra quello corretto
      const targetClass = this.getAttribute('data-target');
      const target = document.querySelector(`.row-bottom .${targetClass}`);
      if (target) {
        target.classList.remove('d-none');
        target.classList.add('active');
      }
    });
  });
}


headerConstruction();
addFavicon();
footerConstruction();
activeBtnHeader();


