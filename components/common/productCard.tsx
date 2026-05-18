import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductCard = ({ data }: { data: any }) => {
  return (
    <Link
      href={`/products/${data?.id}`}
      className='group relative min-w-[260px]  lg:min-w-[300px] flex-shrink-0 snap-start bg-white'
    >
      <div className='relative overflow-hidden bg-[#f5f5f5]'>
        <Image
          src={data.image}
          alt={data.name}
          width={500}
          height={500}
          className='h-[240px] w-full object-contain p-6 transition-all duration-500 group-hover:scale-105 lg:h-[290px]'
        />

        <div className='absolute bottom-0 left-0 w-full translate-y-full transition-all duration-300 group-hover:translate-y-0'>
          <button
            className='w-full bg-black py-4 font-maven text-[13px] font-semibold tracking-[1px] text-white  cursor-pointer '
          >
            ADD TO CART
          </button>
        </div>
      </div>

      <div className='flex flex-col gap-[2px] px-2 py-4'>
        <div className='mb-2 w-fit bg-black px-[6px] py-[2px] text-[11px] font-bold text-white'>
          NEW
        </div>

        <h3 className='font-maven text-[16px] font-semibold text-black lg:text-[18px]'>
          {data.name}
        </h3>

        <p className='text-[15px] text-gray-600'>
          {data.category}
        </p>

        <p className='mt-2 font-maven text-[17px] font-semibold text-black'>
          £ {data.price}
        </p>
      </div>
    </Link>
  )
}

export default React.memo(ProductCard)