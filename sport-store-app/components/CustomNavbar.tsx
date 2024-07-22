import React from 'react';
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  Navbar,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import LoginModal from './auth/modals/login/LoginModal';

interface CustomNavbarProps {
  onLoginClick: () => void;
  onSignUpClick: () => void;
}

const CustomNavbar: React.FC<CustomNavbarProps> = ({ onLoginClick, onSignUpClick }) => {
  return (
    <Navbar position="static">
      <NavbarBrand>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
        <Button onClick={onLoginClick}>Login</Button>
        </NavbarItem>
        <NavbarItem>
        <Button onClick={onSignUpClick}>Sign Up</Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default CustomNavbar;
