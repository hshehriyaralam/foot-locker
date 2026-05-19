"use client"
import TopProdcut from "@/components/product/topProdcut"
import CategoryProductCard from "@/components/common/categoryProductCard"
import FilterProduct from "@/components/product/filterProduct"
const NewIn = () => {
  return (
    <div className="min-h-screen w-full bg-white font-maven">
      <TopProdcut />

      <div className="px-4 py-6 lg:px-6">
        <div className="mb-6 flex flex-col gap-4 border-b border-gray-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-black  tracking-tight lg:text-[42px]">
              Men's Shoes
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              Showing 1430 results
            </p>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="sticky top-5 hidden h-fit w-[300px]  pr-6 lg:block">
            <h2 className="mb-6 text-2xl font-bold">
              Refine Results
            </h2>

        <FilterProduct />
          </div>

          <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4">
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

    
    </div>
  )
}

export default NewIn