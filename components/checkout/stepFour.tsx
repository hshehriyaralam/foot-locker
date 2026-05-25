import Image from 'next/image';
import React from 'react'
import product from "@/public/newAt.webp";
import { Dot } from 'lucide-react';


const StepFour = ({
toggleStep,
openSteps,
items
}:any
) => {
  const headingStyling =
    "text-black text-[24px] font-semibold flex items-center gap-3";
  return (
     <div className="p-4 lg:p-6">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleStep("review")}
            >
              <div className={`${headingStyling} text-[18px] lg:text-[24px]`}>
                <p>4</p>
                <p>Review</p>
              </div>
              <span className="text-[22px]">
                {openSteps.review ? "−" : "+"}
              </span>
            </div>

            {openSteps.review && (
              <>
                {items?.map((item:any )  => {
                            <div className="mt-4 space-y-3">
                           <div className="border p-3 flex items-center gap-3">
                             <Image src={item.image_url} height={80} width={80} alt="product" />
                             <div>
                               <p className="text-[18px]">{item.name}</p>
                               <p className="flex items-center text-[15px]">
                                 {item.mainCategory} {item.subCaegory} <Dot /> <span>{item.quantity}</span>
                               </p>
                             </div>
                           </div>
             
                           <div className="border flex justify-between p-3">
                             <p>Arrives in Standard (2-6 Working Days)</p>
                             <p>Free</p>
                           </div>
                         </div>
                         })}
              </>
            )}
               <button className="w-full h-[52px] bg-black text-white font-semibold mt-4  cursor-pointer">
                  Place Order
                </button>
          </div>
  )
}

export default  React.memo(StepFour) 
