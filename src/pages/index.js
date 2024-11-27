import Link from "next/link";
import React from "react";

export default function Example() {
  return (
    <div className=" overflow-hidden  min-h-screen my-[-45px] h-full">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-70 filter blur-sm"
        src="https://res.cloudinary.com/df20zuygj/video/upload/v1724014855/sale_light_tielwf.mp4"
        autoPlay
        loop
        muted
      ></video>

      {/* Overlay to darken the video */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="relative pt-6 pb-16 sm:pb-24">
        <main className="mx-auto mt-40 max-w-7xl px-4 sm:mt-48">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-8xl font-Lustria  uppercase leading-xl">
              <span className="block xl:inline font-Lustria">KharidLo</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-pink-700-950 sm:text-2xl md:mt-5 md:max-w-3xl md:text-3xl font-Lato">
              Beyond fashion, a lifestyle.
            </p>
            <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  href="/products"
                  className="flex w-full items-center justify-center 
                  rounded-md border
                   border-white
                    hover:bg-transparent px-8 py-3 text-base 
                    font-medium hover:text-white bg-white
                     text-black transition duration-300 ease-in-out md:py-4 md:px-10 md:text-lg font-Lato"
                >
                  Explore Fashion
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
