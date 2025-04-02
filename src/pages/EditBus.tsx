import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBusById, updateBus } from "../services/busService";
import { Bus } from "../interfaces/bus";
import { Marca } from "../interfaces/marca"; // Asegúrate de tener esta interfaz
import { getMarcas } from "../services/marcaService";

const EditBus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bus, setBus] = useState<Bus | null>(null);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [busData, marcasData] = await Promise.all([
          getBusById(Number(id)),
          getMarcas()
        ]);
        setBus(busData);
        setMarcas(marcasData);
      } catch (err) {
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (bus) {
      setBus({ 
        ...bus, 
        [e.target.name]: e.target.type === 'checkbox' 
          ? (e.target as HTMLInputElement).checked 
          : e.target.value 
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bus || bus.id === undefined) {
      setError("ID del bus no válido.");
      return;
    }

    try {
      await updateBus(bus.id, bus);
      navigate("/buses"); // Redirige a la lista de buses
    } catch (err) {
      setError("Error al actualizar el bus.");
    }
  };

  if (loading) return <div className="text-center">Cargando...</div>;
  if (error) return <p className="alert alert-danger">{error}</p>;
  if (!bus) return <p className="alert alert-warning">Bus no encontrado.</p>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Editar Bus</h1>
      
      <form onSubmit={handleSubmit} className="card p-4">
        <div className="mb-3">
          <label className="form-label">Número del Bus</label>
          <input
            type="text"
            className="form-control"
            name="numeroBus"
            value={bus.numeroBus || ''}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Placa</label>
          <input
            type="text"
            className="form-control"
            name="placa"
            value={bus.placa || ''}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Marca</label>
          <select
            className="form-select"
            name="marcaId"
            value={bus.marcaId || ''}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una marca</option>
            {marcas.map(marca => (
              <option key={marca.id} value={marca.id}>
                {marca.nombre}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-3">
          <label className="form-label">Características</label>
          <input
            type="text"
            className="form-control"
            name="caracteristicas"
            value={bus.caracteristicas || ''}
            onChange={handleChange}
          />
        </div>
        
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="activo"
            checked={bus.activo || false}
            onChange={handleChange}
          />
          <label className="form-check-label">Activo</label>
        </div>
        
        <div className="d-flex justify-content-between">
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate("/buses")}
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBus;