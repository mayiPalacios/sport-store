// src/utils/sendCart.ts
import axios from 'axios';
import { getCookie } from '@/hooks/useGetCookie';
import Swal from 'sweetalert2';

export const sendCart = async (userId: string, shippingAddress: string): Promise<void> => {
  const path = 'http://localhost:8082/api/orders/create';
  const body = {
    userId,
    shippingAddress,
  };

  try {
    let token = getCookie('token');
    const response = await axios.post(path, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if(response.status == 200 ){
      Swal.fire({
        title: "Orden Exitosa",
        text: `Numero de orden ${response.data.orderId}`,
        icon: "success",
        confirmButtonText: "Ok",
      });

    }
  } catch (error) {
    console.error('Error creating order:', error);
  }
};
