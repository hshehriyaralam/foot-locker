"use client";
import CheckOutCart from "@/components/cart/checkoutCart";
import OrderProduct from "@/components/cart/orderProduct";
import OrderSummary from "@/components/cart/orderSummary";
import { useSelector } from "react-redux";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";

const Cart = () => {
  const router = useRouter();
  const { items, totalQuantity, totalPrice } = useSelector(
    (state: any) => state.cart,
  );
  const { user, profile, loading } = useSelector(
    (state: RootState) => state.user,
  );

  const navigation = () => {
    if (!profile) {
      router.push("/checkout/login");
    } else {
      router.push("/checkout");
    }
  };

  return (
    <section className="w-full min-h-screen  font-maven">
      <div className="max-w-[95%]   mx-auto ">
        <div className="flex items-center justify-between mx-2 lg:mx-0  py-8">
          <h2 className="font-extrabold lg:text-4xl text-3xl ">My Cart</h2>
          <p className="font-medium text-xl ">€ {totalPrice}</p>
        </div>

        <div className="w-full flex flex-col   lg:flex-row  justify-center lg:gap-4  ">
          {/* card history */}
          <div className="lg:w-[67%]  w-[100%]  min-h-[400px]  flex flex-col items-center gap-4 py-2 ">
            {items.length === 0 ? (
              <div className="mt-10  flex flex-col items-center gap-2">
                <h2 className="font-maven text-black font-semibold">
                  Product not found for Checkout
                </h2>
                <Link
                  href={"/men"}
                  className="bg-black text-white  text-md  hover:bg-black/60 
                  rounded-none  px-12  py-2  cursor-pointer  "
                >
                  Go to Shoping
                </Link>
              </div>
            ) : (
              <>
                {items?.map((item: any) => (
                  <div key={item.id}>
                    <OrderProduct
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      color={item.color}
                      mainCategory={item.subCategory}
                      subCaegory={item.mainCategory}
                      Quantity={item.quantity}
                      image={item.image_url[0]}
                    />
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Payement history */}
          <div className="lg:w-[33%]    w-[100%]  min-h-[500px]  ">
            <div className="w-full  top-10 sticky">
              <OrderSummary
                totalQuantity={totalQuantity}
                totalPrice={totalPrice}
              />
              <CheckOutCart navigation={navigation} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Cart);
