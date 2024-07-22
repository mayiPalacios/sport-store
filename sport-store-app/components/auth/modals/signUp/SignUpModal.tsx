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

import { MailIcon } from "../../../../public/icons/MailIcon";
import { LockIcon } from "../../../../public/icons/LockIcon";

import { register } from "@/services/auth/register";

interface LoginModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

const SignUpModal: React.FC<LoginModalProps> = ({ isOpen, onOpenChange }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    birthDate: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateAge = (birthDate: string) => {
    const birthday = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }

    return age;
  };

  const handleSubmit = async () => {
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      alert("Por favor, ingresa un correo electrónico válido.");

      return;
    }
    if (calculateAge(formData.birthDate) < 18) {
      alert("Debes ser mayor de 18 años para registrarte.");

      return;
    }

    try {
      // Llama al servicio de registro con los datos del formulario
      console.log("probando")
      const response = await register(formData);
 
      console.log("Registration successful", response);
      alert("Registro exitoso!");
      onOpenChange(); // Cierra el modal tras un registro exitoso
    } catch (error) {
      console.error("Registration failed:", error);
      alert("El registro ha fallado. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="modal-login-container">
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose: ((e: React.MouseEvent) => void) | undefined) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Sign Up</ModalHeader>
              <ModalBody>
                <Input
                  label="First Name"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <Input
                  label="Address"
                  name="address"
                  placeholder="Enter your shipping address"
                  value={formData.address}
                  onChange={handleChange}
                />
                <Input
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Input
                  label="Birth Date"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Sign Up
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SignUpModal;
