import { Marca } from "../interfaces/marca";
import { getToken } from "../services/authService";

const API_URL = "http://localhost:8080/api/marcas";

export const getMarcas = async () => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error al obtener marcas:", error);
    return [];
  }
};


export const createMarca = async (marca: Marca) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(marca),
    });
  
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
  
    return response.json();
  };
