import { useState, useEffect } from "react";
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

        <button type="submit" className="btn btn-primary">Agregar</button>
      </form>
    </div>
  );
};

export default AddBus;