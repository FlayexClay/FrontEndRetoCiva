import { useState, useEffect } from "react";
import { getMarcas, createMarca } from "../services/marcaService";
import { Marca } from "../interfaces/marca";

const Marcas = () => {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    getMarcas().then(setMarcas);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createMarca({ nombre });
    alert("Marca agregada!");
   
    getMarcas().then(setMarcas);
    setNombre("");
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Lista de Marcas</h1>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {marcas.map((marca) => (
              <tr key={marca.id}>
                <td>{marca.id}</td>
                <td>{marca.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-3">Agregar Nueva Marca</h2>
      <form onSubmit={handleSubmit} className="mt-2">
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre de la Marca
          </label>
          <input
            type="text"
            id="nombre"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa el nombre de la marca"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Agregar</button>
      </form>
    </div>
  );
};

export default Marcas;