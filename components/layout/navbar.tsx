import { Search ,CircleUser,  Handbag} from 'lucide-react'

import Image from 'next/image'
import React from 'react'
import logo from "@/public/foot-locker-logo.svg"
import Link from 'next/link'

const Navbar = () => {

  const navLinks = [
    {
      id  : 1,
      text : "Men",
      link : "/men"
    },{
      id  : 2,
      text : "Women",
      link : "/women"
    },
    {
      id  : 3,
      text : "Kids",
      link : "/kids"
    },
    {
      id  : 4,
      text : "New In",
      link : "/newIn"
    },
    {
      id  : 5,
      text : "Sale",
      link : "/sale"
    },
  ]
  return (
    <div  className='w-full  p-4  flex flex-col gap-2  px-4 '>
      
        {/*  first line */}
      <div  className='flex items-center  justify-between px-1'>

        <div  className='flex items-center justify-center gap-8'>
        <Image
        src={logo}
        width={220}
        height={220}
        alt='logo'
        />

       
     </div>

      <div  className='flex items-center  border  border-gray-400  p-2  rounded  w-[550px] py-2.5    justify-between px-4'>
            <input
            className='outline-none border-none '
            placeholder='Search'
            type="text" />
            <Search  className='w-5 h-5   text-gray-500' />
        </div>




      <div  className='flex items-center gap-1  px-2 '> 
        {/* SignUp */}
        <div  className='  px-4  flex items-center gap-2 '>
        <CircleUser   className='w-6 h-6  text-gray-700' />
        <p  className='text-[15px] font-medium'>Sign In | Join FLX</p>
        </div>


        {/* card     */}
        <div  className='flex relative '>
        <Handbag   className='W-5 h-5 cursor-pointer '   />
      </div>
      </div>
    
      </div>








 {/* 2nd line */}
<div  className='flex items-center justify-center gap-4 p-2'>
  {
    navLinks.map((links) => (
      <ul
      className='flex items-center gap-4'
      key={links.id}>
        <Link 
        className='relative group'
        href={`${links.link}`} >
        <li  className='font-semibold text-lg '>
          {links.text}
        </li>
        <div  className='hidden   group-hover:block border-b-2  hover:border-b-3 border-black transition duration-500' />
        </Link>
      </ul>
    ))
  }
</div>



     



    </div>
  )
}

export default  React.memo(Navbar) 
