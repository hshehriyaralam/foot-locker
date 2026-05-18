"use client"
import { logo } from '@/images/homeImages'
import { useModalStore } from '@/store/store'
import {  X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const LoginModal = () => {
      const toggleModal = useModalStore((state: any) => state.toggleModal);
      const router = useRouter()
      const navigateRegister =  () => {
        router.push('/register')
        toggleModal()}
  return (
    <section
      className="fixed inset-0 bg-black/40  flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white   w-[450px] shadow-xl animate-fadeIn"
      >
        <div  className='flex flex-col items-center justify-center gap-4 '>


            {/* Top */}
            <div  className='pb-2  w-full  border-b-2  border-gray-300 '>
                <div  className=' flex items-center justify-between px-4 py-3 '>
            <Image
            src={logo}
            alt='logo'
            className='w-40'
            />
            <div
            className='p-1  cursor-pointer'
            onClick={toggleModal}
            >
                <X  className='w-6 h-6  cursor-pointer' 
            />
            </div>
            </div>
            </div>


            {/* center  */}
            <div  className='px-4'>
                <h2  className='text-black font-maven text-2xl font-semibold  '>Sign in or join FLX Rewards(it’s free!) and get perks like</h2>
            </div>


            {/* Bottom */}
            <form  className=' bg-gray-50  w-full   py-10 p-4'>
                <input
                required
                className='w-full  bg-transparent  border border-gray-500   hover:bg-white  p-2.5'
                type='email'
                placeholder='Email Address*'
                />

                <div  className='w-full  flex flex-col gap-2 mt-6'>
                    <Button
                    type='submit'
                    className='bg-black text-white font-maven h-12
                    border  rounded-none p-2  cursor-pointer text-md '
                    >
                        Sign in 
                    </Button>
                    <Button
                    type='button'
                    onClick={navigateRegister}
                    className='bg-white  text-black   font-maven h-12 border border-gray-600  rounded-none p-2  cursor-pointer  text-md 
                    shadow-[5px_5px_0px_0px_#EC4899]  text-center  hover:shadow-[7px_7px_0px_0px_#EC4899] 
                    '
                    >
                        Join FLX
                    </Button>
                </div>
            </form>
        </div>
        
        </div>
        </section>
  )
}
 
export default   React.memo(LoginModal) 
