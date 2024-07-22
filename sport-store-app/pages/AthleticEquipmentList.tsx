// components/AthleticEquipmentList.tsx
import React from "react";
import { useDisclosure } from "@nextui-org/modal";

import LoginModal from "@/components/auth/modals/login/LoginModal";
import CustomNavbar from "@/components/CustomNavbar";
import SignUpModal from "@/components/auth/modals/signUp/SignUpModal";

const AthleticEquipmentList: React.FC = () => {
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

  return (
    <div>
      <CustomNavbar onLoginClick={onLoginOpen} onSignUpClick={onSignUpOpen} />
      <LoginModal isOpen={isLoginOpen} onOpenChange={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onOpenChange={onSignUpClose} />
    </div>
  );
};

export default AthleticEquipmentList;
