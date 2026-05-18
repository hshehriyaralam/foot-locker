import { CatProduct1 } from '@/images/homeImages'
import Image from 'next/image'

const myCart = () => {
  return (
    <section className='w-full  h-[300px]  flex items-center'>


        <div  className='w-[20%] h-[300px]  bg-gray-100  flex items-center justify-center '>
            <Image 
            alt='card-image'
            src={CatProduct1}
            />
        </div>


        <div  className='w-[80%] h-[300px] p-3 '>
            <div>
                <h2>ONLY AT FOOT LOCKER</h2>


                <p>Nike Air Max Tuned 1</p>

                <p><span>£174.99VAT</span> included</p>
                <p>Black-Laser Orange-Mtlc Rose G</p>
                <p>Men Shoes 6.5</p>


            </div>
        </div>
    </section>
  )
}

export default myCart
