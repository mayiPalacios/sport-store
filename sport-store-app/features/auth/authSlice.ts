// src/features/auth/authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  birthDate: string;
}

interface AuthState {
  searchTerm: any;
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  user: null,
  searchTerm: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.isAuthenticated = !!action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
