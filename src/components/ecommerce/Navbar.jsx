"use client";

import Link from "next/link";
import { ShoppingCart, User, Menu, LogOut } from "lucide-react";
import { useState ,useEffect} from "react";

// Example Cart Store Hook (replace with actual cart store logic)
import { useCartStore, useUserStore } from "@/store"; // Adjust the path if needed

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Track the popover's open/close state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useCartStore((state) => [state.cart, state.setCart]);
  const { user,logout } = useUserStore();
// console.log("user in navbar",user)
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

  const handleUserClick = () => {
    setIsOpen(!isOpen); // Toggle popover visibility
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".user-popover")) {
      setIsOpen(false); // Close the popover if the click is outside
    }
  };

  // Add a listener to handle clicks outside of the popover
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
            {/* Conditional Rendering based on User Authentication */}
            {user?.email ? (
              <>
                {/* Cart Icon */}
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

                {/* User Icon with Click Popover */}
                <div className="relative user-popover">
                  <button
                    onClick={handleUserClick}
                    className="p-2 rounded-md text-gray-500 hover:text-primary focus:outline-none"
                  >
                    <User className="h-5 w-5" />
                  </button>

                  {/* Popover content */}
                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md">
                      <div className="flex flex-col p-4 space-y-2">
                        <p className="text-sm font-medium text-gray-700">
                          {user.email}
                        </p>
                        <button
                          onClick={logout}
                          className="text-sm text-red-500 hover:text-red-600 flex items-center gap-2"
                        >
                          <LogOut className="h-5 w-5" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Login/Signup Button */}
                <Link href="/login">
                  <button className="p-2 rounded-md text-gray-500 hover:text-primary focus:outline-none">
                    Login
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="p-2 rounded-md text-gray-500 hover:text-primary focus:outline-none">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
