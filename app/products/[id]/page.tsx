"use client";

import BreadCrumb from "@/components/common/breadCrumb";
import React, { useState } from "react";
import {
  DetailOne,
  DetailTwo,
  DetailThree,
  DetailFour,
  DetailFive,
  DetailSix,
} from "@/images/Images";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProductDescription from "@/components/product/productDescription";
import ProductLis from "@/components/common/productLis";
import { seaonalRefresh } from "@/data/productData";

const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  const images = [
    DetailOne,
    DetailTwo,
    DetailThree,
    DetailFour,
    DetailFive,
    DetailSix,
    DetailThree,
  ];
  const sizes = [40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 46, 47.5];

  const selectSize = (size: number) => {
    setSelectedSize((prev: any) => (prev === size ? null : size));
  };
  return (
    <div className="w-full min-h-screen p-4  font-maven">
      <div className="relative left-0 py-4 ">
        <BreadCrumb />
      </div>
      <div className="w-full   flex  lg:flex-row flex-col  gap-2 ">
        <div className="lg:w-[62%]  hidden lg:grid   grid-cols-2  gap-4">
          {images?.map((img) => (
            <div key={Math.random()} className="bg-gray-100  p-3">
              <Image src={img} alt="Details_Page" />
            </div>
          ))}
        </div>

         <div className="lg:w-[62%] w-[100%] lg:hidden block">
          {images?.slice(0,1).map((img) => (
            <div key={Math.random()} className="bg-gray-100  p-3">
              <Image src={img} alt="Details_Page" />
            </div>
          ))}
        </div>

        <div className="lg:w-[38%]  w-[100%] p-4 flex flex-col gap-3">
          <h2 className="text-3xl font-black  tracking-tight lg:text-[28px]">
            Nike Air Max Tuned 1
          </h2>

          <div className="text-sm">
            <p className="text-gray-700 ">Men Shoes</p>
            <p
              className="text-gray-900 underline  font-medium  
              cursor-pointer  "
            >
              Explore Nike
            </p>
          </div>

          <div>
            <p className="text-[16px] font-medium  ">
              <span className="text-[#BA031D]  ">52.000 Ft</span> VAT included
            </p>
          </div>

          <p className="text-gray-700 text-[14px]">Black-Total Orange-Black</p>

          <div>
            <p className="text-xl font-bold text-black">Select a size</p>
            <div className="   w-full grid grid-cols-4  gap-2 py-4">
              {sizes?.map((size: any) => (
                <div
                  onClick={() => selectSize(size)}
                  key={Math.random()}
                  className={`h-10 flex items-center justify-center p-1 rounded
                  cursor-pointer hover:border hover:border-black
                   ${selectedSize === size ? "bg-black text-white" : "bg-gray-100 text-black"} `}
                >
                  <p className="text-md">{size}</p>
                </div>
              ))}
            </div>
          </div>

          <Button
            className="bg-black text-white  text-md  w-full hover:bg-black/60   rounded-none h-14
            cursor-pointer
            "
          >
            Add to bag
          </Button>
        </div>
      </div>

      <ProductDescription />

      <section className="w-full px-4 py-8 lg:px-10  mx-auto   ">
        <ProductLis data={seaonalRefresh} heading="Complete the Look" />
      </section>

      <section className="w-full px-4 py-8 lg:px-10  mx-auto   ">
        <ProductLis data={seaonalRefresh} heading="Recently Viewed" />
      </section>
    </div>
  );
};

export default React.memo(ProductDetails);
