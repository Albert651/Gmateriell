import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg bg-warning ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-light">
              <li className="nav-item text-light">
                <Link className="nav-link active text-light" aria-current="page" to="/">Accueil</Link>
              </li>
              <li className="nav-item text-light">
                <Link className="nav-link active text-light" aria-current="page" to="/ListeBase">Liste Base</Link>
              </li>
              <li className="nav-item text-light">
                <Link className="nav-link active text-light" aria-current="page" to="/ListeLane">Liste Lane</Link>
              </li>
              <li className="nav-item text-light">
                <Link className="nav-link active text-light" aria-current="page" to="/ListeOutil">Liste Outils</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle btn-btn-info text-light" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Liste
                </a>
                <div className="dropdown-menu bg-warning " aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to ="/ListeDepotA">Depot A</Link>
                  <Link className="dropdown-item" to="/ListeDepotB">Depot B</Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
