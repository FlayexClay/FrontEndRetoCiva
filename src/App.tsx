import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { JSX, useContext } from "react";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Buses from "./pages/Buses";
import AddBus from "./pages/AddBus";
import EditBus from "./pages/EditBus";
import Marcas from "./pages/Marcas";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);
  return auth?.isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ruta raíz redirige a login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Ruta de login pública */}
          <Route path="/login" element={<Login />} />
          
          {/* Rutas protegidas */}
          <Route path="/buses" element={
            <>
              <NavBar />
              <PrivateRoute><Buses /></PrivateRoute>
            </>
          } />
          
          <Route path="/add-bus" element={
            <>
              <NavBar />
              <PrivateRoute><AddBus /></PrivateRoute>
            </>
          } />
          
          <Route path="/editar-bus/:id" element={
            <>
              <NavBar />
              <PrivateRoute><EditBus /></PrivateRoute>
            </>
          } />
          
          <Route path="/marcas" element={
            <>
              <NavBar />
              <PrivateRoute><Marcas /></PrivateRoute>
            </>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

// Componente de barra de navegación separado
const NavBar = () => {
  const auth = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/buses">Gestión de Buses</Link>
        {auth?.isAuthenticated && (
          <ul className="navbar-nav">
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
              <button 
                className="btn btn-link nav-link" 
                onClick={() => auth.logout()}
              >
                Cerrar Sesión
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default App;