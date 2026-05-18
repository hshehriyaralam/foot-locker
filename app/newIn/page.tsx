import TopProdcut from '@/components/categories/topProdcut'
import CategoryProductCard from '@/components/common/categoryProductCard'
import React from 'react'

const NewIn = () => {
  return (
      <div className='w-full min-h-screen p-6'>
      <TopProdcut  />
    <div  className='flex  mt-6'>
      {/* left container */}
      <div  className='w-[20%] h-100 border  hidden lg:block '>

        <h2>Mens Shoes</h2>
      </div>



      {/* Right Container */}
      <div  
       className='w-[80%] grid lg:grid-cols-4  grid-cols-1 lg:p-4 gap-4  p-0  ' 
      >

      <CategoryProductCard />
      <CategoryProductCard />
      <CategoryProductCard />
      <CategoryProductCard />
      <CategoryProductCard />
      <CategoryProductCard />
      <CategoryProductCard />
      <CategoryProductCard />
      </div>
    </div>

    </div>
  )
}

export default NewIn
