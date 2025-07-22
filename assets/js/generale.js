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
              <li class="menu-item">
                <a href="http://localhost:3000/aggiungiStudente">Inserisci studente</a>
              </li>
              <li class="menu-item">
                <a
                  href="http://localhost:3000/visualizzaStudenti"
                  target="_blank"
                  >Visualizza studenti</a
                >
              </li>
              <li class="menu-item">
                <a href="http://localhost:3000/aggiungiDocente"
                  >Inserisci docente</a
                >
              </li>
              <li class="menu-item">
                <a
                  href="http://localhost:3000/visualizzaDocenti"
                  >Visualizza docenti</a
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
              <li class="menu-item"><a href="http://localhost:3000/cerca">Cerca</a></li>
              <li class="menu-item"><a href="#">Account</a></li>
              <li class="menu-item"><a href="#">Contatti</a></li>
            </ul>
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


headerConstruction();
addFavicon();
footerConstruction();


