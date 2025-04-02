import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { JSX, useContext } from "react";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Buses from "./pages/Buses";
import AddBus from "./pages/AddBus";
import EditBus from "./pages/EditBus";
import Marcas from "./pages/Marcas";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);
  return auth?.isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <NavBar />
          <div className="container mt-4 flex-grow-1">
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/buses" element={<PrivateRoute><Buses /></PrivateRoute>} />
              <Route path="/add-bus" element={<PrivateRoute><AddBus /></PrivateRoute>} />
              <Route path="/editar-bus/:id" element={<PrivateRoute><EditBus /></PrivateRoute>} />
              <Route path="/marcas" element={<PrivateRoute><Marcas /></PrivateRoute>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

const NavBar = () => {
  const auth = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/buses">
          <i className="bi bi-bus-front-fill me-2"></i>Gestión de Buses
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {auth?.isAuthenticated && (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/buses">Lista de Buses</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-bus">Agregar Bus</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/marcas">Marcas</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-light ms-3" onClick={() => auth.logout()}>
                  <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-0">&copy; {new Date().getFullYear()} Gestión de Buses. Reto Civa S.A.C.</p>
      </div>
    </footer>
  );
};

export default App;