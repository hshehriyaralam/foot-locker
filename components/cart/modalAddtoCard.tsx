import { X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSelector } from "react-redux";





const ModalForAddToCard = ({product, setShowModal}:any) => {
      const {  totalQuantity, totalPrice } = useSelector(
    (state: any) => state.cart,
  );

  return (
    <div className="">
      <div
        className=" fixed right-8 top-30 z-50 min-h-[450px]  w-[350px]  bg-white text-black
              shadow-2xl animate-slideIn  flex flex-col  border border-gray-200"
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-[22px]  text-black font-medium font-maven  tracking-tight ">
            Item Added to Cart
          </h2>

          <div
          onClick={() => setShowModal(false)}
          className="cursor-pointer">
            <X className="w-6 h-6 text-black " />
          </div>
        </div>

        <div className="flex  gap-4 justify-center   w-full p-4 border-b border-gray-3 ">
          <div className=" p-1  w-[30%] ">
             {product?.image_url?.slice(0,1).map((img: any) => (
                        <div key={Math.random()} className="">
                          <Image src={img} alt="added images" width={100} height={100} />
                        </div>
                      ))}
          </div>

          <div className="flex flex-col gap-4     w-[70%]   ">
            <p className="text-md font-normal">{product?.name}</p>
            <p className="text-gray-700">{product?.mainCategory}  {product?.subCategory}</p>
            <div className="flex  gap-5">
              <p className="text-gray-900">Color</p>
              <p className="font-semibold">{product?.color}</p>
            </div>
            <p className="font-semibold"> £{product?.price}</p>
            <p className="font-semibold">VAT included</p>
          </div>

          <div></div>
        </div>

        <div  className="w-full  p-3">
          <div  className="flex  items-center justify-between  mx-2">
            <p><span  className="font-semibold">{totalQuantity}</span> Items </p>
            <p>Subtotal £{totalPrice}</p>
          </div>

          <div className="flex flex-col items-center  gap-2 my-2">
            <Link className="w-full" href={"/cart"}>
            <Button
              className="w-full bg-black text-white  text-md   hover:bg-black/60 
              rounded-none h-12 cursor-pointer"
              >
              Cart
            </Button>
                </Link>

            <Link className="w-full" href={"/checkout"}>
              <Button
                className="w-full bg-transparent text-black border border-black
                                     hover:shadow-[3px_3px_0px_0px_#9CA3AF]
                                    rounded-none h-11 cursor-pointer  text-md font-medium"
              >
                Proceed to checout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ModalForAddToCard);
