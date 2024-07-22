import { post } from "@/api/fetchApi";
import { setCredentials } from "@/features/auth/authSlice";

interface User {
  id: number;
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

interface LoginCredentials {
  email: string;
  password: string;
}

const setCookie = (name: string, value: string, hours: number) => {
  const date = new Date();

  date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();

  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

export const login =
  (credentials: LoginCredentials) => async (dispatch: any) => {
    const path = "http://localhost:8081/api/auth/login";

    try {
      const response = await post<LoginResponse, LoginCredentials>(
        path,
        credentials,
      );

      if (response.data.code === 200) {
        const { token, user } = response.data.data;

        setCookie("token", token, 1);
        dispatch(setCredentials({ token, user }));
      } else {
        console.error("Error de login:", response.data.message);
      }
    } catch (error) {
      console.error("Error de login:", error);
    }
  };