import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBuses } from "../services/busService";
import { Bus } from "../interfaces/bus";

const Buses = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    getBuses(currentPage, 10).then(({ buses, totalPages }) => {
      setBuses(buses);
      setTotalPages(totalPages);
    });
  }, [currentPage]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Lista de Buses</h1>

      {buses.length === 0 ? (
        <p className="text-danger text-center">No hay buses registrados o error en la carga.</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Número</th>
                  <th>Placa</th>
                  <th>Marca</th>
                  <th>Características</th>
                  <th>Activo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {buses.map((bus) => (
                  <tr key={bus.id}>
                    <td>{bus.id}</td>
                    <td>{bus.numeroBus}</td>
                    <td>{bus.placa}</td>
                    <td>{bus.marcaNombre}</td>
                    <td>{bus.caracteristicas}</td>
                    <td>
                      <span className={`badge ${bus.activo ? "bg-success" : "bg-danger"}`}>
                        {bus.activo ? "Sí" : "No"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => navigate(`/editar-bus/${bus.id}`)}
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Controles de paginación */}
          <nav>
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                  Anterior
                </button>
              </li>
              <li className="page-item disabled">
                <span className="page-link">Página {currentPage + 1} de {totalPages}</span>
              </li>
              <li className={`page-item ${currentPage + 1 >= totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                  Siguiente
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default Buses;

