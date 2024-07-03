import Link from "next/link";
import { CircleUser, CircleDot, Menu, Package2, Search } from "lucide-react"
import Image from "next/image";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";

import { Logo } from "@/components/custom/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LogoutButton } from "./LogoutButton";
import { Fragment } from "react";

export function LoggedInUser({
  userData,
}){
  return (
    <div className="flex gap-2">
      <Button variant="secondary" size="icon" className="rounded-full w-10 h-10 relative overflow-hidden">
        <Image
          fill
          src="https://placehold.co/600x400/jpg"
          style={{ objectFit: "cover" }}
          alt="alt text"
        />
        <CircleUser className="h-5 w-5" />
        <p>{userData.username}</p>
        <span className="sr-only">Toggle user menu</span>
      </Button>
    </div>
  );
}

export async function Header({ data }) {
  const user = await getUserMeLoader();
  // console.log(user);
  const { logoText, authButton } = data;
  return (
    <Fragment>
      <header className="fixed w-full top-0 flex h-16 items-center justify-between gap-4 border-b bg-black px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <CircleDot className="h-6 w-6" />
            <span className="sr-only">Diggin</span>
          </Link>
          <Link
            href="/home"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/discover"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Discover
          </Link>
        </nav>
        <div className="hidden md:flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search"
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {user.ok ? (
                <LoggedInUser userData={user.data} />
              ) : (
                <Link href={authButton.url}>
                  <Button>{authButton.text}</Button>
                </Link>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuSeparator />
              <Link href="/profile">
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem><LogoutButton /></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base sm:hidden"
        >
          <CircleDot className="h-6 w-6" />
          <span className="sr-only">Diggin</span>
        </Link>
        <Sheet className="">
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-6 text-sm font-medium">
              {user.ok ? (
                <LoggedInUser userData={user.data} />
              ) : (
                <Link href={authButton.url}>
                  <Button>{authButton.text}</Button>
                </Link>
              )}
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Profile
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Invite a Friend
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <LogoutButton />
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>      
    </Fragment>
  );
}