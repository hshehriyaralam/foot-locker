import React from "react"
import { Users , SquareArrowOutUpRightIcon} from "lucide-react"
import {fb, insta,tiktok,logo} from '@/images/homeImages'
import Image from "next/image"
import Link from "next/link"


const Footer = () => {
    const listStyling = 'hover:bg-gray-100/60  text-black cursor-pointer    max-w-50 px-2  py-0.5 flex   items-center gap-2'

    const legalInformation = [

        {
            id : 1,
            link : "Cookie Statement",
            externalLink : true,
        },
         {
            id : 2,
            link :  "Privacy Statement",
            externalLink : true,
        },
         {
            id : 3,
            link : "Terms & Conditions",
        },
         {
            id : 4,
            link :  "UK Gender Pay Ga",
            externalLink : true,
        },
         {
            id : 5,
            link : "Modern Slavery Report",
            externalLink : true,
        },
         {
            id : 6,
            link : "Tax Strategy",
            externalLink : true,
        },
         {
            id : 7,
            link : "Accessibility Statement",
            externalLink : true,
        },
          {
            id : 8,
            link :   "Your Rights",
            externalLink : true,
        },
          {
            id : 9,
            link : "Cookie Settings",
        },

           
            
           
         
            
            
          
            
    ]

    const about = [

        {
            id : 1,
            link : "About Foot Locker",
        },
         {
            id : 2,
            link :  "Get Inspired - Blog",
        },
         {
            id : 3,
            link : "Press Contacts",
        },
         {
            id : 4,
            link :  "Careers",
            externalLink : true,
        },
         {
            id : 5,
            link : "Product Sitemap",
        }]



        
    const shop = [

        {
            id : 1,
            link : "Exclusive Offers",
            externalLink : true,
        },
         {
            id : 2,
            link :  "Click & Collect",
        },
         {
            id : 3,
            link : "Store Locator",
            externalLink : true,
        },
         {
            id : 4,
            link :  "Digital Gift Cards",
        },
         {
            id : 5,
            link : "Gift Card Balance",
            externalLink : true,
        },
         {
            id : 6,
            link : "Mobile App",
        },

    
    ]
    
  return (
    <footer className="bg-white border-t border-gray-200 mt-20 font-maven">
      <div className="max-w-7xl mx-auto px-2 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="font-semibold text-sm mb-4 uppercase tracking-wide">
              Legal Information
            </h3>
            <ul className={`space-y-2 text-sm  `}>
              {legalInformation?.map((list)  => (
                   <li 
              key={list.id}
                className={`${listStyling}`}>
                    {list.link}
                               {list.externalLink && (<SquareArrowOutUpRightIcon  className="w-[13px] text-black " />)}

                    </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-4 uppercase tracking-wide">
              About
            </h3>
            <ul className="space-y-2 text-sm ">
            {about?.map((list)  => (
                  <li 
              key={list.id}
                className={`${listStyling}`}>
                    {list.link}
                                {list.externalLink && (<SquareArrowOutUpRightIcon  className="w-[13px] text-black " />)}

                    </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-4 uppercase tracking-wide">
              Shop
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
               {shop?.map((list)  => (
                   <li 
              key={list.id}
                className={`${listStyling}`}>
                    {list.link}
                {list.externalLink && (<SquareArrowOutUpRightIcon  className="w-[13px] text-black " />)}
                    </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6 ">
            <div className="flex gap-4 ">
                <div className="cursor-pointer  ">
                <Image 
             src={insta}
             alt="insta"
             />
                </div>
            
                <div className="cursor-pointer ">
                <Image 
             src={fb}
             alt="fb"
             />
                </div>
                <div className="cursor-pointer ">
                <Image 
             src={tiktok}
             alt="tiktok"
             />
                </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm mb-2 uppercase">
                Email Signup
              </h3>
              <p className="text-sm text-gray-900 mb-3">
                Get news, offers, and discounts.
              </p>

              <button className="w-full border border-black py-2 text-sm font-medium  transition   cursor-pointer  hover:shadow-[5px_5px_0px_0px_#9CA3AF]">
                SUBSCRIBE
              </button>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-2 uppercase">
                My Orders
              </h3>
              <p className="text-sm text-gray-900 mb-3">
                Sign in to see orders you placed.
              </p>
               <button className="w-full border border-black py-2 text-sm font-medium  transition   cursor-pointer  hover:shadow-[5px_5px_0px_0px_#9CA3AF]">
                SUBSCRIBE
              </button>
            </div> 

          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between gap-4">

            <Link
            href={'/'}
              className="cursor-pointer  hover:border-b-3   hover:border-black py-2 transition duration-300   ">
                <Image 
                src={logo}
                alt="logo"
                />
            </Link>
          <p  className="font-maven text-sm text-gray-500">© 2025 Footlocker.com, Inc. All Rights Reserved </p>
        </div>

      </div>
    </footer>
  )
}

export default React.memo(Footer)
