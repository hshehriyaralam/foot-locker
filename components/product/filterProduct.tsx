import { ChevronDown, Search } from 'lucide-react'
import React, { useState } from 'react'

const FilterProduct = () => {
  
const filterData = [
  {
    title: "Brands",
    options: [
      "Nike",
      "Adidas",
      "New Balance",
      "Puma",
    ],
  },

  {
    title: "Gender",
    options: ["Men", "Women", "Kids"],
  },

  {
    title: "Size",
    options: [
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10",
    ],
  },

  {
    title: "Color",
    options: [
      "Black",
      "White",
      "Grey",
      "Blue",
    ],
  },
    {
    title: "Size",
    options: [
      "Black",
      "White",
      "Grey",
      "Blue",
    ],
  },
    {
    title: "Price",
    options: [
      "Black",
      "White",
      "Grey",
      "Blue",
    ],
  },
]
const [dropDown,  setDropDown] = useState<string | null>('')
  const toggleDrown = (title: string) => {
    setDropDown((prev:any) => (prev === title ? null : title))
  }

  return (
         <div>
              {filterData.map((filter, index) => (
                <div
                  key={index}
                  className={`border border-gray-200  p-4   cursor-pointer   hover:bg-gray-100
                    ${dropDown === filter.title && 'bg-gray-100'}
                    `}
                >
                  <div
                onClick={() => toggleDrown(filter.title)}
                  className=" flex items-center justify-between">
                    <h3 className="text-[18px]  font-maven    w-full ">
                      {filter.title}
                    </h3>

                    <ChevronDown className={`h-7 w-7  text-gray-700  transition duration-300 font-normal  ${dropDown === filter.title && 'rotate-180'}`} />
                  </div>

                  {dropDown === filter.title && (
                  <div className="space-y-3  bg-gray-100    my-4">

                    <div  className='flex items-center gap-2    bg-white border  w-full p-3'>
                    <Search className="text-gray-800 w-5 h-5  " />
                    <input
                    className='outline-none'
                    type='text'
                    placeholder='Search'
                    />
                    </div>
                    {filter.options.map(
                      (item, idx) => (
                        <label
                          key={idx}
                          className="flex cursor-pointer items-center gap-4 text-gray-700"
                        >
                          <input
                            type="checkbox"
                            className="h-5  w-5 accent-black"
                          />
                          <p  className='text-md' >
                          {item}
                          </p>
                        </label>
                      )
                    )}
                  </div> 
                  )}
              
                </div>
              ))}
            </div> 
  )
}

export default   React.memo(FilterProduct) 
