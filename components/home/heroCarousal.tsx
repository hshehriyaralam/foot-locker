"use client"
import React, { useEffect, useState } from 'react'
import { sliderData } from '@/data/heroData'
import {ArrowRight, ChevronLeft, ChevronRight,Pause,Play,} from 'lucide-react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import Image from 'next/image'
import ShopNowBtn from '../common/button'

const HeroCarousal = () => {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [play, setPlay] = useState(true)

const nextSlide = () => {
  const isLastSlide = current === sliderData.length - 1
  setDirection(isLastSlide ? -1 : 1)
  setCurrent((prev) =>  isLastSlide ? 0 : prev + 1)}

const prevSlide = () => {
  const isFirstSlide = current === 0
  setDirection(isFirstSlide ? 1 : -1)

  setCurrent((prev) =>  isFirstSlide ? sliderData.length - 1 : prev - 1)
}

  const togglePause = () => {  setPlay((prev) => !prev)}

  useEffect(() => {
    if (!play) return
    const slider = setInterval(() => {
      nextSlide()
    }, 4000)

    return () => clearInterval(slider)
  }, [play, current])

 const slideVariants: Variants = {
  hidden: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
  }),

  visible: {
    x: '0%',
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

  return (
    <div className='mx-auto w-full overflow-hidden'>
      <div className='relative flex max-w-full'>
        <div className='relative mx-auto flex-1 overflow-hidden'>
          <AnimatePresence
              initial={false}
              custom={direction}
              mode='sync'
            >
            <motion.div
              key={sliderData[current].id}
              variants={slideVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              custom={direction}
              className='absolute left-0 top-0 w-full'
            >
              <Image
                alt='hero-image'
                src={sliderData[current].image}
                width={1600}
                height={900}
                priority
                className='hidden w-full object-cover lg:block'
              />

              <Image
                alt='hero-mobile-image'
                src={sliderData[current].mobileImage}
                width={700}
                height={900}
                priority
                className='block w-full object-cover lg:hidden'
              />

              <div className='absolute bottom-28 left-1/2 flex -translate-x-1/2 flex-col items-center justify-center gap-4 text-white lg:bottom-40 lg:left-10 lg:translate-x-0 lg:items-start'>
                {sliderData[current].heading && (
                  <p className='max-w-[400px] text-center font-mono text-[30px] font-extrabold leading-[1] lg:text-left lg:text-[55px]'>
                    {sliderData[current].heading}
                  </p>
                )}

                {sliderData[current].description && (
                  <p className='max-w-[340px] text-center font-mono text-[14px] font-medium lg:max-w-[400px] lg:text-left'>
                    {sliderData[current].description}
                  </p>
                )}
                <ShopNowBtn />
              </div>

              <div className='absolute bottom-10 right-5 z-50 flex items-center gap-3 lg:bottom-12 lg:right-10'>
                <button
                  onClick={togglePause}
                  className='flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition hover:bg-white/10  cursor-pointer'
                >
                  {play ? (
                    <Pause className='h-5 w-5 text-white' />
                  ) : (
                    <Play className='h-5 w-5 text-white' />
                  )}
                </button>

                <button
                  onClick={prevSlide}
                  className='hidden h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition hover:bg-white/10 lg:flex  cursor-pointer'
                >
                  <ChevronLeft className='h-6 w-6 text-white' />
                </button>

                <button
                  onClick={nextSlide}
                  className='hidden h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition hover:bg-white/10 lg:flex cursor-pointer
                  
                  '
                >
                  <ChevronRight className='h-6 w-6 text-white' />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className='invisible'>
            <Image
              alt='placeholder'
              src={sliderData[current].image}
              width={1600}
              height={900}
              className='hidden w-full lg:block'
            />

            <Image
              alt='placeholder-mobile'
              src={sliderData[current].mobileImage}
              width={700}
              height={900}
              className='block w-full lg:hidden'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(HeroCarousal)