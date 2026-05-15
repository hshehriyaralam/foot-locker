import React from 'react'
import ProductLis from '../common/productLis'
import { seaonalRefresh } from '@/data/productData'

const SeasnolRefresh = () => {
  return (
    <section className='w-full px-4 py-8 lg:px-10  mx-auto  '>
      <ProductLis
        data={seaonalRefresh}
        heading='Seasonal Refresh'
      />
    </section>
  )
}

export default React.memo(SeasnolRefresh)