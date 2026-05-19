import Image from 'next/image'
import React from 'react'
import product from '@/public/product1.webp'

const OrderProduct = () => {
  return (
    <div  className='max-w-[800px]  min-h-[200px]  border   flex   font-maven'>

        <div  className='bg-gray-100 lg:w-[20%] w-[30%] h-full flex items-center justify-center  p-4'>
            <Image
            src={product}
            alt='order-product'
            />
        </div>



        <div  className='bg-white lg:w-[80%] w-[70%] h-full  lg:p-4 flex   lg:flex-row  flex-col    lg:gap-x-8'>



            <div  className='flex flex-col p-2 gap-1'>
                <p  className='text-[#0E1111]  font-semibold  text-lg '>Asics GEL-1130</p>
                <p><span className='font-medium text-md text-[#BA031D]  '>£89.99</span> VAT  included</p>
                <div  className=''>
                <p className='text-[#515151]  text-[12.5px]'>Faded Denim-Pure Silver</p>
                <p  className='text-[#515151]   text-[12.5px] -mt-[2px]   ' >Women Shoes 6.5</p>
                </div>
                <p  className='text-[#515151] text-[13px] mt-2'>Qty 1</p>
            </div>


            <div className='flex flex-col p-2 lg:gap-8 gap-2  '>
                <div  className='hidden lg:flex flex items-center  '>
                <p  className='font-medium text-[15px]'>Ship to me</p>
                <p  className='text-[11.5px] text-[#515151]  mx-10 '>Standard (2-6 Working Days)</p>
                </div>
                <p className='text-[#515151] text-xs'>Excluded from discount   </p>

                <div  className='flex items-center gap-x-4  text-xs'>
                    <button  
                    className='underline  tax-xs  cursor-pointer'
                    >
                        Save for later
                    </button>

                      <button  
                    className='underline  tax-xs cursor-pointer'
                    >
                        Remove
                    </button>

                </div>
            </div>
        </div>
    </div>
  )
}

export default   React.memo(OrderProduct) 
