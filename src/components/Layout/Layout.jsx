import Navbar from "../ecommerce/Navbar";
import Footer from "../ecommerce/Footer";
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="w-full flex flex-row justify-center my-5 px-2"></div>
      <main>{children}</main>
      <Footer />
    </>
  );
}
