"use client";

import Link from "next/link";
// import { getServerSession } from "next-auth";
import { useTheme } from "next-themes";
import Container from "./Container";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Moon, ShoppingCart, Sun } from "lucide-react";
import ProfileButton from "./ProfileButton";

type Props = {
  isLoggedIn: boolean;
};
const Header = ({ isLoggedIn }: Props) => {
  const { theme, setTheme } = useTheme();
  const routes = [
    // {
    //   href: "/products",
    //   label: "Products",
    // },
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/products",
      label: "Products",
    },
    {
      href: "/upload",
      label: "Upload File",
    },
    {
      href: "/image-gallery",
      label: "Gallery",
    },
  ];
  // const session = getServerSession();
  // console.log("session", getServerSession());

  return (
    <section className="fixed top-0 left-0 sm:flex sm:justify-between py-3 px-4 border-b z-20 w-full dark:bg-black bg-white">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 md:hidden w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {routes.map((route, i) => (
                    <Link
                      key={i}
                      href={route.href}
                      className="block px-2 py-1 text-lg"
                      // onClick={() => console.log("close this sheet")}
                    >
                      <SheetClose>{route.label}</SheetClose>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/" className="ml-4 lg:ml-0">
              <h1 className="text-xl font-bold">STORE NAME</h1>
            </Link>
          </div>
          <nav className="mx-6 md:flex md:items-center md:space-x-4 lg:space-x-6 hidden ">
            {routes.map((route, i) => (
              <Button asChild variant="ghost" key={i}>
                <Link
                  href={route.href}
                  className="text-sm font-medium transition-colors"
                >
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">Shopping Cart</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              className="mr-6"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Moon className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Sun className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle Theme</span>
            </Button>
            {/* <ProfileButton /> */}
            {isLoggedIn ? <ProfileButton /> : <Link href="/login">Login</Link>}

            {/* <ProfileButton /> */}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Header;
