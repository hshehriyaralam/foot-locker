import React from "react"
import { overviewData } from "@/data/overviewData"
import Image from "next/image"
import { ArrowRight } from "lucide-react"



const OverView = () => {
  return (
    <div className='w-full   mx-auto relative my-4   '>
      <div  className="flex  lg:flex-row flex-col items-center justify-center   w-full ">
        {
          overviewData?.map((data) => (
            <div
            key={data.id}
            className="flex lg:flex-row flex-col items-center justify-center  w-full   relative"
            >
              <Image
              alt='.....'
              src={data.image}
              className=' w-full h-[450px] relative'
              />


                 <div
              className='absolute lg:bottom-20  left-10  bottom-30     text-white  flex flex-col 
               lg:items-start  lg:justify-start    items-center   justify-center  gap-4'
              >
              { data?.heading && (
                <p className=" text-[24px]  lg:text-[30px]  font-extrabold  leading-[1] transition-all duration-300  max-w-[400px]  font-mono
                ">
                {data?.heading}
              </p>
              )
              }
              <button
              className='bg-gray-200/90 hover:bg-black    text-black hover:text-white  
               uppercase text-[14px]   transition duration-300   cursor-pointer font-medium  font-mono
               lg:w-26   w-30  flex  items-center  justify-center gap-2  group relative'>
                SHOP NOW 
                <ArrowRight  className='text-black group-hover:text-white w-5  ' />
              </button>
              </div>
              </div>
          ))
        }
      </div>
    </div>
  )
}

export default  React.memo(OverView) 
