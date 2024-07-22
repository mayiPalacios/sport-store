import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setCredentials } from '@/features/auth/authSlice';
import { getCookie } from "@/hooks/useGetCookie";

interface UpdateProfilePayload {
  userId: string;
  profileData: {
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    birthDate: string;
    password?: string;
  };
}

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (payload: UpdateProfilePayload, { dispatch }) => {
    const { userId, profileData } = payload;
    const token = getCookie("token");
    const path = `http://localhost:8081/api/users/${userId}`;

    try {
      const response = await axios.put(path, profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedUser = response.data;
      dispatch(setCredentials({ token, user: updatedUser }));
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }
);