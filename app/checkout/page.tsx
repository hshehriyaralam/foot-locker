"use client";
import CheckoutCart from "@/components/cart/checkoutCart";
import OrderSummary from "@/components/cart/orderSummary";
import {  useState } from "react";
import StepOne from "@/components/checkout/stepOne";
import StepTwo from "@/components/checkout/stepTwo";
import StepThree from "@/components/checkout/stepThree";
import StepFour from "@/components/checkout/stepFour";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Checkout = () => {
  const { totalQuantity, totalPrice , items} = useSelector((state: any) => state.cart);
  const { user, profile, loading } = useSelector(
    (state: RootState) => state.user,
  );
  const [openSteps, setOpenSteps] = useState({
    contact: true,
    package: false,
    payment: false,
    review: false,
  });

  const toggleStep = (step: keyof typeof openSteps) => {
    setOpenSteps((prev) => ({
      ...prev,
      [step]: !prev[step],
    }));
  }
  return (
    <section className="w-full min-h-screen p-3 lg:p-4 font-maven">
      <div className="w-full lg:w-[80%] mx-auto flex flex-col lg:flex-row justify-between gap-4">
        <div className="lg:w-[63%] w-full min-h-[500px] border">
          <StepOne
            toggleStep={toggleStep}
            openSteps={openSteps}
            user={profile}
            setOpenSteps={setOpenSteps}
          />

          <StepTwo
            toggleStep={toggleStep}
            openSteps={openSteps}
            setOpenSteps={setOpenSteps}
            user={profile}
          />

          <StepThree
            toggleStep={toggleStep}
            openSteps={openSteps}
            setOpenSteps={setOpenSteps}
            items={items}
          />

          <StepFour
           toggleStep={toggleStep}
            openSteps={openSteps} 
            items={items}
            />
        </div>

        <div className="lg:w-[37%] w-full">
          <div className="lg:sticky lg:top-10">
            <OrderSummary
              totalQuantity={totalQuantity}
              totalPrice={totalPrice}
            />
            {/* <CheckoutCart /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
