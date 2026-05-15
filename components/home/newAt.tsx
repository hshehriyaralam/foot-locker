import React from 'react'
import ProductLis from '../common/productLis'
import { newAt } from '@/data/productData'

const NewAt = () => {
  return (
      <section className='w-full px-4 py-8 lg:px-10  mx-auto  '>
          <ProductLis
            data={newAt}
            heading='New at Foot Locker'
          />
        </section>
  )
}

export default   React.memo(NewAt) 
