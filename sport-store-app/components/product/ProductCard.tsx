import React, { useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

import { HeartIcon } from "@/public/icons/HeartIcon";
import { RootState } from "@/store/store";
import { getCookie } from "@/hooks/useGetCookie";

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  imagen: string;
}

const ProductCard: React.FC<Product> = ({
  nombre,
  descripcion,
  precio,
  imagen,
  cantidad,
  id,
}) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please log in to add items to your cart");

      return;
    }

    const body = {
      userId: user.id,
      productId: id,
      quantity: selectedQuantity,
    };
    let token = getCookie("token");

    try {
      const response = await axios.post(
        "http://localhost:8082/api/cart/add",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        iconColor: "green",
        customClass: {
          popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "success",
        title: "Success",
      });
    } catch (error) {
      alert("Error adding product to cart");
    }
  };

  return (
    <Card className="py-4 lg:w-3/4 xl:w-1/2">
      <CardBody className="overflow-visible py-2">
        <div className="flex gap-6">
          <Image
            alt={nombre}
            className="flex-1 object-cover"
            height={150}
            src={imagen}
            width={150}
          />
          <div className="flex-1">
            <h2 className="text-lg font-bold uppercase">{nombre}</h2>
            <p className="text-sm text-default-500">{descripcion}</p>
            <div className="mb-6 mt-2 flex gap-3">
              <span className="font-bold">${precio.toFixed(2)}</span>
            </div>
            {cantidad > 0 ? (
              <div className="mt-2">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor={`quantity-${id}`}
                >
                  Cantidad
                </label>
                <input
                  className="mt-1 block w-24 py-2 px-3 border border-gray-300 bg-gray-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id={`quantity-${id}`}
                  max={cantidad}
                  min={1}
                  name="quantity"
                  type="number"
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                />
              </div>
            ) : (
              <span className="text-red-500">Agotado</span>
            )}
            <div className="mt-2">
              <p className="text-sm text-default-500">
                Cantidad disponible: {cantidad}
              </p>
            </div>
            <div className="mt-6 flex gap-6">
              <div className="flex gap-4 items-center">
                <Button isIconOnly aria-label="Like" color="danger">
                  <HeartIcon
                    filled
                    height={undefined}
                    label={undefined}
                    size={20}
                    width={undefined}
                  />
                </Button>
              </div>
              <Button
                color="primary"
                disabled={cantidad === 0}
                radius="full"
                variant="bordered"
                onClick={handleAddToCart}
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
