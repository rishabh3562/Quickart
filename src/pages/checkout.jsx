import React from "react";
import CheckoutGif from "../../public/gif/checkout.gif";
import Image from "next/image";
import SEO from "@/components/SEO";
function Checkout() {
  return (
    <>
      <SEO
        title="Checkout"
        description="Complete your purchase on Quickart and enjoy fast delivery and secure payment options."
        url="https://coneixement-assignment-frontend.vercel.app/checkout"
      />

      <div className="flex flex-col place-content-center place-items-center my-64">
        <Image src={CheckoutGif} alt="Checkout" width={200} height={200} />
        <div>
          <p className="text-center font-Lato">Checkout successful!</p>
        </div>
      </div>
    </>
  );
}

export default Checkout;
