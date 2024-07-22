import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useDispatch } from "react-redux";
import { PressEvent } from "@react-types/shared";
import Swal from "sweetalert2";

import { MailIcon } from "../../../../public/icons/MailIcon";
import { LockIcon } from "../../../../public/icons/LockIcon";

import { login } from "@/services/auth/login";

interface LoginModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onOpenChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const credentials = { email, password };

      let log: any = login(credentials);


      await dispatch(log as any);
      

      onOpenChange();
    } catch (err: any) {
      setError("Login failed: " + err.message);
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="modal-login-container">
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose: ((e: PressEvent) => void) | undefined) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  value={email}
                  variant="bordered"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  variant="bordered"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex py-2 px-1 justify-between">
                  {/* <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox> */}
                  {/* <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link> */}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleLogin}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LoginModal;
