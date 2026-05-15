import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductCard = ({ data }: { data: any }) => {
  return (
    <Link
      href={`/products/${data?.id}`}
      className='group relative min-w-[260px]  lg:min-w-[300px] 
       snap-start overflow-hidden rounded-2xl bg-white'
    >
      <div className='relative overflow-hidden bg-gradient-to-b from-gray-50 to-white'>
        <Image
          src={data.image}
          alt={data.name}
          width={500}
          height={500}
          className='h-[280px] w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105'
        />

        <div className='absolute bottom-0 left-0 w-full translate-y-full transition-all duration-500 group-hover:translate-y-0'>
          <button className='w-full bg-black py-4 font-maven  cursor-pointer
          text-sm font-medium tracking-wide text-white'>
            ADD TO CART
          </button>
        </div>
      </div>

      <div className='flex flex-col gap-1 px-2 py-4'>
        <p className=' text-[15px] font-semibold
         text-black lg:text-[17px]  font-maven'>
          {data.name}
        </p>

        <p className='text-sm text-gray-700  font-serif'>
          {data.category}
        </p>

        <p className='text-[15px] font-semibold text-black  font-maven'>
          £ {data.price}
        </p>
      </div>
    </Link>
  )
}

export default React.memo(ProductCard)