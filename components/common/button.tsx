"use client"
import { ArrowRight } from "lucide-react"

const ShopNowBtn = () => {
  return (
   <div>
  <button
    className=" group relative overflow-hidden uppercase text-[14px] font-medium font-mono
      w-30 lg:w-28 h-8 flex items-center justify-center gap-2   cursor-pointer
      text-black transition-colors duration-300  bg-gray-200   ">
    <span
      className=" absolute inset-0 bg-black translate-y-full group-hover:translate-y-0
        transition-transform duration-300 ease-out"/>

    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
      SHOP NOW
    </span>

    <ArrowRight
      className=" relative z-10 w-5  text-black group-hover:text-white transition-colors duration-300"
    />
  </button>
</div>
  )
}

export default ShopNowBtn




