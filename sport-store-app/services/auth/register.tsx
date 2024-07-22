import { post } from "@/api/fetchApi";
import Swal from "sweetalert2";

// Asegúrate de que la ruta es correcta

interface RegisterCredentials {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  birthDate: string;
  password: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  birthDate: string;
}

interface RegisterResponse {
  code: number;
  message: string;
  data: User;
}
/**
 * Function to handle user registration.
 * @param credentials
 * @returns
 */
export const register = async (
  credentials: RegisterCredentials,
): Promise<User | string> => {
  const path = "http://localhost:8081/register/user";

  try {
    const response = await post<RegisterResponse, RegisterCredentials>(
      path,
      credentials,
    );

    if (response.data.code === 201) {
      Swal.fire({
        title: "Registro Exitoso",
        text: "¡Tu cuenta ha sido creada con éxito!",
        icon: "success",
        confirmButtonText: "Ok",
      });

      return response.data.data;
    } else {
      return response.data.message;
    }
  } catch (error: any) {
    return error.message;
  }
};
