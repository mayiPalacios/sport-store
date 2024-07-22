import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";

import { RootState } from "@/store/store";
import { getCookie } from "@/hooks/useGetCookie";
import { Button } from "@nextui-org/button";

const columns = [
  { name: "Product Name", uid: "productName" },
  { name: "Price", uid: "productPrice" },
  { name: "Quantity", uid: "quantity" },
  { name: "Image", uid: "productImage" },
  { name: "Actions", uid: "actions" },
];

interface CartItem {
  cartItemId: number;
  productId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  productQuantity: number;
  productImage: string;
  quantity: number;
}

interface Column {
  uid: string;
  name: string;
}

interface CartItem {
  cartItemId: number;
  productId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  productQuantity: number;
  productImage: string;
  quantity: number;
}

function CartList() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user) {
        console.error("User not logged in");

        return;
      }

      try {
        const token = getCookie("token");
        const response = await axios.get(
          `http://localhost:8082/api/cart/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [user]);

  const renderCell = useCallback((item: any, columnKey: string) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "productName":
        return cellValue;
      case "productPrice":
        return `$${item.productPrice.toFixed(2)}`;
      case "quantity":
        return item.quantity;
      case "productImage":
        return (
          <img
            alt={item.productName}
            height="100"
            src={item.productImage}
            width="100"
          />
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2 custom-actions">
            <Tooltip content="Edit product">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <svg
                  className="bi bi-pencil-fill"
                  fill="currentColor"
                  height="20"
                  viewBox="0 0 16 16"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                </svg>
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete product">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <svg
                  className="bi bi-trash3"
                  fill="red"
                  height="20"
                  viewBox="0 0 16 16"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                </svg>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div>
      <div style={{ overflowY: "auto", maxHeight: "400px" }}>
        <Table
          aria-label="Example table with custom cells"
          className="custom-table"
        >
          <TableHeader columns={columns}>
            {(column: { uid: string; name: any }) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                className="custom-header"
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={cartItems}>
            {(item: { cartItemId: any }) => (
              <TableRow key={item.cartItemId}>
                {(columnKey: any) => (
                  <TableCell className="custom-cell">
                    {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px", marginRight:"30px" }}>
        <Button className="mt-4" color="primary" >
          Send Cart
        </Button>
      </div>
    </div>
  );
}

export default CartList;
