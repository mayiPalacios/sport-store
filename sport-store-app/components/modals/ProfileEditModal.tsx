import Image from "next/image";
import { Modal } from "@nextui-org/modal";
import { ModalContent } from "@nextui-org/modal";
import { ModalHeader } from "@nextui-org/modal";
import { ModalBody } from "@nextui-org/modal";
import { ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { MailIcon } from "@/public/icons/MailIcon"; 
import { LockIcon } from "@/public/icons/LockIcon";
import { getCookie } from "@/hooks/useGetCookie";
import React, { useEffect, useState } from 'react';
import { updateProfile, updateUserProfile } from "@/services/auth/updateUser";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";


interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: {
    id(id: any, formData: { firstName: string; lastName: string; address: string; email: string; birthDate: string; }): unknown;
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    birthDate: string;
  };
  onSave: (profile: any) => void;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ isOpen, onClose, userProfile, onSave }) => {
  const [formData, setFormData] = useState(userProfile);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  
  useEffect(() => {
    setFormData(userProfile);
  }, [userProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (user) {
      dispatch(updateProfile({ userId: user.id, profileData: formData }));
      onSave(formData);
      onClose();
    }
  };
  
  return (
    <div className="modal-login-container">
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Edit Profile</ModalHeader>
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
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
            />
            <Input
              endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
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
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onClick={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={handleSubmit}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfileEditModal;
