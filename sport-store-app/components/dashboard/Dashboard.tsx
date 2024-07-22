import { useDisclosure } from "@nextui-org/modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AuthenticatedNavbar from "../AuthenticatedNavbar";
import AdShoes from "../ad/AdShoes";

import LoginModal from "@/components/auth/modals/login/LoginModal";
import CustomNavbar from "@/components/CustomNavbar";
import SignUpModal from "@/components/auth/modals/signUp/SignUpModal";
import { AppDispatch, RootState } from "@/store/store";
import { validateToken } from "@/api/validateToken";
import ProductList from "../product/ProductList";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Asegura el tipo correcto para dispatch
  const { token, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);

  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onOpen: onSignUpOpen,
    onClose: onSignUpClose,
  } = useDisclosure();

  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
  
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  
    return null;
  };

  useEffect(() => {
    const checkToken = async () => {
      let token = getCookie("token");
      console.log(token);

      if (token) {
        const valid = await validateToken(token);

        setIsValidToken(valid);
      } else {
        setIsValidToken(false);
      }
    };

    checkToken();
  }, [token]);

  if (isValidToken === null) {
    return <div>Loading...</div>; // O un spinner de carga
  }

  return (
    <div>
      { isValidToken ? (
        <div>
          <AuthenticatedNavbar />
          <ProductList />
        </div>
      ) : (
        <>
          <div>
            <CustomNavbar
              onLoginClick={onLoginOpen}
              onSignUpClick={onSignUpOpen}
            />
            <LoginModal isOpen={isLoginOpen} onOpenChange={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onOpenChange={onSignUpClose} />
          </div>
          <main className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="text-center">
              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                We invest in the world’s potential
              </h1>
              <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                Here at Flowbite we focus on markets where technology,
                innovation, and capital can unlock long-term value and drive
                economic growth.
              </p>
              <AdShoes />
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default Dashboard;
