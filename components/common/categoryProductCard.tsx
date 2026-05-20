 "use client"
import React, { useState } from "react"
import Image from "next/image"
import {
  Plus,
  Star,
} from "lucide-react"
import { Product } from "@/types/product"
import Link from "next/link"
const CategoryProductCard = ({
  name,
  mainCategory,
  subCategory,
  color ,
  price,
  productImages,
}:Product) => {
  const [selectedImage, setSelectedImage] =
    useState(productImages[0])




  return (
    <div
     
       className="group w-full bg-white transition-all duration-300   cursor-pointer
      hover:shadow-[0px_4px_0px_0px_#000]  hover:border hover:border-black">
      <div className="relative overflow-hidden bg-[#f5f5f5]">
        <div className="absolute right-2 bottom-2 z-20 flex gap-2  ">
          <button className="flex h-8 w-8 items-center justify-center cursor-pointer
          rounded-full bg-black transition hover:scale-105">
            <Plus className="h-4 w-4 text-white" />
          </button>
        </div>

        <div className="flex items-center justify-center p-6">
          <Image
            src={selectedImage}
            alt="product-image"
            className="h-[220px] w-full object-contain transition duration-500 group-hover:scale-105 md:h-[260px]"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
        {productImages?.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`  transition-all duration-300   cursor-pointer 
              hover:border-b hover:border-black ${ selectedImage === img ? "border-" : "border-transparent"}
              `}
              >
            <Image
              src={img}
              alt="preview-image"
              className="h-14 w-14 object-contain "
            />
          </button>
        ))}

        <p className="ml-1 whitespace-nowrap text-sm text-gray-600">
          +17
        </p>
      </div>

      <div className="px-4 pb-5">
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-black" />
          <Star className="h-3.5 w-3.5 fill-black" />
          <Star className="h-3.5 w-3.5 fill-black" />
          <Star className="h-3.5 w-3.5 fill-black" />
          <p className="ml-1 text-sm text-gray-600">
            (99)
          </p>
        </div>

        <h2 className="mt-2 text-[17px] font-semibold text-black">
          {name}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {mainCategory} - {subCategory}
        </p>

        <p className="  text-sm  text-gray-500">
          {color}
        </p>

        <div className="mt-4 flex items-center gap-3">
          <p className="text-[17px] font-bold text-black">
            {price}
          </p>

          <p className="text-md text-gray-400 line-through">
            {price}
          </p>
        </div>
      </div>
    </div>
  )
}

export default React.memo(CategoryProductCard)