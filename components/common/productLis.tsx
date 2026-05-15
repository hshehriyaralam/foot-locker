'use client'

import React, { useRef } from 'react'
import ProductCard from './productCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ProductList = ({
  data,
  heading,
}: {
  data: any
  heading: string
}) => {
  

  return (
    <div className='w-full '>
      <div className='mx-auto w-full'>
        <div className='mb-5 flex items-center justify-between'>
          <h2 className='text-[18px] font-semibold text-black lg:text-[32px]  font-maven'>
            {heading}
          </h2>

          <div className='hidden items-center gap-2 md:flex'>
            <button
              
              className='flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white transition hover:bg-black hover:text-white'
            >
              <ChevronLeft size={18} />
            </button>

            <button
              className='flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white transition hover:bg-black hover:text-white'
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          className='flex snap-x snap-mandatory gap-4 overflow-x-auto '
        >
          {data?.slice(0, 10)?.map((item: any) => (
            <ProductCard key={item.id} data={item} />
          ))}
        </div>

        {/* <div className='mt-6 h-[3px] w-full overflow-hidden rounded-full bg-gray-200'>
          <div className='h-full w-[30%] rounded-full bg-black'></div>
        </div> */}
      </div>
    </div>
  )
}

export default React.memo(ProductList)