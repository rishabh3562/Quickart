import Navbar from "../ecommerce/Navbar";
import Footer from "../ecommerce/Footer";
import { useUserStore } from "@/store"; // Access user state from the store

export default function Layout({ children }) {
  const user = useUserStore((state) => state.user); // Get user data

  return (
    <>
      <Navbar user={user} /> {/* Pass user data if necessary */}
      <div className="w-full flex flex-row justify-center px-2"></div>
      <main>{children}</main>
      <Footer />
    </>
  );
}
