import { post } from "@/api/fetchApi";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  code: number;
  message: string;
  data: string;
}

export async function login(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  const path = "http://localhost:8081/api/auth/login";

  try {
    const response = await post<LoginResponse, LoginCredentials>(
      path,
      credentials,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}
