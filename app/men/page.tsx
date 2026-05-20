"use client";
import {  useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import TopProdcut from "@/components/product/topProdcut";
import CategoryProductCard from "@/components/common/categoryProductCard";
import FilterProduct from "@/components/product/filterProduct";
import { allProducts } from "@/data/allProducts";

const Men = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([])
 const sidebarFilters = {
  brands: [...new Set(allProducts.map((b) => b.brand))],
  genders: [...new Set(allProducts.map((b) => b.gender))],
  colors: [...new Set(allProducts.map((c) => c.color))],
  sizes: [...new Set(allProducts.map((s) => s.size))],
  price: [...new Set(allProducts.map((s) => s.price))]
};


  const filteredProducts = useMemo(() => {
    if (selectedValues.length === 0) {
      return allProducts;}

    return allProducts.filter((product) => {
      return selectedValues.some((value) =>
        [product.brand,product.gender,product.color,product.size,product.price, ].includes(value)
      );
    });
  }, [selectedValues]);











  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white font-maven">
      <TopProdcut />

      <div className="px-2 py-6 lg:px-6">
        <div className="mb-6 flex flex-col gap-4 border-b border-gray-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight lg:text-[42px]">
              Men's Shoes
            </h1>

            <p className="mt-2 text-sm text-gray-600">Showing 1430 results</p>
          </div>

          <button
            onClick={() => setOpenFilter(true)}
            className="flex h-12 w-full items-center justify-center gap-2 border border-black text-sm font-semibold uppercase lg:hidden"
          >
            <SlidersHorizontal className="h-5 w-5" />
            Filter & Sort
          </button>
        </div>

        {openFilter && (
          <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
            <div className="absolute right-0 top-0 h-full w-[88%] overflow-y-auto bg-white p-4">
              <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-bold">Refine Results</h2>

                <button onClick={() => setOpenFilter(false)}>
                  <X className="h-7 w-7" />
                </button>
              </div>

              <FilterProduct
              filters={sidebarFilters}
              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}
              />
            </div>
          </div>
        )}

        <div className="flex gap-8">
          <div className="sticky top-5 hidden h-fit w-[300px] pr-6 lg:block">
            <h2 className="mb-6 text-2xl font-bold">Refine Results</h2>

            <FilterProduct 
                filters={sidebarFilters}
              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}
            />
          </div>

          <div className="grid flex-1 grid-cols-1 gap-3  lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts?.map((product) => (
                <div
                key={product.id}
                >
                    <CategoryProductCard
                    name={product.name}
                    productImages={product.image}
                    mainCategory={product.mainCategory}
                    subCategory={product.subCategory}
                    color={product.color}
                    price={product.price}
                  />
                  </div>
              ))
            }
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Men;
