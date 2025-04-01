import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { JSX, useContext } from "react";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Buses from "./pages/Buses";
import AddBus from "./pages/AddBus";
import Marcas from "./pages/Marcas";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);
  return auth?.isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">Gestión de Buses</Link>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Lista de Buses</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-bus">Agregar Bus</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/marcas">Marcas</Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container mt-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute><Buses /></PrivateRoute>} />
            <Route path="/add-bus" element={<PrivateRoute><AddBus /></PrivateRoute>} />
            <Route path="/marcas" element={<PrivateRoute><Marcas /></PrivateRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
