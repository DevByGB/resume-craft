"use client"

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { LogOut, SquareUser } from "lucide-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";

type UserDropdownProps = {
  user?: User;
};

export const UserDropdown = ({ user }: UserDropdownProps) => {
  if (!user) return null;

  const initials = user?.name
    ?.split(" ")
    ?.slice(0, 2)
    .map((name) => name[0])
    .join("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full gap-2 justify-start px-2">
          <Avatar className="w-7 h-7 block">
            <AvatarImage src={user.image ?? ""} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <p>{user.name}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-[var(--radix-dropdown-menu-trigger-width)]"
      >
        <Link passHref href="/dashboard/account">
          <DropdownMenuItem className="gap-2">
            <SquareUser size={16} />
            Configurações de Conta
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem
          className="gap-2 text-red-500"
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
        >
          <LogOut size={16} />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
