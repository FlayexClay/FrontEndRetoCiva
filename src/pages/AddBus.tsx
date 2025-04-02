import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate
import { createBus } from "../services/busService";
import { getMarcas } from "../services/marcaService";
import { Bus } from "../interfaces/bus";
import { Marca } from "../interfaces/marca";

const AddBus = () => {
  const [bus, setBus] = useState<Bus>({
    numeroBus: "",
    placa: "",
    caracteristicas: "",
    marcaId: 0,
    activo: true,
  });

  const [marcas, setMarcas] = useState<Marca[]>([]);
  const navigate = useNavigate(); // Definimos navigate

  useEffect(() => {
    getMarcas().then(setMarcas);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBus({ ...bus, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createBus(bus);
    alert("Bus agregado!");
    navigate("/buses"); // Redirigir a /buses después de agregar el bus
  };

  const handleCancel = () => {
    navigate("/buses"); // Redirigir a /buses sin guardar
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Agregar Nuevo Bus</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="numeroBus" className="form-label">Número de Bus</label>
          <input
            type="text"
            name="numeroBus"
            id="numeroBus"
            className="form-control"
            placeholder="Número"
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="placa" className="form-label">Placa</label>
          <input
            type="text"
            name="placa"
            id="placa"
            className="form-control"
            placeholder="Placa"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="caracteristicas" className="form-label">Características</label>
          <input
            type="text"
            name="caracteristicas"
            id="caracteristicas"
            className="form-control"
            placeholder="Características"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="marcaId" className="form-label">Marca</label>
          <select
            name="marcaId"
            id="marcaId"
            className="form-select"
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una marca</option>
            {marcas.map((marca) => (
              <option key={marca.id} value={marca.id}>
                {marca.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Agregar</button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default AddBus;
