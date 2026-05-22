"use client";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { cartModal } from "@/store/modalSlice";
import Image from "next/image";
import { Button } from "../ui/button";
import { addToCart } from "@/store/cartSlice";


const CardModal = ({selectedProduct}:any) => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const dispatch = useDispatch();

  const selectSize = (size: number) => {
    setSelectedSize((prev: any) => (prev === size ? null : size));
  };


  const hadleAddToCart = () => {
     dispatch(addToCart(selectedProduct))
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div  className="">
      <div
        onClick={() => dispatch(cartModal())}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]"
      />
      <div
        className=" fixed right-0 top-0 z-50 h-screen  w-[400px]  bg-white text-black
          shadow-2xl animate-slideIn  flex flex-col">
        <div 
        className="w-full   flex   flex-col  gap-2 ">
          <div className=" w-[100%] ">
            <div className=" w-[90%]  mx-auto flex flex-col   p-4">
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
                  {selectedProduct?.mainCategory} {selectedProduct?.subCategory}
                </p>
              </div>

              <div>
                <p className="text-xl font-bold text-black">Select a size</p>
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
              onClick={hadleAddToCart}
                className="bg-black text-white  text-md  w-full hover:bg-black/60 
                  rounded-none h-14 cursor-pointer">
                Add to bag
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default React.memo(CardModal);
