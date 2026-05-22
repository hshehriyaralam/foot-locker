"use client";
import {  useMemo, useState } from "react";
import {  SlidersHorizontal, X } from "lucide-react";
import TopProdcut from "@/components/product/topProdcut";
import CategoryProductCard from "@/components/common/categoryProductCard";
import FilterProduct from "@/components/product/filterProduct";
import { useFetchProductsQuery } from '@/store/services/productApi';
import CardModal from "@/components/cart/cardModal";
import { useSelector } from 'react-redux';



const Sale = () => {
    const [isClient, setIsClient] = useState(false);
  const { data : products, isLoading } = useFetchProductsQuery(undefined);
  const {  cartOpen  } = useSelector((state:any) => state.modal);
  const [selectedProduct, setSelectedProduct] = useState([])

  const [openFilter, setOpenFilter] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([])
 const sidebarFilters = {
  brands: [...new Set(products?.map((b:any) => b.brand))],
  genders: [...new Set(products?.map((b:any) => b.gender))],
  colors: [...new Set(products?.map((c:any) => c.color))],
  sizes: [...new Set(products?.map((s:any) => s.size))],
  price: [...new Set(products?.map((s:any) => s.price))]
};








  const filteredProducts = useMemo(() => {
   if( selectedValues.length === 0)  return products

    return products.filter((product:any) => {
      return selectedValues.some((value) =>
        [product.brand,product.gender,product.color,product.size,product.price, ].includes(value)
      );
    });
  }, [selectedValues,products]);


  

 
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white font-maven">
      <TopProdcut />

      <div className="px-2 py-6 lg:px-6">
        <div className="mb-6 flex flex-col gap-4 border-b border-gray-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight lg:text-[42px]">
              Men's Shoes
            </h1>

            <p className="mt-2 text-sm text-gray-600">Showing {filteredProducts?.length} results out of {products?.length}</p>
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
              setOpenFilter={setOpenFilter}
              
              />
            </div>
          </div>
        )}

        <div className="flex gap-8  ">
          <div className=" hidden  sticky top-5 h-fit w-[300px] pr-6 lg:block">
            <h2 className="mb-6 text-2xl font-bold">Refine Results</h2>

            <FilterProduct 
                filters={sidebarFilters}
                selectedValues={selectedValues}
                setSelectedValues={setSelectedValues}
                setOpenFilter={setOpenFilter}

                />
          </div>

          <div className="grid flex-1 grid-cols-1 gap-3  lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts?.map((product:any) => (
                <div key={product.id}>
                  <div>
                    <CategoryProductCard
                    product={product}
                    setSelectedProduct={setSelectedProduct}/>
                    </div>
                  </div>
              ))
            }
          
          </div>

       


        </div>
           
        {cartOpen &&  <CardModal  selectedProduct={selectedProduct}   />}
              
         
      </div>
    </div>
  );
};

export default Sale;
