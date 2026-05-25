"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Dot } from "lucide-react";
import Image from "next/image";
import product from "@/public/newAt.webp";

const StepThree = ({ toggleStep, openSteps, setOpenSteps,items }: any) => {
  
  const [paymentMethod, setPaymentMethod] = useState("");

  const [paymentSaved, setPaymentSaved] = useState(false);

  const [cardData, setCardData] = useState({
    cardNumber: "",
    mm: "",
    yy: "",
    csc: "",
  });

  const headingStyling =
    "text-black text-[24px] font-semibold flex items-center gap-3";


    console.log("items ffrom step Three ", items)
  

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

        {paymentSaved && (
          <div className="border p-4 mt-5 space-y-2">
            {paymentMethod === "COD" && (
              <p className="font-semibold">Cash On Delivery</p>
            )}

            {paymentMethod === "CARD" && (
              <div>
                <p className="font-semibold">Card Payment</p>
                <p>**** **** **** {cardData.cardNumber.slice(-4)}</p>
                <p>
                  Expiry: {cardData.mm}/{cardData.yy}
                </p>
              </div>
            )}
          </div>
        )}

        {openSteps.payment && !paymentSaved && (
          <div className="mt-6">
            <label className="flex items-center gap-3 border p-4 mb-4">
              <input
                type="radio"
                name="payment"
                value="COD"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash On Delivery
            </label>

            <label className="flex items-center gap-3 border p-4">
              <input
                type="radio"
                name="payment"
                value="CARD"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Credit / Debit Card
            </label>

            {paymentMethod === "CARD" && (
              <div className="mt-5 space-y-2">
                <input
                  value={cardData.cardNumber}
                  onChange={(e) =>
                    setCardData({
                      ...cardData,
                      cardNumber: e.target.value,
                    })
                  }
                  className="w-full border h-[52px] px-4"
                  placeholder="Card Number"
                />

                <div className="flex gap-2">
                  <input
                    value={cardData.mm}
                    onChange={(e) =>
                      setCardData({
                        ...cardData,
                        mm: e.target.value,
                      })
                    }
                    className="w-full border h-[52px] px-4"
                    placeholder="MM"
                  />

                  <input
                    value={cardData.yy}
                    onChange={(e) =>
                      setCardData({
                        ...cardData,
                        yy: e.target.value,
                      })
                    }
                    className="w-full border h-[52px] px-4"
                    placeholder="YY"
                  />

                  <input
                    value={cardData.csc}
                    onChange={(e) =>
                      setCardData({
                        ...cardData,
                        csc: e.target.value,
                      })
                    }
                    className="w-full border h-[52px] px-4"
                    placeholder="CSC"
                  />
                </div>
              </div>
            )}


            {items.map((item:any )  => {
               <div className="mt-4 space-y-3">
              <div className="border p-3 flex items-center gap-3">
                <Image src={item.image_url} height={80} width={80} alt="product" />
                <div>
                  <p className="text-[18px]">{item.name}</p>
                  <p className="flex items-center text-[15px]">
                    {item.mainCategory} {item.subCaegory} <Dot /> <span>{item.quantity}</span>
                  </p>
                </div>
              </div>

              <div className="border flex justify-between p-3">
                <p>Arrives in Standard (2-6 Working Days)</p>
                <p>Free</p>
              </div>
            </div>
            })}
           

            <button
              onClick={() => {
                setPaymentSaved(true);
                setOpenSteps((prev: any) => ({
                  ...prev,
                  review: true,
                }));
              }}
              className="w-full h-[52px] bg-black text-white mt-6 font-semibold  cursor-pointer"
            >
              Save and Continue
            </button>
          </div>
        )}



        {
          paymentSaved &&  (
            <>
             {items.map((item:any )  => {
               <div className="mt-4 space-y-3">
              <div className="border p-3 flex items-center gap-3">
                <Image src={item.image_url} height={80} width={80} alt="product" />
                <div>
                  <p className="text-[18px]">{item.name}</p>
                  <p className="flex items-center text-[15px]">
                    {item.mainCategory} {item.subCaegory} <Dot /> <span>{item.quantity}</span>
                  </p>
                </div>
              </div>

              <div className="border flex justify-between p-3">
                <p>Arrives in Standard (2-6 Working Days)</p>
                <p>Free</p>
              </div>
            </div>
            })}
            </>
          )
        }
        
           

        <div className="w-full py-1 mt-3 flex justify-center">
          {paymentSaved && (
            <Button
              className={`rounded-none h-10 w-full   text-black bg-transparent border border-black cursor-pointer`}
              onClick={() => {
                setPaymentSaved(false);
                setOpenSteps((prev: any) => ({
                  ...prev,
                  contact: true,
                }));
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
