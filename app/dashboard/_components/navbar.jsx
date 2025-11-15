"use client";

import { Logo } from "@/components/logo";
import { MobileSidebar } from "./mobile-sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useEffect, useState } from "react";

import { signOut } from "next-auth/react";

export const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    async function fetchMe() {
      try {
        const response = await fetch("/api/me");

        const data = await response.json();

        setLoggedInUser(data);

        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchMe();
  }, []);

  // handle logout
  const handleLogout = () => {
    signOut({
      redirect: true,
      callbackUrl: "/login",
    });
  };

  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <div className="flex items-center justify-end  w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer">
              <Avatar>
                <AvatarImage
                  src={loggedInUser?.profile_picture}
                  alt={loggedInUser?.firstName}
                />
                <AvatarFallback>{loggedInUser?.firstName}</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-4">
            <DropdownMenuItem className="cursor-pointer">
              <Link href="#" onClick={handleLogout}>
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
