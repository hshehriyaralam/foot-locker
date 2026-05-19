'use client'
import React, { useEffect, useRef, useState } from 'react'
import ProductCard from './productCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ProductList = ({
  data,
  heading,
}: {
  data: any
  heading: string
}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null)

  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(true)
  const [progress, setProgress] = useState(0)
  const updateSlider = () => {
    if (!sliderRef.current) return
    const slider = sliderRef.current
    const maxScroll = slider.scrollWidth - slider.clientWidth
    const currentScroll = slider.scrollLeft
    setShowLeft(currentScroll > 5)
    setShowRight(currentScroll < maxScroll - 5)
    const percentage =
      maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0
    setProgress(percentage)
  }

  useEffect(() => {
    updateSlider()
    const slider = sliderRef.current
    if (!slider) return
    slider.addEventListener('scroll', updateSlider)
    window.addEventListener('resize', updateSlider)
    return () => {
      slider.removeEventListener('scroll', updateSlider)
      window.removeEventListener('resize', updateSlider)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return
    const slider = sliderRef.current
    const card =
      slider.querySelector<HTMLElement>('[data-product-card]')
    const cardWidth = card?.offsetWidth || 300
    slider.scrollBy({
      left: direction === 'left' ? -(cardWidth + 16) : cardWidth + 16,
      behavior: 'smooth',
    })
  }

  return (
    <div className='w-full  lg:p-8'>
      <div className='mb-5 flex items-center justify-between'>
        <h2 className='font-maven text-[20px] font-semibold text-black lg:text-[34px]'>
          {heading}
        </h2>
      </div>

      <div className='relative'>
        {showLeft && (
          <button
            onClick={() => scroll('left')}
            className='absolute left-3 top-[38%] z-20 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-sm border border-black bg-white text-black shadow-md transition    cursor-pointer lg:flex  hover:shadow-[-3px_3px_0px_0px_#000]'
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {showRight && (
          <button
            onClick={() => scroll('right')}
            className='absolute right-4 top-[38%] z-20 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-sm border border-black bg-white text-black shadow-md transition    cursor-pointer  lg:flex  hover:shadow-[4px_3px_0px_0px_#000]'
          >
            <ChevronRight size={20} />
          </button>
        )}

        <div
          ref={sliderRef}
          className='scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth'
        >
          {data?.slice(0, 10)?.map((item: any) => (
            <div
              key={item.id}
              data-product-card
              className='flex-shrink-0 snap-start'
            >
              <ProductCard data={item} />
            </div>
          ))}
        </div>
      </div>

      <div className='mt-8 flex justify-center'>
        <div className='relative h-[2px] w-[320px] overflow-hidden bg-gray-300 lg:w-[500px]'>
          <div
            className='absolute top-0 h-full bg-black transition-all duration-200'
            style={{
              width: '25%',
              left: `${progress * 0.75}%`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default React.memo(ProductList)