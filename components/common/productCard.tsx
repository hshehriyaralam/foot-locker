import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductCard = ({data}  :  {data:any}) => {
  return (
    <Link
    href={'/products/123'}
    className='   flex flex-col gap-2  w-60  min-h-50  cursor-pointer  snap-center '>
      <div  className='flex items-center justify-center 
       bg-gradient-to-b from-gray-50 from-10% to-white to-100%'>
        <Image
        src={data.image}
        alt='image'
        className='w-full h-full p-4  transition-transform duration-500 ease-in-out hover:scale-108 '
        />
      </div>
      <div  className='flex flex-col p-2   '>
        <p  className='text-black font-medium   text-lg  '>{data.name}</p>
        <p  className='text-gray-700 font-normal text-md  font-sans'>{data.category}</p>
        <p  className='text-black font-semibold font-maven text-md '>£ {data.price}</p>
      </div>
    </Link>
  )
}

export default  React.memo(ProductCard) 
