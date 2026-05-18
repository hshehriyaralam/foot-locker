import TopProdcut from '@/components/categories/topProdcut'
import CategoryProductCard from '@/components/common/categoryProductCard'


const Men = () => {
  return (
    <div className='w-full min-h-screen p-6  font-maven'>
      <TopProdcut  />
    <div  className='flex  mt-6'>
      {/* left container */}
      <div  className='w-[20%] h-100   hidden lg:block '>

        <div  className='my-4 '>

        <h2  className='font-extrabold font-maven text-4xl text-black mb-'>Mens Shoes</h2>
        <p  className='text-gray-700  text-md '>Showing 1430 results</p>
        </div>



        <p  className='font-[600] font-maven text-[24px] text-black'>Refine Result</p>

        <div  className='border w-full  h-100'>

        </div>
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

export default Men
