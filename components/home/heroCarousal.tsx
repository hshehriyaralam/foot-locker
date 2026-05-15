"use client"
import React, { useEffect, useState } from 'react'
import { sliderData } from '@/data/heroData'
import {  ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { AnimatePresence, motion } from "framer-motion";
import Image from 'next/image'


const HeroCarousal = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const [play , setPlay] = useState(true)
  
    const stopSlide = () => {
      setDirection(0)
      setPlay( prev => !prev)
    }


    // next 
    const nextSlide = () => {
      setDirection(1);
  
      setCurrent((prev) =>
        prev === sliderData.length - 1 ? 0 : prev + 1
      );
    };
  
    // previous 
    const prevSlide = () => {
      setDirection(-1);
      setCurrent((prev) =>
        prev === 0 ? sliderData.length - 1 : prev - 1
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
        opacity: 1,
      }),
  
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.3,
        },
      },
  
      exit: (direction: number) => ({
        x: direction > 0 ? -100 : 100,
        opacity: 1,
        transition: {
          duration: 0.3,
        },
      }),
    };
  return (
    <div  className='w-full overflow-hidden   mx-auto '>
      <div  className='max-w-full   flex  '>
            <div
            className="relative flex-1 overflow-hidden  mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={sliderData[current].id}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={direction}
              className="w-full  relative"
            >

              <Image
              alt='.....'
              src={sliderData[current].image}
              className='hidden lg:block mx-auto  relative'
              />


               <Image
              alt='.....'
              src={sliderData[current].mobileImage}
              className='lg:hidden block mx-auto  relative'
              />


              <div
              className='absolute lg:bottom-45  left-10  bottom-30     text-white  flex flex-col 
               lg:items-start  lg:justify-start    items-center   justify-center  gap-4'
              >
              { sliderData[current].heading && (
                <p className="text-[30px]  lg:text-[50px]   font-extrabold  leading-[1] transition-all duration-300  max-w-[400px]  font-mono">
                {sliderData[current].heading}
              </p>
              )
              }

              {sliderData[current].description  && (
                <p className='text-[14px] font-mono font-medium  lg:text-left text-center
                   transition-all duration-300  lg:max-w-[400px] max-w-[350px] ' >{sliderData[current].description}</p>
              )}

              <button
              className='bg-gray-200/90 hover:bg-black    text-black hover:text-white  
               uppercase text-[14px]   transition duration-300   cursor-pointer font-medium  font-mono
               lg:w-26   w-30  flex  items-center  justify-center gap-2  group relative'>
                SHOP NOW 
                <ArrowRight  className='text-black group-hover:text-white w-5  ' />
              </button>
              </div>


              {/* actions buttons */}
              <div  className='relative lg:bottom-15 bottom-12  lg:right-10   right-14 flex items-center justify-end  gap-3  z-50 '>
                <div
                onClick={stopSlide}
                className='hover:bg-[#fff]/20  bg-[#fff]/10 backdrop-blur-md  w-8 h-8 rounded-full 
                 flex items-center  justify-center  cursor-pointer   '
                >
                 {play ? (<Pause  className='text-white   w-4 h-4' />)  :
                  (<Play  className='text-white w-5 h-5' />)} 
                </div>
                 <div
                 onClick={prevSlide}
                className='hidden  lg:flex hover:bg-[#fff]/20   bg-[#fff]/10 backdrop-blur-md w-8 h-8 rounded-full 
                 items-center  justify-center  cursor-pointer '
                >
                  <ChevronLeft  className='text-white w-5 h-5' />
                </div>
                 <div
                 onClick={nextSlide}
                className='hidden lg:flex hover:bg-[#fff]/20 bg-[#fff]/10 backdrop-blur-md  w-8 h-8 rounded-full 
                  items-center  justify-center  cursor-pointer '
                >
                  <ChevronRight  className='text-white w-5 h-5' />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </div>
  )
}

export default   React.memo(HeroCarousal) 
