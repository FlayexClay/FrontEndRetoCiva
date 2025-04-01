import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    const token = response.data.token;

    if (token) {
      localStorage.setItem("token", token); 
    }

    return token;
  } catch (error) {
    console.error("Error en el login", error);
    throw new Error("Usuario o contraseña incorrectos");
  }
};

export const getToken = () => localStorage.getItem("token");

export const logout = () => {
  localStorage.removeItem("token");
};