import axios from "axios";

export const validateToken = async (token: string): Promise<boolean> => {
  try {
    const response = await axios.get(
      "http://localhost:8081/api/token/validate",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data.code === 200; // Considerar el token válido si el código de respuesta es 200
  } catch (error) {
    console.error("Token validation failed:", error);

    return false;
  }
};