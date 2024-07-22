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
import EditAddressModal from "../modals/EditAddressModal";
import { deleteCartItem } from "@/services/cart/deleteCartItem";
import { sendCart } from "@/services/cart/sendCart";

const columns = [
  { name: "Product Name", uid: "productName" },
  { name: "Price", uid: "productPrice" },
  { name: "Quantity", uid: "quantity" },
  { name: "Image", uid: "productImage" },
  { name: "Address", uid: "address" },
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
  address: string;
}

function CartList() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isEditAddressOpen, setIsEditAddressOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(user?.address || "");
  const [refresh, setRefresh] = useState<boolean>(false);
  
  const openEditAddressModal = () => setIsEditAddressOpen(true);
  const closeEditAddressModal = () => setIsEditAddressOpen(false);

  const handleSaveAddress = () => {
    console.log("Dirección guardada:", currentAddress);
    closeEditAddressModal();
  };

  const handleDeleteCartItem = async (productId: number) => {
    if (!user) {
      console.error("User not logged in");
      return;
    }

    try {
      let token = getCookie("token");
      await deleteCartItem(user.id.toString(), productId, token!);
      setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const handleSendCart = async () => {
    if (user) {
      await sendCart(user.id.toString(), currentAddress);
      setRefresh((prev) => !prev);
    }
  };

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

        setCartItems(
          response.data.map((item: CartItem) => ({
            ...item,
            address: currentAddress,
          }))
        );
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [user, currentAddress, refresh]);

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
        case "address":
          return item.address;
      case "actions":
        return (
          <div className="relative flex items-center gap-2 custom-actions">
            <Tooltip color="danger" content="Delete product">
              <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleDeleteCartItem(item.productId)}>
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
      <div className="gap-4" style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px", marginRight:"30px" }}>
        <Button className="mt-4" color="primary" onClick={handleSendCart}>
          Send Cart
        </Button>
        <Button className="mt-4" color="primary" onClick={openEditAddressModal}>
          Edit Address
        </Button>
        <EditAddressModal
        isOpen={isEditAddressOpen}
        onOpenChange={closeEditAddressModal}
        address={currentAddress}
        setAddress={setCurrentAddress}
        handleSave={handleSaveAddress}
      />
      </div>
    </div>
  );
}

export default CartList;