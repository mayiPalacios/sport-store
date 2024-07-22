
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "@nextui-org/card";
import { CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { Modal } from "@nextui-org/modal";
import { ModalContent } from "@nextui-org/modal";
import { ModalHeader } from "@nextui-org/modal";
import { ModalBody } from "@nextui-org/modal";
import { ModalFooter } from "@nextui-org/modal";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { Input } from "@nextui-org/input";
import { RootState } from "@/store/store";
import { User, setCredentials } from "@/features/auth/authSlice";
import axios from "axios";
import { MailIcon } from "@/public/icons/MailIcon"; 
import { LockIcon } from "@/public/icons/LockIcon";
import { getCookie } from "@/hooks/useGetCookie";
import ProfileEditModal from "../modals/ProfileEditModal";


const ProfileUser: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [userProfile, setUserProfile] = useState(user);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSave = (profile: any) => {
    setUserProfile(profile);
    
  };

  return (
    <section className="py-36">
      <div className="container flex items-center justify-center">
        <Card className="py-4 lg:w-3/4 xl:w-1/2">
          <CardBody className="overflow-visible py-2">
            <div className="flex gap-6">
              <div className="flex-1">
                <h2 className="text-lg font-bold uppercase">{userProfile.firstName} {userProfile.lastName}</h2>
                <p className="text-sm text-default-500">{userProfile.email}</p>
                <p className="text-sm text-default-500">{userProfile.address}</p>
                <p className="text-sm text-default-500">{userProfile.birthDate}</p>
                <div className="mt-6 flex gap-6">
                  <Button color="primary" radius="full" variant="bordered" onClick={onOpen}>
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <ProfileEditModal isOpen={isOpen} onClose={onClose} userProfile={userProfile} onSave={handleSave} />
    </section>
  );
};

export default ProfileUser;
