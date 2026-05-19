"use client";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

const ProductDescription = () => {
  const [showDescription, setShowDescription] = useState(false);
  return (
    <div
      className="w-full max-w-[1200px]  py-4  my-10
      mx-auto border-t border-b border-gray-400  py-4  font-maven flex flex-col gap-4"
    >
      <div className="flex items-center justify-between  lg:mx-0 mx-2">
        <h2 className="font-semibold text-xl ">Details</h2>

        <div
          onClick={() => setShowDescription((prev) => !prev)}
          className="w-8 h-8 border  border-gray-500  cursor-pointer  flex items-center justify-center    rounded-full  transition duration-500"
        >
          {showDescription ? (
            <Minus className="w-6 h-6 text-gray-500   " />
          ) : (
            <Plus className="w-6 h-6 text-gray-500 " />
          )}
        </div>
      </div>

      <div>
        {showDescription && (
          <div className="transition duration-300   text-gray-700 font-normal font-maven text-md
          lg:mx-0 mx-2
          ">
            <div className="mb-2">
              <p>Product #: 314218485804</p>
              <p>Supplier-sku #: U19067F1</p>
            </div>
            <p>
              The 1906W, like its cousins the 2002R and the 860v2, is led by a
              sole unit featuring a combination of flexible ACTEVA LITE
              cushioning, shock absorbing N-ergy, and segmented ABZORB SBS pods
              at the heel. This hi-tech approach is also reflected in the
              1906W’s upper design, which features open-holed mesh and a series
              of curvilinear synthetic overlays. This distinctive take on the
              era’s design conventions offers a refined execution of
              high-performance heritage.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ProductDescription);
