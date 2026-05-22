"use client";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { cartModal } from "@/store/modalSlice";
import Image from "next/image";
import { Button } from "../ui/button";
import { addToCart } from "@/store/cartSlice";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CardModal = ({ selectedProduct }: any) => {
  const [stepOne, setStepOne] = useState(false);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const selectSize = (size: number) => {
    setSelectedSize((prev: any) => (prev === size ? null : size));
  };

  const handleAddToCart = () => {
    dispatch(addToCart(selectedProduct));
    setStepOne(true);
  };

  const navigateTocart = () => {
    router.push("/cart");
    dispatch(cartModal());
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="">
      <div
        onClick={() => dispatch(cartModal())}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]"
      />
      <div
        className=" fixed right-0 top-0 z-50 h-screen  w-[400px]  bg-white text-black
          shadow-2xl animate-slideIn  flex flex-col"
      >
        <div className="w-full   flex   flex-col  gap-2   ">
          <div className=" w-[100%] ">
            {!stepOne && (
              <div className={`${stepOne && "hidden"}`}>
                <div className=" w-[90%]  mx-auto flex flex-col   p-4  ">
                  <div className=" flex flex-col    gap-1 ">
                    <div className="flex items-center justify-between">
                      <h2 className="text-[26px] underline font-black font-semibold  tracking-tight ">
                        {selectedProduct?.name}
                      </h2>

                      <div
                        onClick={() => dispatch(cartModal())}
                        className="cursor-pointer"
                      >
                        <X className="w-6 h-6 text-black " />
                      </div>
                    </div>

                    <p className="text-gray-700 text-[14px]  mx-1">
                      {selectedProduct?.color}
                    </p>

                    <p className="text-[16px] font-medium  text-[#BA031D] mx-1 ">
                      {selectedProduct?.price}
                    </p>
                  </div>
                </div>
                <div
                  key={Math.random()}
                  className="bg-gray-100 p-5  h-[250px]  w-[80%] mx-auto "
                >
                  <Image
                    src={selectedProduct.image_url[0]}
                    width={250}
                    height={250}
                    alt="Details_Page"
                  />
                </div>

                <div className="  w-[90%] p-3 flex flex-col gap-1  mx-auto">
                  <div className="text-sm">
                    <p className="text-gray-700 ">
                      {selectedProduct?.mainCategory}{" "}
                      {selectedProduct?.subCategory}
                    </p>
                  </div>

                  <div>
                    <p className="text-xl font-bold text-black">
                      Select a size
                    </p>
                    <div className="   w-full grid grid-cols-4  gap-2 py-3">
                      {selectedProduct?.size?.map((size: any) => (
                        <div
                          onClick={() => selectSize(size)}
                          key={Math.random()}
                          className={`h-10 flex items-center justify-center p-1 rounded
                                      cursor-pointer hover:border hover:border-black
                                      ${selectedSize === size ? "bg-black text-white" : "bg-gray-100 text-black"}
                                      `}
                        >
                          <p className="text-md">{size}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    className="bg-black text-white  text-md  w-full hover:bg-black/60 
                  rounded-none h-14 cursor-pointer"
                  >
                    Add to bag
                  </Button>
                </div>
              </div>
            )}

            {stepOne && (
              <div className={`p-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-8 h-8 text-black" />
                    <h2 className="text-[26px]  font-black font-semibold  tracking-tight ">
                      Added to Bag
                    </h2>
                  </div>

                  <div
                    onClick={() => dispatch(cartModal())}
                    className="cursor-pointer"
                  >
                    <X className="w-6 h-6 text-black " />
                  </div>
                </div>

                <div className="p-2 py-4  w-full  flex items-center gap-1">
                  {/* Image div */}
                  <div className="w-[40%] bg-gray-100 flex items-center justify-center">
                    <Image
                      src={selectedProduct.image_url[0]}
                      width={100}
                      height={100}
                      alt="product_image"
                    />
                  </div>
                  {/* content div */}
                  <div className="flex flex-col  justify-center  p-3">
                    <h2 className="text-[15px] font-semibold">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-[13px] ">
                      {selectedProduct.mainCategory}{" "}
                      {selectedProduct.subCategory}
                    </p>
                    <p className="text-[13px]">{selectedProduct.color}</p>
                    <p className="text-[14px] font-semibold">
                      £{selectedProduct.price}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center  gap-2 my-2">
                  <Button
                    onClick={navigateTocart}
                    className="w-full bg-black text-white  text-md   hover:bg-black/60 
                                    rounded-none h-12 cursor-pointer"
                  >
                    View Bag (6 items)
                  </Button>

                  <Link className="w-full" href={"/checkout"}>
                    <Button
                      onClick={navigateTocart}
                      className="w-full bg-transparent text-black border border-black
                                     hover:shadow-[3px_3px_0px_0px_#9CA3AF]
                                    rounded-none h-11 cursor-pointer  text-md font-medium"
                    >
                      Proceed to checout
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CardModal);
