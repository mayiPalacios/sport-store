import React, { useEffect, useState } from "react";
import axios from "axios";

import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchSearchResults } from "@/features/search/searchSlice";

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  imagen: string;
}

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;

  return null;
};

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const productos = useSelector((state: RootState) => state.search.products);
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

  useEffect(() => {
    const fetchProductos = async () => {
      let token = getCookie("token");

      try {
        const response = await axios.get("http://localhost:8082/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(fetchSearchResults(searchTerm));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductos();
  }, [dispatch, searchTerm]);

  return (
    <section className="py-36">
      <div className="container flex items-center justify-center flex-wrap gap-6">
        {productos.map((producto) => (
          <ProductCard key={producto.id} {...producto} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;