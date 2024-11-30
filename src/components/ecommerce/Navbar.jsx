"use client";

import Link from "next/link";
import { ShoppingCart, User, Menu } from "lucide-react";
import { useState } from "react";

// Example Cart Store Hook (replace with actual cart store logic)
import { useCartStore } from "@/store"; // Adjust the path if needed

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useCartStore((state) => [state.cart, state.setCart]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const navigation = [
    {
      name: "Cart",
      href: "/cart",
    },
  ];

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={handleMobileMenuToggle}
                className="p-2 rounded-md text-gray-500 hover:text-primary focus:outline-none"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="absolute left-0 top-16 w-full bg-white shadow-md p-4">
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Logo */}
            <Link href="/" className="text-xl font-bold">
              QuicKart
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:ml-8 lg:gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Cart and User Buttons */}
          <div className="flex items-center gap-4">
            <Link href="/cart">
              <button className="relative p-2 rounded-md text-gray-500 hover:text-primary focus:outline-none">
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 block w-4 h-4 rounded-full bg-red-500 text-white text-xs text-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </Link>
            <Link href="/login">
              <button className="p-2 rounded-md text-gray-500 hover:text-primary focus:outline-none">
                <User className="h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
