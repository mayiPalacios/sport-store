import AuthenticatedNavbar from "@/components/AuthenticatedNavbar";
import CartList from "@/components/cart/cartList";
import OrderList from "@/components/orders/OrderList";

function Index() {
  return (
    <div>
      <AuthenticatedNavbar />
      <CartList />
      <OrderList />
    </div>
  );
}

export default Index;
