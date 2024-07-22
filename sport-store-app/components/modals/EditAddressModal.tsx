import React, { ChangeEvent, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { PressEvent } from "@react-types/shared";

interface EditAddressModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  address: string;
  setAddress: (address: string) => void;
  handleSave: () => void;
}

const EditAddressModal: React.FC<EditAddressModalProps> = ({
  isOpen,
  onOpenChange,
  address,
  setAddress,
  handleSave,
}) => {
  const [newAddress, setNewAddress] = useState<string>(address);

  const handleChangeAddress = (e : ChangeEvent<HTMLInputElement>) =>{
    setNewAddress(e.target.value.toString());
  }

  const handleSaveAddress = () => {
    setAddress(newAddress);
    handleSave();
  }
  return (
    <div className="modal-login-container">
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose: ((e: PressEvent) => void) | undefined) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit Address</ModalHeader>
              <ModalBody>
                <Input
                  label="Address"
                  placeholder="Enter your address"
                  value={newAddress}
                  variant="bordered"
                  onChange={(e) => handleChangeAddress(e)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSaveAddress}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditAddressModal;
