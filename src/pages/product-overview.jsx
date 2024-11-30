import { useState, useEffect } from "react";
import { Disclosure, Tab } from "@headlessui/react";
import NoProduct from "../../public/png/file.png";
import {
  HeartIcon,
  MinusIcon,
  PlusIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/20/solid";
import { products } from "@/data/index";
import Router from "next/router";
import Link from "next/link";
import { useCartStore, useLikeStore } from "@/store";
import { isInCart, isLiked } from "@/lib/utilityFunctions";
import { toast } from "react-hot-toast";
import { Icon } from "@iconify/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({});
  const [pid, setPid] = useState(null);
  const [cart, setCart] = useCartStore((state) => [state.cart, state.setCart]);
  const [like, setLike] = useLikeStore((state) => [state.like, state.setLike]);

  useEffect(() => {
    setPid(Router.query.pid);
    const product = products.find((p) => p.id === parseInt(Router.query.pid));
    // console.log(product);

    setProduct(product);
  }, [Router.query.pid]);

  return pid != null ? (
    <div className="bg-white">
      <header className="relative bg-white"></header>

      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Tab.Group as="div" className="flex flex-col-reverse">
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {product.images.map((image) => (
                    <Tab
                      key={image.id}
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only"> {image.name} </span>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <Image
                              src={image.src}
                              alt=""
                              className="h-full w-full object-cover object-center"
                              width={64}
                              height={64}
                            />
                          </span>
                          <span
                            className={classNames(
                              selected ? "ring-gray-500" : "ring-transparent",
                              "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
                {product.images.map((image) => (
                  <Tab.Panel key={image.id}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover object-center sm:rounded-lg"
                      width={500}
                      height={500}
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.name}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {"₹ " + product.price}
                </p>
              </div>

              <div className="mt-3">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          4 > rating ? "text-gray-900" : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{4} out of 5 stars</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="space-y-6 text-base text-gray-700"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>

              <form className="mt-6">
                <div className="mt-10 flex">
                  {isInCart(cart, product) ? (
                    <>
                      <button
                        type="submit"
                        className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-black py-3 px-8 text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        Added to cart
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="submit"
                        className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-black py-3 px-8 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                        onClick={(e) => {
                          e.preventDefault();
                          setCart([...cart, product]);
                          toast.success("Added to cart");
                        }}
                      >
                        Add to cart
                      </button>
                    </>
                  )}

                  {isLiked(like, product) ? (
                    <>
                      <button
                        type="button"
                        className="ml-4 flex items-center justify-center rounded-md py-3 px-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                      >
                        <Icon
                          icon="heroicons-solid:heart"
                          className="h-6 w-6 text-red-600 cursor-pointer"
                          onClick={() => {
                            setLike(
                              like.filter((item) => item.id !== product.id)
                            );
                          }}
                        />
                        <span className="sr-only">Add to favorites</span>
                      </button>{" "}
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="ml-4 flex items-center justify-center rounded-md py-3 px-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                      >
                        <Icon
                          icon="heroicons-outline:heart"
                          className="h-6 w-6 text-gray-500 cursor-pointer"
                          onClick={() => {
                            setLike([...like, product]);
                          }}
                        />
                        <span className="sr-only">Add to favorites</span>
                      </button>{" "}
                    </>
                  )}
                </div>
              </form>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="divide-y divide-gray-200 border-t">
                  {product.details.map((detail) => (
                    <Disclosure as="div" key={detail.name}>
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                              <span
                                className={classNames(
                                  open ? "text-gray-600" : "text-gray-900",
                                  "text-sm font-medium"
                                )}
                              >
                                {detail.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel
                            as="div"
                            className="prose prose-sm pb-6"
                          >
                            <div className=" flex flex-row">
                              {detail.items.map((item) => (
                                <div key={item} className="flex items-center">
                                  <span className="ml-2 text-white text-xs bg-black px-4 py-0.5 rounded-full">
                                    {item}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <section
            aria-labelledby="related-heading"
            className="mt-10 border-t border-gray-200 py-16 px-4 sm:px-0"
          >
            <h2
              id="related-heading"
              className="text-xl font-bold text-gray-900"
            >
              Customers also bought
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {products.slice(4).map((product) => (
                <div key={product.id}>
                  <Link href={`/product-overview?pid=${product.id}`}>
                    <div className="relative">
                      <div className="relative h-72 w-full overflow-hidden rounded-lg">
                        <Image
                          src={product.imageSrc}
                          alt={product.imageAlt}
                          className="h-full w-full object-cover object-center hover:scale-110 transform transition-all duration-500 ease-in-out"
                          width={400}
                          height={400}
                        />
                      </div>
                      <div className="relative mt-4">
                        <h3 className="text-sm font-medium text-gray-900">
                          {product.name}
                        </h3>
                      </div>
                      <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                        <div
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                        />
                        <p className="relative text-lg font-semibold text-white">
                          {"₹ " + product.price}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div className="mt-6">
                    {isInCart(cart, product) ? (
                      <button className="relative flex items-center justify-center rounded-md border border-transparent  py-2 px-8 text-sm font-medium  bg-black text-white w-full">
                        Added to cart
                        <span className="sr-only">, {product.name}</span>
                      </button>
                    ) : (
                      <button
                        className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-black hover:text-white w-full cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          setCart([...cart, product]);
                          toast.success("Added to cart");
                        }}
                      >
                        Add to cart
                        <span className="sr-only">, {product.name}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  ) : (
    <>
      <div className="">
        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-col items-center">
            <Image
              src={NoProduct}
              alt="No product found"
              width={400}
              height={400}
            />
            <h1 className="text-2xl font-bold mt-4">No product found</h1>
          </div>
        </div>
      </div>
    </>
  );
}
