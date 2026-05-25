"use client";
import { Button } from "@/components/ui/button";
import { logo } from "@/images/Images";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {  useDispatch } from 'react-redux';
import {  toggleModal} from '@/store/modalSlice';
import { handleSignUp } from "@/lib/helper/signUpHandler";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

const Register = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  // const { isOpen } = useSelector((state:any) => state.modal);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit =  async  (data: any) => {
    const firstName = data?.firstName;
    const lastName = data?.lastName;
    const email = data?.email;
    const phoneNumber = data?.mobileNumber;
    const postalCode = data?.postalCode;
    const password = data?.password;
    const name = firstName +  lastName
    await handleSignUp({ firstName, name, lastName,  email, password, postalCode, phoneNumber, reset,setLoading, toast});
  };

  const inputStyling = `
    w-full
    bg-gray-50
    border
    border-gray-400
    hover:bg-white
    focus:outline-none
    focus:border-black
    p-3
    text-sm
    md:text-base
  `;

  return (
    <div className="w-full min-h-screen font-maven">
      <div className="w-full bg-gray-100 flex flex-col items-center justify-center px-4 py-8 md:h-40">
        <div className="flex flex-col items-center justify-center gap-3">
          <Image
            src={logo}
            className="w-44 sm:w-56 md:w-72 h-auto"
            alt="logo"
          />

          <p className="text-black text-sm sm:text-base text-center max-w-md md:max-w-2xl">
            Sign up for the best way to shop at Foot Locker UK and get
            personalized offers and more:
          </p>
        </div>
      </div>


      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full px-4 sm:px-6 md:px-10 py-8"
      >
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
  
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <input
              {...register("firstName")}
              required
              className={inputStyling}
              type="text"
              placeholder="First Name*"
            />

            <input
              {...register("lastName")}
              required
              className={inputStyling}
              type="text"
              placeholder="Last Name*"
            />
          </div>


          <input
            {...register("email")}
            required
            className={inputStyling}
            type="email"
            placeholder="Email Address*"
          />


          <input
            {...register("mobileNumber")}
            required
            className={inputStyling}
            type="tel"
            placeholder="Mobile Number*"
          />

    
          <input
            {...register("postalCode")}
            required
            className={inputStyling}
            type="text"
            placeholder="Postal Code*"
          />

 
          <input
            {...register("password")}
            required
            className={inputStyling}
            type="password"
            placeholder="Password*"
          />

          
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" />

              <p className="text-sm text-gray-700 leading-relaxed">
                Yes, I want to get emails from FLX Membership with special
                discounts and exclusive rewards.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" />

              <p className="text-sm text-gray-700 leading-relaxed">
                Yes, I want to subscribe to Foot Locker emails about new
                arrivals, sale campaigns and seasonal products.
              </p>
            </div>
          </div>


          <div className="mx-auto flex flex-col items-center gap-4 pt-4 w-full">
            <Button className="bg-black text-white w-full w-72 h-12 rounded-none text-sm 
            text-base font-maven cursor-pointer">
              {loading  ? <Spinner  className="w-6 h-6 text-gray-400" />   : " Join FLX Membership"}
             
            </Button>

            <p className="text-sm font-bold text-center">
              FLX Member?
              <Button
                type="button"
                onClick={() => dispatch(toggleModal())}
                className="underline font-medium cursor-pointer bg-transparent text-black shadow-none hover:bg-transparent"
              >
                
                Sign In  
              </Button>
            </p>

            <p className="text-sm text-gray-800 text-center">
              Foot Locker Inc. Family of Brands
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default React.memo(Register)