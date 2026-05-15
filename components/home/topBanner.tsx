 "use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";

const TopBanner = () => {

  const bannerData = [
    {
      id: 1,
      text: "Festival fits in ASICS, Nike, adidas & more",
      link: "SHOP NOW >",
    },
    {
      id: 2,
      text: "Get the perfect Gift",
      link: "Shop Gift Cards >",
    },
    {
      id: 3,
      text: "Students, Youth & Key Workers get 10% off",
      link: "Login >",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  // next 
  const nextSlide = () => {
    setDirection(1);

    setCurrent((prev) =>
      prev === bannerData.length - 1 ? 0 : prev + 1
    );
  };

  // previous 
  const prevSlide = () => {
    setDirection(-1);

    setCurrent((prev) =>
      prev === 0 ? bannerData.length - 1 : prev - 1
    );
  };

  //  autoo   
  useEffect(() => {
    const slider = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(slider);
  }, []);

  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),

    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },

    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="w-full bg-black text-white overflow-hidden font-maven">

      <div className="flex items-center justify-between px-4 md:px-8 py-3">

        <Button
          onClick={prevSlide}
          className="cursor-pointer  bg-transparent"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={bannerData[current].id}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={direction}
              className="flex  flex-col  lg:flex-row  items-center justify-center lg:gap-2 text-center px-4"
            >

              <p className="lg:text-[14px]  text-[13px] font-semibold">
                {bannerData[current].text}
              </p>

              <Link href={'/'} className="underline lg:text-[14px] text-[13px] font-semibold whitespace-nowrap   bg-transparent">
                {bannerData[current].link}
              </Link>
            </motion.div>
          </AnimatePresence>

        </div>

        <Button
          onClick={nextSlide}
          className="cursor-pointer  bg-transparent"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

      </div>
    </div>
  );
};

export default React.memo(TopBanner);