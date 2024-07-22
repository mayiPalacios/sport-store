import axios from 'axios';

export const deleteCartItem = async (userId: string, productId: number, token: string) => {
  const path = 'http://localhost:8082/api/cart/remove';
  const body = {
    userId,
    productId,
  };

  try {
    const response = await axios.request({
        url: path,
        method: 'delete',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: body,
      });

    return response.data;
  } catch (error) {
    console.error('Error deleting cart item:', error);
    throw error;
  }
};
