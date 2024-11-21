import axios from "axios";

const baseuUrl = "http://68.183.142.21";

const authClient = axios.create({
  baseURL: baseuUrl,
  timeout: 1000,
});

export const LogIn = async (credentials) => {
  try {
    const response = await authClient.post("/api/v1/user/signin", credentials);
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesion:", error);
    throw error;
  }
};
