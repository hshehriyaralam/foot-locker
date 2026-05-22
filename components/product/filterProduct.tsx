"use client"

import { ChevronDown, Search } from "lucide-react"
import React, { useState } from "react"

const FilterProduct = (
  { filters ,
     selectedValues,
      setSelectedValues,
      setOpenFilter
     }: 
     { filters: any,
      selectedValues : any,
      setSelectedValues :any
      setOpenFilter : any
    
    }) => {
  const filterData = [
    {
      title: "Brands",
      options: filters.brands,
    },
    {
      title: "Gender",
      options: filters.genders,
    },
    // {
    //   title: "Size",
    //   options: filters.sizes,
    // },
    {
      title: "Color",
      options: filters.colors,
    },
    {
      title: "Price",
      options: filters.price,
    },
  ]

  const [dropDown, setDropDown] = useState<string | null>("")

  const toggleDrown = (title: string) => {
    setDropDown((prev) => (prev === title ? null : title))
  }

  const handleCheck = (value: string) => {
    setSelectedValues((prev:any) => {
      if (prev.includes(value)) {
        return prev.filter((item:any) => item !== value)
      }
      setOpenFilter(false)
      return [...prev, value]
    })
  }
  return (
    <div className="space-y-2">
      {filterData.map((filter, index) => (
        <div
          key={index}
          className={`border border-gray-200 p-4 transition duration-300
          ${dropDown === filter.title ? "bg-gray-100" : "bg-white"}
          `}
        >
          <div
            onClick={() => toggleDrown(filter.title)}
            className="flex cursor-pointer items-center justify-between"
          >
            <h3 className="w-full text-[18px] font-medium">
              {filter.title}
            </h3>

            <ChevronDown
              className={`h-6 w-6 text-gray-700 transition duration-300
              ${dropDown === filter.title ? "rotate-180" : ""}
              `}
            />
          </div>

          {dropDown === filter.title && (
            <div className="my-4 space-y-4">
              <div className="flex items-center gap-2 border bg-white p-3">
                <Search className="h-5 w-5 text-gray-800" />

                <input
                  className="w-full bg-transparent outline-none"
                  type="text"
                  placeholder="Search"
                />
              </div>

              {filter.options.map((item: any, idx: number) => (
                <label
                  key={idx}
                  className="flex cursor-pointer items-center gap-4 text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(item)}
                    onChange={() => handleCheck(item)}
                    className="h-5 w-5 accent-black"
                  />

                  <p className="text-md">{item}</p>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default React.memo(FilterProduct)