import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Importações do react-router-dom   
import LivroLista from './LivroLista'; // Componente para a lista de livros
import LivroDados from './LivroDados'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importação do Bootstrap

function App() {
  return (
    <Router>
      <div className="App">
        {/* Menu de navegação usando Bootstrap */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/livros">Catálogo</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dados">Novo</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Definição das rotas */}
        <Routes>
          <Route path="/livros" element={<LivroLista />} />
          <Route path="/dados" element={<LivroDados />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
