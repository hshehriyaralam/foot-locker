"use client"
import { CircleUser, Handbag, Menu, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { logo } from "@/images/Images";
import LoginModal from "../common/loginModal";
import { useSelector, useDispatch } from 'react-redux';
import {  toggleModal} from '@/store/modalSlice';




const Navbar = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state:any) => state.modal);
    const {  totalQuantity  } = useSelector((state:any) => state.cart)
  

  const [mobileMenu, setMobileMenu] = useState(false);

  const navLinks = [
    {
      id: 1,
      text: "Men",
      link: "/men",
      categories: [
        {
          title: "Shoes",
          items: ["Nike", "Adidas", "Jordan", "Puma"],
        },
        {
          title: "Clothing",
          items: ["Hoodies", "T-Shirts", "Shorts"],
        },
      ],
    },

    {
      id: 2,
      text: "Women",
      link: "/women",
      categories: [
        {
          title: "Trending",
          items: ["Sneakers", "Running", "Lifestyle"],
        },
      ],
    },

    {
      id: 3,
      text: "Kids",
      link: "/kids",
      categories: [
        {
          title: "Popular",
          items: ["School Shoes", "Sports", "Slides"],
        },
      ],
    },
    {
      id: 4,
      text: "NewIn",
      link: "/newIn",
    },
    {
      id: 5,
      text: "Sale",
      link: "/sale",
    },
  ];



  return (
    <nav className="w-full border-b  font-maven">
      <div className="flex items-center justify-between lg:px-8  px-4 py-4 font-maven">
        {/* Left */}
        <div className="flex items-center lg:gap-4  gap-2">
          <Button
            onClick={() => setMobileMenu(true)}
            className="lg:hidden   bg-transparent "
          >
            <Menu className="text-black   w-8 h-8" />
          </Button>
          <Link className="hidden lg:block" href={"/"}>
            <Image
              src={logo}
              alt="logo"
              width={170}
              height={170}
              className="object-contain"
            />
          </Link>
        </div>

        <Link className="lg:hidden block" href={"/"}>
          <Image
            src={logo}
            alt="logo"
            width={170}
            height={170}
            className="object-contain"
          />
        </Link>

        <div className="hidden lg:flex items-center border rounded px-4 py-2 w-[400px] lg:w-[550px]">
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none"
          />

          <Search className="w-5 h-5 text-gray-500" />
        </div>

        <div className="flex items-center lg:gap-6">
          <div
            onClick={() => dispatch(toggleModal())}
            className="flex items-center gap-2 cursor-pointer  hover:bg-gray-100  py-0.5   px-4 "
          >
            <CircleUser className="w-6 h-6" />
            <p className="hidden lg:block  text-sm font-medium   ">
              Sign In | Join FLX
            </p>
          </div>

          <Link href={"/cart"} className="relative cursor-pointer">
            <Handbag className="w-6 h-6" />

            <span
              className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full
           w-4 h-4 flex items-center justify-center  text-[10px]"
            >
              {totalQuantity} 
              {/* 1 */}
            </span>
          </Link>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center gap-10 mb-2 relative">
        {navLinks.map((link) => (
          <div key={link.id} className="group">
            <Link
              href={link.link}
              className="font-semibold text-[#0E1111]  text-md relative   font-maven"
            >
              {link.text}
              <div className="h-[2px] text-[#0E1111] scale-x-0 group-hover:scale-x-100 transition duration-300 origin-left  " />
            </Link>

            {/* drop down div */}

            {link.categories && (
              <div
                className={`absolute left-0 top-full w-full bg-white shadow-lg opacity-0 invisible group-hover:opacity-100  group-hover:visible transition-all duration-300 z-50`}
              >
                <div className="max-w-7xl mx-auto grid grid-cols-4 gap-10 p-10">
                  {link.categories?.map((category, index) => (
                    <div key={index}>
                      <h3 className="font-bold mb-4">{category.title}</h3>
                      <div className="flex flex-col gap-3">
                        {category.items.map((item, i) => (
                          <Link
                            key={i}
                            href="/"
                            className="text-gray-600 hover:text-black"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* mobile side bar */}
      <div
        className={`fixed top-0 left-0 h-screen w-[300px] bg-white z-[999] transition-all duration-300
           ${mobileMenu ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-xl">Menu</h2>

          <Button
            className="bg-transparent  "
            onClick={() => setMobileMenu(false)}
          >
            <X className="text-black  w-5 h-5 " />
          </Button>
        </div>

        <div className="flex flex-col p-4 gap-6">
          {navLinks.map((link) => (
            <div key={link.id}>
              <Link href={link.link} className="font-semibold text-lg">
                {link.text}
              </Link>

              <div className="ml-3 mt-3 flex flex-col gap-2">
                {link.categories?.map((category, i) => (
                  <div key={i}>
                    <h4 className="font-medium">{category.title}</h4>

                    {category.items.map((item, idx) => (
                      <p key={idx} className="text-sm text-gray-500 py-1">
                        {item}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>




     {/* Login Modal */}
      {isOpen &&  <LoginModal />}
    </nav>
  );
};

export default React.memo(Navbar);
