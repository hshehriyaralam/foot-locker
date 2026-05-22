"use client";
import Image from "next/image";
import React from "react";
import { useSelector, useDispatch } from "react-redux";


const OrderProduct = ({
  name,
  price,
  color,
  mainCategory,
  subCaegory,
  Quantity,
  image,
}: 
  {name : string
    price : number
  color : string,
  mainCategory : string
  subCaegory : string
  Quantity : number,
  image : string,
}

) => {
  
  return (
    <div className="max-w-[800px]  min-h-[200px]  border   flex   font-maven">
      <div className="bg-gray-100 lg:w-[20%] w-[30%] h-full flex items-center justify-center  p-4">
        <Image src={image} width={200} height={300} alt="order-product" />
      </div>

      <div className="bg-white lg:w-[80%] w-[70%] h-full  lg:p-4 flex   lg:flex-row  flex-col    lg:gap-x-8">
        <div className="flex flex-col p-2 gap-1">
          <p className="text-[#0E1111]  font-semibold  text-lg ">{name}</p>
          <p>
            <span className="font-medium text-md text-[#BA031D]  ">
              £{price}
            </span>{" "}
            VAT included
          </p>
          <div className="">
            <p className="text-[#515151]  text-[12.5px]">Faded Denim {color}</p>
            <p className="text-[#515151]   text-[12.5px] -mt-[2px]   ">
              {mainCategory} {subCaegory}
            </p>
          </div>
          <p className="text-[#515151] text-[13px] mt-2">Qty {Quantity}</p>
        </div>

        <div className="flex flex-col p-2 lg:gap-8 gap-2  ">
          <div className="hidden lg:flex flex items-center  ">
            <p className="font-medium text-[15px]">Ship to me</p>
            <p className="text-[11.5px] text-[#515151]  mx-10 ">
              Standard (2-6 Working Days)
            </p>
          </div>
          <p className="text-[#515151] text-xs">Excluded from discount </p>

          <div className="flex items-center gap-x-4  text-xs">
            <button className="underline  tax-xs  cursor-pointer">
              Save for later
            </button>

            <button 
            className="underline  tax-xs cursor-pointer">Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(OrderProduct);
