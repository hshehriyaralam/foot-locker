"use client"

import React, { useState } from "react"
import {
  ChevronDown,
  ChevronUp,
  SquareArrowOutUpRightIcon,
} from "lucide-react"

import { fb, insta, tiktok, logo } from "@/images/Images"

import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(
    ""
  )

  const listStyling =
    "group flex items-center gap-x-1 rounded-md px-3 py-2 text-[16px] text-black hover:bg-gray-100 transition-all duration-200 cursor-pointer"

  const sectionTitle ="font-bold text-xl uppercase tracking-wider   font-maven"

  const footerSections = [
    {
      id: "legal",
      title: "Legal Information",
      links: [
        {
          id: 1,
          link: "Cookie Statement",
          externalLink: true,
        },
        {
          id: 2,
          link: "Privacy Statement",
          externalLink: true,
        },
        {
          id: 3,
          link: "Terms & Conditions",
        },
        {
          id: 4,
          link: "UK Gender Pay Gap",
          externalLink: true,
        },
        {
          id: 5,
          link: "Modern Slavery Report",
          externalLink: true,
        },
        {
          id: 6,
          link: "Tax Strategy",
          externalLink: true,
        },
        {
          id: 7,
          link: "Accessibility Statement",
          externalLink: true,
        },
        {
          id: 8,
          link: "Your Rights",
          externalLink: true,
        },
        {
          id: 9,
          link: "Cookie Settings",
        },
      ],
    },

    {
      id: "about",
      title: "About",
      links: [
        {
          id: 1,
          link: "About Foot Locker",
        },
        {
          id: 2,
          link: "Get Inspired - Blog",
        },
        {
          id: 3,
          link: "Press Contacts",
        },
        {
          id: 4,
          link: "Careers",
          externalLink: true,
        },
        {
          id: 5,
          link: "Product Sitemap",
        },
      ],
    },

    {
      id: "shop",
      title: "Shop",
      links: [
        {
          id: 1,
          link: "Exclusive Offers",
          externalLink: true,
        },
        {
          id: 2,
          link: "Click & Collect",
        },
        {
          id: 3,
          link: "Store Locator",
          externalLink: true,
        },
        {
          id: 4,
          link: "Digital Gift Cards",
        },
        {
          id: 5,
          link: "Gift Card Balance",
          externalLink: true,
        },
        {
          id: 6,
          link: "Mobile App",
        },
      ],
    },
  ]

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id))
  }

  return (
    <footer className="mt-20 border-t border-gray-200 bg-white font-maven">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {footerSections.map((section) => (
                <div
                  key={section.id}
                  className="border-b border-gray-200 pb-3 md:border-none"
                >
                 
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="flex w-full items-center justify-between py-2
                     text-left md:cursor-default"
                  >
                    <h3 className={sectionTitle}>
                      {section.title}
                    </h3>
                    <div className="md:hidden">
                      {openSection === section.id ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </button>

                  <ul
                    className={`
                      overflow-hidden transition-all duration-300
                      ${
                        openSection === section.id ? "max-h-[500px] opacity-100"  : "max-h-0 opacity-0 md:max-h-[500px] md:opacity-100"
                      }
                    `}
                  >
                    <div className="mt-3 space-y-2">
                      {section.links.map((list) => (
                        <li
                          key={list.id}
                          className={listStyling}
                        >
                          <span>{list.link}</span>

                          {list.externalLink && (
                            <SquareArrowOutUpRightIcon className="h-3.5 w-3.5 opacity-70 transition group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
                          )}
                        </li>
                      ))}
                    </div>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-4">
                {[insta, fb, tiktok].map((icon, index) => (
                  <div
                    key={index}
                    className="cursor-pointer hover:scale-105 hover:shadow-md"
                  >
                    <Image
                      src={icon}
                      alt="social-icon"
                    />
                  </div>
                ))}
              </div>
            </div>

  
            <div className="">
              <h3 className="mb-2 text-lg font-bold uppercase">
                Email Signup
              </h3>

              <p className="mb-4 text-[15px] text-gray-600">
                Get news, offers, and discounts.
              </p>

              <button className="w-full border border-black py-3 text-md font-semibold transition-all duration-300  cursor-pointer  hover:shadow-[5px_5px_0px_0px_#9CA3AF]">
                SUBSCRIBE
              </button>
            </div>


            <div className="">
              <h3 className="mb-2 text-lg font-bold uppercase">
                My Orders
              </h3>

              <p className="mb-4 text-[15px] text-gray-600">
                Sign in to see orders you placed.
              </p>

              <button className="w-full border border-black py-3 text-md font-semibold transition-all duration-300 cursor-pointer hover:shadow-[5px_5px_0px_0px_#9CA3AF]">
                SIGN IN
              </button>
            </div>
          </div>
        </div>

        
        <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-gray-200 pt-6 md:flex-row">
          <Link
            href="/"
            className="transition duration-300 hover:opacity-80"
          >
            <Image
              src={logo}
              alt="logo"
              className="object-contain"
            />
          </Link>

          <p className="text-center text-sm text-gray-500">
            © 2025 Footlocker.com, Inc. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

export default React.memo(Footer)