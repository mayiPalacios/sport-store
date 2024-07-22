import React, { useEffect } from "react";
import { NavbarContent, NavbarBrand, Navbar } from "@nextui-org/navbar";
import { Input } from "@nextui-org/input";
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
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div className="flex gap-4 items-center">
          <Button isIconOnly aria-label="Like" color="primary">
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
      </NavbarContent>
    </Navbar>
  );
}
