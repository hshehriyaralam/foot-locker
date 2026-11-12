
"use client";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

import TopProdcut from "@/components/product/topProdcut";
import CategoryProductCard from "@/components/common/categoryProductCard";
import FilterProduct from "@/components/product/filterProduct";
import { useFetchProductsQuery } from "@/store/services/productApi";
import CardModal from "@/components/cart/cardModal";
import { useSelector } from "react-redux";
import Loader from "@/components/common/loader";
import { usePathname, useSearchParams } from "next/navigation"; 


const Men = () => {
  const pathname = usePathname();
 const searchParams = useSearchParams(); 

  const { data: products = [], isLoading } =
    useFetchProductsQuery(undefined);

  const { cartOpen } = useSelector((state: any) => state.modal);

  const [selectedProduct, setSelectedProduct] = useState<any[]>([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const generateSlug = (value: string) =>
    value.toLowerCase().trim().replace(/\s+/g, "-");
  
  const pathSegments = pathname
  .split("/")
  .filter(Boolean)
  .map((segment) => decodeURIComponent(segment).toLowerCase());

const mainCategorySlug = pathSegments[0];                        
const subCategorySlug = searchParams.get("sub");                  
const brandSlug = searchParams.get("brand");   


  const categoryProducts = useMemo(() => {
    return products.filter((product: any) => {

      // Main Category Filter
      if (
        mainCategorySlug &&
        product.mainCategorySlug !== mainCategorySlug
      ) {
        return false;
      }

      // Subcategory Filter
      if (
        subCategorySlug &&
        product.subCategorySlug !== subCategorySlug
      ) {
        return false;
      }

      // Brand Filter
      if (
        brandSlug &&
        generateSlug(product.brand || "") !== brandSlug
      ) {
        return false;
      }

      return true;
    });
  }, [
    products,
    mainCategorySlug,
    subCategorySlug,
    brandSlug,
  ]);

  // Step 2: Generate sidebar filters
  const sidebarFilters = useMemo(() => {
    return {
      brands: [
        ...new Set(
          categoryProducts
            .map((p: any) => p.brand)
            .filter(Boolean)
        ),
      ],

      genders: [
        ...new Set(
          categoryProducts
            .map((p: any) => p.gender)
            .filter(Boolean)
        ),
      ],

      colors: [
        ...new Set(
          categoryProducts
            .map((p: any) => p.color)
            .filter(Boolean)
        ),
      ],

      sizes: [
        ...new Set(
          categoryProducts.flatMap((p: any) =>
            Array.isArray(p.size) ? p.size : [p.size]
          ).filter((size: any) => size !== undefined && size !== null)
        ),
      ],

      price: [
        ...new Set(
          categoryProducts
            .map((p: any) => p.price)
            .filter((price: any) => price !== undefined && price !== null)
        ),
      ],
    };
  }, [categoryProducts]);

  // Step 3: Apply sidebar filters
  const filteredProducts = useMemo(() => {
    if (selectedValues.length === 0) {
      return categoryProducts;
    }

    return categoryProducts.filter((product: any) => {

      const productValues = [
        product.brand,
        product.gender,
        product.color,
        ...(Array.isArray(product.size)
          ? product.size
          : [product.size]),
        product.price,
      ];

      return selectedValues.some((value) =>
        productValues.some(
          (productValue) =>
            String(productValue) === String(value)
        )
      );
    });
  }, [categoryProducts, selectedValues]);

  // Step 4: Dynamic Page Heading
  const pageTitle = useMemo(() => {
    if (brandSlug) {
      const brand = categoryProducts[0]?.brand;
      if (brand) return brand;
      return brandSlug;
    }

    if (subCategorySlug) {
      return (
        categoryProducts[0]?.subCategory ||
        subCategorySlug
      );
    }

    if (mainCategorySlug) {
      return (
        categoryProducts[0]?.mainCategory ||
        mainCategorySlug
      );
    }

    return "All Products";
  }, [
    categoryProducts,
    mainCategorySlug,
    subCategorySlug,
    brandSlug,
  ]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white font-maven">

      <TopProdcut />

      <div className="px-2 py-6 lg:px-6">

        {/* Page Header */}
        <div className="mb-6 flex flex-col gap-4 border-b border-gray-200 pb-5 lg:flex-row lg:items-end lg:justify-between">

          <div>
            <h1 className="text-3xl font-black tracking-tight lg:text-[42px]">
              {pageTitle}
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              Showing {filteredProducts.length} results out of{" "}
              {categoryProducts.length}
            </p>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setOpenFilter(true)}
            className="flex h-12 w-full items-center justify-center gap-2 border border-black text-sm font-semibold uppercase lg:hidden"
          >
            <SlidersHorizontal className="h-5 w-5" />
            Filter & Sort
          </button>
        </div>

        {/* Mobile Filter Sidebar */}
        {openFilter && (
          <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">

            <div className="absolute right-0 top-0 h-full w-[88%] overflow-y-auto bg-white p-4">

              <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">

                <h2 className="text-2xl font-bold">
                  Refine Results
                </h2>

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

        {/* Products Section */}
        <div className="flex gap-8">

          {/* Desktop Sidebar */}
          <div className="hidden sticky top-5 h-fit w-[300px] pr-6 lg:block">

            <h2 className="mb-6 text-2xl font-bold">
              Refine Results
            </h2>

            <FilterProduct
              filters={sidebarFilters}
              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}
              setOpenFilter={setOpenFilter}
            />

          </div>

          {/* Product Listing */}
          {isLoading ? (

            <div className="flex w-full items-center justify-center">
              <Loader />
            </div>

          ) : filteredProducts.length > 0 ? (

            <div className="grid flex-1 grid-cols-1 gap-3 lg:grid-cols-3 xl:grid-cols-4">

              {filteredProducts.map((product: any) => (

                <div key={product.id}>

                  <CategoryProductCard
                    product={product}
                    setSelectedProduct={setSelectedProduct}
                  />

                </div>

              ))}

            </div>

          ) : (

            <div className="flex flex-1 items-center justify-center py-20">

              <div className="text-center">

                <h2 className="text-2xl font-bold">
                  No Products Found
                </h2>

                <p className="mt-2 text-gray-500">
                  No products available for this category.
                </p>

              </div>

            </div>

          )}

        </div>

        {/* Cart Modal */}
        {cartOpen && (
          <CardModal selectedProduct={selectedProduct} />
        )}

      </div>
    </div>
  );
};

export default Men;
