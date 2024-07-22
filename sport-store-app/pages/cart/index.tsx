import AuthenticatedNavbar from "@/components/AuthenticatedNavbar";
import CartList from "@/components/cart/cartList";

function Index() {
  return (
    <div>
      <AuthenticatedNavbar />
      <CartList />
    </div>
  );
}

export default Index;
