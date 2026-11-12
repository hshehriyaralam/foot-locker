"use client";
import OrderSummary from "@/components/cart/orderSummary";
import { useState } from "react";
import StepOne from "@/components/checkout/stepOne";
import StepTwo from "@/components/checkout/stepTwo";
import StepThree from "@/components/checkout/stepThree";
import StepFour from "@/components/checkout/stepFour";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { usePlaceOrderMutation } from "@/store/services/orderApi";
import { clearCart } from "@/store/cartSlice";
import { toast } from "sonner";
import CheckoutCart from "@/components/cart/checkoutCart";

const Checkout = () => {
  const { totalQuantity, totalPrice, items } = useSelector((state: any) => state.cart);
  const { user, profile } = useSelector((state: RootState) => state.user);

  const [placeOrder, { isLoading: isPlacingOrder }] = usePlaceOrderMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const [openSteps, setOpenSteps] = useState({
    contact: true,
    package: false,
    payment: false,
    review: false,
  });

  const toggleStep = (step: keyof typeof openSteps) => {
    setOpenSteps((prev) => ({ ...prev, [step]: !prev[step] }));
  };

  const handlePlaceOrder = async () => {
    if (!profile || !profile.id) {
      toast.error("Please login to place an order.", {position: 'top-center'});
      return;
    }
    if (!items || items.length === 0) {
      toast.error("Your cart is empty.", {position :  'top-center'});
      return;
    }

    try {
      const orderPayload = {
        user_id: profile.id,
        order_number: `FLX-${Math.floor(100000 + Math.random() * 900000)}`,
        total_amount: totalPrice,
        payment_method: "COD", // Abhi ke liye COD hi jayega
        shipping_address: {
          firstName: profile.first_name || "",
          lastName: profile.last_name || "",
          city: "Lahore", 
          postalCode: profile.postal_code || "",
        },
        items: items,
      };

      await placeOrder(orderPayload).unwrap();
      toast.success("Order placed successfully!", {position : "top-center"});
      dispatch(clearCart());
      router.push("/order");

    } catch (error: any) {
      console.error("Order Failed:", error);
      toast.error(error?.data?.message || "Failed to place order.", {position : "top-center"});
    }
  };

  return (
    <section className="w-full min-h-screen p-3 lg:p-4 font-maven">
      <div className="w-full lg:w-[80%] mx-auto flex flex-col lg:flex-row justify-between gap-4">
        <div className="lg:w-[63%] w-full min-h-[500px] border">
          <StepOne toggleStep={toggleStep} openSteps={openSteps} user={profile} setOpenSteps={setOpenSteps} />
          <StepTwo toggleStep={toggleStep} openSteps={openSteps} setOpenSteps={setOpenSteps} user={profile} />
          <StepThree toggleStep={toggleStep} openSteps={openSteps} setOpenSteps={setOpenSteps} items={items} />
          
          {/* ✅ Props passed for order placement */}
          <StepFour
            toggleStep={toggleStep}
            openSteps={openSteps}
            items={items}
            onPlaceOrder={handlePlaceOrder}
            isPlacingOrder={isPlacingOrder}
          />
        </div>

        <div className="lg:w-[37%] w-full">
          <div className="lg:sticky lg:top-10">
            <OrderSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;