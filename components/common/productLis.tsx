import React from 'react'
import ProductCard from './productCard'

const ProductList = ({data,heading} : {data : any , heading : string }) => {
  return (
    <div  className='w-full '>
      <div  className='p-2'>
        <h2  className='font-maven  font-semibold lg:text-[30px]  text-[16px] my-4  '>
          {heading}
          </h2>
          <div  className='flex items-center justify-center gap-3  overflow-auto '>
            {data?.slice(0,10)?.map((data :  any,) => (
                <div
                className='flex items-center justify-center gap-1   snap-x '
                key={data.id}>
                  <ProductCard  data={data} />
                </div>
              ))
            }
          </div>
      </div>
    </div>
  )
}

export default   React.memo(ProductList)
