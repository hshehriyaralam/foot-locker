import React from 'react'
import ProductLis from '../common/productLis'
import { seaonalRefresh } from '@/data/productData'

const SeasnolRefresh = () => {
  return (
    <div  className='w-full  p-4 mx-auto  px-4  py'>
        <ProductLis  
        data={seaonalRefresh}
        heading={'Seasonal Refresh'} />
    </div>
  )
}

export default  React.memo(SeasnolRefresh) 
