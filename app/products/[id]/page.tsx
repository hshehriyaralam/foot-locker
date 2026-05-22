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
import { useParams } from "next/navigation";
import { useSingleProductQuery } from "@/store/services/productApi";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useSingleProductQuery(id);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

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
          {product?.image_url?.map((img: any) => (
            <div key={Math.random()} className="bg-gray-100  p-3">
              <Image width={350} height={350} src={img} alt="Details_Page" />
            </div>
          ))}
        </div>

        <div className="lg:w-[62%] w-[100%] lg:hidden block">
          {product?.image_url?.slice(0, 1).map((img: any) => (
            <div key={Math.random()} className="bg-gray-100  p-3">
              <Image src={img} width={350} height={350} alt="Details_Page" />
            </div>
          ))}
        </div>

        <div className="lg:w-[38%]  w-[100%] p-4 flex flex-col gap-3">
          <h2 className="text-3xl font-black  tracking-tight lg:text-[28px]">
            {product?.name}
            {/* Nike Air Max Tuned 1 */}
          </h2>

          <div className="text-sm">
            <p className="text-gray-700 ">
              {product?.mainCategory} {product?.subCategory}
              {/* Men Shoes */}
            </p>
            <p
              className="text-gray-900 underline  font-medium  
              cursor-pointer  "
            >
              Explore {product?.brand}
            </p>
          </div>

          <div>
            <p className="text-[16px] font-medium  ">
              <span className="text-[#BA031D]  ">{product?.price} Ft</span> VAT
              included
            </p>
          </div>

          <p className="text-gray-700 text-[14px]">{product?.color}</p>

          <div>
            <p className="text-xl font-bold text-black">Select a size</p>
            <div className="   w-full grid grid-cols-4  gap-2 py-4">
              {product?.size?.map((size: any) => (
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
