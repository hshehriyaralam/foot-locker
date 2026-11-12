import Image from 'next/image';
import React from 'react';
import { Dot } from 'lucide-react';

const StepFour = ({ toggleStep, openSteps, items, onPlaceOrder, isPlacingOrder }: any) => {
  const headingStyling = "text-black text-[24px] font-semibold flex items-center gap-3";

  return (
    <div className="p-4 lg:p-6 border-b">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => toggleStep("review")}
      >
        <div className={`${headingStyling} text-[18px] lg:text-[24px]`}>
          <p>4</p>
          <p>Review</p>
        </div>
        <span className="text-[22px]">{openSteps.review ? "−" : "+"}</span>
      </div>

      {openSteps.review && (
        <div className="mt-4 space-y-3">
          {items?.map((item: any) => (
            <div key={item.id} className="border">
              <div className="p-3 flex items-center gap-3">
                <Image src={item?.image_url[0]} height={80} width={80} alt="product" />
                <div>
                  <p className="text-[18px]">{item.name}</p>
                  <p className="flex items-center text-[15px]">
                    {item.mainCategory} {item.subCaegory} <Dot /> <span>{item.quantity}</span>
                  </p>
                </div>
              </div>
              <div className="border-t flex justify-between p-3 bg-gray-50">
                <p>Arrives in Standard (2-6 Working Days)</p>
                <p>Free</p>
              </div>
            </div>
          ))}

          <button
            onClick={onPlaceOrder}
            disabled={isPlacingOrder}
            className={`w-full h-[52px] text-white font-semibold mt-4 cursor-pointer transition-colors
              ${isPlacingOrder ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"}`}
          >
            {isPlacingOrder ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(StepFour);