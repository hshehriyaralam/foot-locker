import { topProductdData } from '@/data/topProductData'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import React from 'react';

 const TopProdcut = () => {
  return (
    <div className="w-full py-2 overflow-hidden">
      
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-4 w-max px-2">
          {topProductdData?.map((data: any) => (
            <div key={data.id} className="flex-shrink-0">
              
              <div className="w-40 sm:w-44 md:w-48 hover:border hover:border-black">
                <Image
                  src={data.image}
                  alt={"Product Image"}
                />
              </div>

              <div>
                <button
                  className="group relative overflow-hidden uppercase text-[14px]
                  font-medium font-mono px-2 py-1 flex items-center
                  justify-center gap-2 cursor-pointer text-black
                  transition-colors duration-300 bg-transparent"
                >
                  <span
                    className="absolute inset-0 bg-black translate-y-full
                    group-hover:translate-y-0 transition-transform
                    duration-300 ease-out"
                  />

                  <span
                    className="relative z-10 group-hover:text-white
                    transition-colors duration-300"
                  >
                    {data.tittle}
                  </span>

                  <ArrowRight
                    className="relative z-10 w-5 text-black
                    group-hover:text-white transition-colors duration-300"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(TopProdcut)
