// src/features/auth/authActions.ts
import { Dispatch } from "redux";

import { setCredentials } from "./auth/authSlice";

import { post } from "@/api/fetchApi"; // Asegúrate de que la ruta es correcta

interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: number; // Change the type of 'id' property to number
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  birthDate: string;
}

interface LoginResponse {
  code: number;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export const login =
  (credentials: LoginCredentials) => async (dispatch: Dispatch) => {
    const path = "http://localhost:8081/api/auth/login";

    try {
      const response = await post<LoginResponse, LoginCredentials>(
        path,
        credentials,
      );

      if (response.data.code === 200) {
        const { token, user } = response.data.data;

        dispatch(setCredentials({ token, user }));

        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };