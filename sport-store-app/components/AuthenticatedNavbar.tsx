import React, { useEffect } from "react";
import { NavbarContent, NavbarBrand, Navbar } from "@nextui-org/navbar";
import { Input } from "@nextui-org/input";
import { useRouter } from 'next/router';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@nextui-org/button";

import { AppDispatch, RootState } from "@/store/store";
import useDebounce from "@/hooks/useDebounce";
import {
  fetchSearchResults,
  setSearchTerm,
} from "@/features/search/searchSlice";

export default function AuthenticatedNavbar() {
  const dispatch = useDispatch<AppDispatch>();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const debouncedSearchTerm = useDebounce(searchTerm, 2000);
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const currentPath = router.pathname;

  const handleCartClick = () => {
    if(currentPath != '/cart'){
      router.push('/cart');
    }else{
      router.push('/');
    }
  };

  const routeProfileClick = () => {
      router.push('/profile');
  };

  function deleteCookie(name: string) {
    document.cookie = name + '=; Max-Age=0; path=/;';
  }
  

  function logout() {
    deleteCookie('token');
    window.location.href = '/';
  }

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(fetchSearchResults(debouncedSearchTerm));
    }
  }, [debouncedSearchTerm, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <p className="hidden sm:block font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[20rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <div className="flex gap-4 items-center">
              <Avatar showFallback src="https://images.unsplash.com/broken" />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>
            <DropdownItem key="settings" onClick={routeProfileClick}>My Profile</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={logout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {currentPath === '/cart' ? (
          <div className="flex gap-4 items-center">
          <Button isIconOnly aria-label="Like"  onClick={handleCartClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house-heart-fill" viewBox="0 0 16 16">
             <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.707L8 2.207 1.354 8.853a.5.5 0 1 1-.708-.707z"/>
             <path d="m14 9.293-6-6-6 6V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5zm-6-.811c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.691 0-5.018"/>
          </svg>
          </Button>
        </div>
        ) : (
          <div className="flex gap-4 items-center">
            <Button isIconOnly aria-label="Like" color="primary" onClick={handleCartClick}>
              <svg
                className="bi bi-cart"
                fill="currentColor"
                height="16"
                viewBox="0 0 16 16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
            </Button>
          </div>
        )}
      </NavbarContent>
    </Navbar>
  );
}
