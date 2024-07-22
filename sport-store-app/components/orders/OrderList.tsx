import React, { useCallback, useEffect, useState } from "react";
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
import { RootState } from "@/store/store";
import { getCookie } from "@/hooks/useGetCookie";


interface ProductItem {
  productId: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  quantity: number;
}

interface Order {
  orderId: number;
  orderDate: string;
  shippingAddress: string;
  status: string;
  deliveryDate: string;
  items: ProductItem[];
}

const productColumns = [
  { name: "Product Name", uid: "nombre" },
  { name: "Price", uid: "precio" },
  { name: "Quantity", uid: "quantity" },
  { name: "Image", uid: "imagen" },
];

const OrderList: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        console.error("User not logged in");
        return;
      }

      try {
        const token = getCookie("token");
        const response = await axios.get(
          `http://localhost:8082/api/orders/user/${user?.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user]);

  const renderCell = useCallback(
    (item: ProductItem, columnKey: keyof ProductItem) => {
      const cellValue = item[columnKey];

      switch (columnKey) {
        case "nombre":
          return cellValue;
        case "precio":
           return `$${cellValue.toFixed(2)}`;
        case "quantity":
          return cellValue;
        case "imagen":
          return (
            <img
              alt={item.nombre}
              height="50"
              src={item.imagen}
              width="50"
            />
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <div style={{ padding: "10px" }}>
    {Array.isArray(orders) && orders.length > 0 ? (
      orders.map((order) => (
        <div key={order.orderId} className="order-container">
          <h3>Order ID: {order.orderId}</h3>
          <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
          <p>Shipping Address: {order.shippingAddress}</p>
          <p>Status: {order.status}</p>
          <p>Delivery Date: {new Date(order.deliveryDate).toLocaleString()}</p>
          <div
            style={{
              overflowY: "auto",
              maxHeight: "400px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            <Table
              aria-label="Products in order"
              className="custom-table"
              style={{ height: "auto", minWidth: "100%" }}
            >
              <TableHeader columns={productColumns}>
                {(column) => (
                  <TableColumn
                    key={column.uid}
                    align={column.uid === "actions" ? "center" : "start"}
                    className="custom-header"
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={order.items}>
                {(item) => (
                  <TableRow key={item.productId}>
                    {(columnKey) => (
                      <TableCell className="custom-cell">
                        {renderCell(item, columnKey as keyof ProductItem)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      ))
    ) : (
      <p>No orders available</p>
    )}
  </div>
  );
};

export default OrderList;