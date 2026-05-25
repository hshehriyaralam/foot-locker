"use client"
import Loader from '@/components/common/loader';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { SignOut } from '@/lib/helper/signOutHandler';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Order = () => {
      const [loading, setLoading] = useState(false);
      const router = useRouter();
    
      const handleSignOut = async () => {
    await SignOut({ setLoading, router });
  };
  return (
    <div  className=' flex items-center justify-center w-full min-h-screen'>
          <Button
                type="button"
                onClick={handleSignOut}
                 className="bg-black text-white font-maven h-12 w-100
                    border  rounded-none p-2  cursor-pointer text-md "
              >
{loading ? (
                  <Spinner className="text-gray-300 w-6 h-6 " />
                ) : (
                  "Log Out  "
                )}
              </Button>


    </div>
  )
}

export default  Order
