"use client"

import { Button } from "@/components/ui/button";
import { logo } from "@/images/homeImages";
import { useModalStore } from "@/store/store";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {
    const toggleModal = useModalStore((state: any) => state.toggleModal);
  
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data:any) => {
    const firstName = data?.firstName
    const lastName = data?.lastName
    const email = data?.email
    const mobileNumber = data?.mobileNumber
    const postalCode = data?.postalCode
    const password = data?.password
    console.log(
      firstName,
      lastName,
      email,
      mobileNumber,
      postalCode,
      password
    )
  }
    
    


  
  
  return (
    <div className="w-full min-h-screen font-maven ">
      <div className="w-full bg-gray-100  flex flex-col items-center justify-center   h-40">
        <div className="flex flex-col items-center justify-center  gap-2">
          <Image src={logo} className="w-70" alt="logo" />
          <p className="font-maven text-black text-md text-center lg:max-w-[100%] max-w-[70%] ">
            Sign up for the best way to shop at Foot Locker UK and get
            personalized offers and more:
          </p>
        </div>
      </div>

      <form 
      onSubmit={handleSubmit(onSubmit)}
      className="p-4  mx-auto  ">
        <div className="max-w-[70%]  mx-auto   flex flex-col items-start justify-center gap-8  mt-6">
          <div className="w-full flex items-center justify-center gap-4">
            <input
             {...register("firstName")}
              required
              className="w-full  bg-transparent  border border-gray-500   hover:bg-white  p-2.5"
              type="text"
              placeholder="First Name*"
            />
            <input
              required
             {...register("lastName")}
              className="w-full  bg-transparent  border border-gray-500   hover:bg-white  p-2.5"
              type="text"
              placeholder="Last Name*"
            />
          </div>

          <input
             {...register("email")}
            required
            className="w-full  bg-transparent  border border-gray-500   hover:bg-white  p-2.5"
            type="email"
            placeholder="Email Address*"
          />

          <input
             {...register("mobileNumber")}
            required
            className="w-full  bg-transparent  border border-gray-500  
                 hover:bg-white  p-2.5 "
            type="number"
            placeholder="Mobile Number*"
          />

          <input
             {...register("postalCode")}
            required
            className="w-full  bg-transparent  border border-gray-500   hover:bg-white  p-2.5"
            type="text"
            placeholder="Postal Code*"
          />

          <input
             {...register("password")}
            required
            className="w-full  bg-transparent  border border-gray-500   hover:bg-white  p-2.5"
            type="password"
            placeholder="Password*"
          />

          {/* Condition */}
          <div className="flex flex-col  justify-center gap-2 ">
            <div className="flex items-center   gap-2">
              <input type="checkbox" />
              <p>
                Yes, I want to get emails from FLX Membership with special
                discounts and exclusive rewards.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <p>
                Yes, I want to subscribe to Foot Locker emails about new
                arrivals, sale campaigns and seasonal products.
              </p>
            </div>
          </div>

          <div className="mx-auto  flex flex-col items-center gap-4">
            <Button className="bg-black text-white  w-50 h-12 rounded-none text-md  font-maven cursor-pointer  ">
              Join FLX Membership
            </Button>

            <p className="text-sm font-bold">
              FLX Memeber?
              <Button 
              type="button"
              onClick={toggleModal}
              className="underline  font-medium    cursor-pointer  bg-transparent  text-black">Sign In</Button>
            </p>
            <p className="text-sm text-gray-800 ">
              Foot Locker Inc. Family of Brands
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default React.memo(Register);
