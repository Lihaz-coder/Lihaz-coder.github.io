"use client";

import { HelpCircle, LogOut, Settings, UserCircle2 } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { placeholderUser } from "@/lib/navigation/dashboard-navigation";

export function UserMenu() {
  const placeholder = (feature: string) => toast.info(`${feature} is a placeholder in Milestone 2.`);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <Avatar className="size-8">
          <AvatarFallback>{placeholderUser.initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <p className="font-medium">{placeholderUser.name}</p>
          <p className="text-xs text-muted-foreground">{placeholderUser.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => placeholder("Profile")}> <UserCircle2 className="mr-2 size-4" /> Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={() => placeholder("Settings")}> <Settings className="mr-2 size-4" /> Settings</DropdownMenuItem>
        <DropdownMenuItem onClick={() => placeholder("Help")}> <HelpCircle className="mr-2 size-4" /> Help</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => placeholder("Logout")} className="text-destructive focus:text-destructive"> <LogOut className="mr-2 size-4" /> Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
