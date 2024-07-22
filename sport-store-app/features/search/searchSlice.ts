import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { getCookie } from "@/hooks/useGetCookie";

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  imagen: string;
}

interface SearchState {
  searchTerm: string;
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  searchTerm: "",
  products: [],
  loading: false,
  error: null,
};

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (searchTerm: string) => {
    let token = getCookie("token");

    const response = await axios.get(
      `http://localhost:8082/api/products/search?searchTerm=${searchTerm}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  },
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSearchResults.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload;
        },
      )
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
