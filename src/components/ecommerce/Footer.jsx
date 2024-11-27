import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="bg-white text-black">
      <div className="container mx-auto px-4 py-8 mt-8">
        <div className="flex flex-wrap justify-between items-start">
        
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h2 className="text-2xl font-bold font-Lustria">KharidLo</h2>
            <p className="mt-4 text-sm font-Lato text-gray-600">
              Get the latest fashion trends and be inspired
            </p>
          </div>

         
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-gray-800">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-gray-800">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-800">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-gray-800">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

        
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-4">Stay Connected</h3>
            <form className="mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
              >
                Subscribe
              </button>
            </form>
            <div className="flex space-x-4 justify-center md:justify-start">
              {/* <a href="https://facebook.com" className="hover:text-gray-800">
                <span className="sr-only">Facebook</span>
    
              </a>
              <a href="https://twitter.com" className="hover:text-gray-800">
                <span className="sr-only">Twitter</span>
                
              </a>
              <a href="https://instagram.com" className="hover:text-gray-800">
                <span className="sr-only">Instagram</span>
                
              </a> */}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-4 text-center">
          <p className="text-sm text-gray-500">
            &copy; 2024 KharidLo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
