import { Bus } from "../interfaces/bus";
import { getToken } from "../services/authService";

const API_URL = "http://localhost:8080/api/buses";

// Función auxiliar para manejar errores de autenticación
const handleAuthError = () => {
  // Por ejemplo, redirigir al login o limpiar el token
  localStorage.removeItem('token');
  window.location.href = '/login';
};

export const getBuses = async (page = 0, size = 10) => {
  try {
    const token = getToken();
    if (!token) {
      handleAuthError();
      return { buses: [], totalPages: 1 };
    }

    const response = await fetch(`${API_URL}?page=${page}&size=${size}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      handleAuthError();
      return { buses: [], totalPages: 1 };
    }

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return {
      buses: Array.isArray(data.content) ? data.content : [],
      totalPages: data.totalPages || 1,
    };
  } catch (error) {
    console.error("Error al obtener buses:", error);
    return { buses: [], totalPages: 1 };
  }
};

export const createBus = async (bus: Bus) => {
  try {
    const token = getToken();
    if (!token) {
      handleAuthError();
      return null;
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bus),
    });

    if (response.status === 401) {
      handleAuthError();
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error al crear bus:", error);
    return null;
  }
};

export const getBusById = async (id: number) => {
  try {
    const token = getToken();
    if (!token) {
      handleAuthError();
      return null;
    }

    const response = await fetch(`${API_URL}/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      handleAuthError();
      return null;
    }

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al obtener bus por ID:", error);
    return null;
  }
};

export const updateBus = async (id: number, bus: Bus) => {
  try {
    const token = getToken();
    if (!token) {
      handleAuthError();
      return null;
    }

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bus),
    });

    if (response.status === 401) {
      handleAuthError();
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error al actualizar bus:", error);
    return null;
  }
};
