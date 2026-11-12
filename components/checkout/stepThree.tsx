"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Dot } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner"; // ✅ Sonner Import

const StepThree = ({ toggleStep, openSteps, setOpenSteps, items }: any) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentSaved, setPaymentSaved] = useState(false);
  const [cardData, setCardData] = useState({ cardNumber: "", mm: "", yy: "", csc: "" });

  const headingStyling = "text-black text-[24px] font-semibold flex items-center gap-3";

  const handlePaymentSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "CARD") {
      toast.error("Card payment is currently not available. Please select Cash on Delivery.", {position : "top-center"});
      setPaymentMethod(""); // Reset selection
      return;
    }
    setPaymentMethod(value);
  };

  const handleSaveContinue = () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }
    setPaymentSaved(true);
    setOpenSteps((prev: any) => ({ ...prev, review: true }));
  };

  return (
    <div>
      <div className="p-4 lg:p-6 border-b">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleStep("payment")}
        >
          <div className={`${headingStyling} text-[18px] lg:text-[24px]`}>
            <p>3</p>
            <p>Payment</p>
          </div>
          <span className="text-[22px]">{openSteps.payment ? "−" : "+"}</span>
        </div>

        {/* Saved Payment View */}
        {paymentSaved && (
          <div className="border p-4 mt-5 space-y-2">
            {paymentMethod === "COD" && <p className="font-semibold">Cash On Delivery</p>}
          </div>
        )}

        {/* Payment Selection View */}
        {openSteps.payment && !paymentSaved && (
          <div className="mt-6">
            <label className="flex items-center gap-3 border p-4 mb-4 cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={handlePaymentSelect}
              />
              Cash On Delivery
            </label>

            <label className="flex items-center gap-3 border p-4 cursor-pointer hover:bg-gray-50 opacity-60">
              <input
                type="radio"
                name="payment"
                value="CARD"
                checked={paymentMethod === "CARD"}
                onChange={handlePaymentSelect}
              />
              Credit / Debit Card (Coming Soon)
            </label>

            {/* ✅ FIXED MAP for Items Display */}
            <div className="mt-4 space-y-3">
              {items?.map((item: any) => (
                <div key={item.id} className="border p-3 flex items-center gap-3">
                  <Image src={item?.image_url[0]} height={80} width={80} alt="product" />
                  <div>
                    <p className="text-[18px]">{item.name}</p>
                    <p className="flex items-center text-[15px]">
                      {item.mainCategory} {item.subCaegory} <Dot /> <span>{item.quantity}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleSaveContinue}
              className="w-full h-[52px] bg-black text-white mt-6 font-semibold cursor-pointer hover:bg-gray-800 transition-colors"
            >
              Save and Continue
            </button>
          </div>
        )}

        {/* Edit Button */}
        <div className="w-full py-1 mt-3 flex justify-center">
          {paymentSaved && (
            <Button
              className="rounded-none h-10 w-full text-black bg-transparent border border-black cursor-pointer hover:bg-gray-50"
              onClick={() => {
                setPaymentSaved(false);
                setOpenSteps((prev: any) => ({ ...prev, payment: true }));
              }}
            >
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(StepThree);