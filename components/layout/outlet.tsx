import React from 'react'
import TopBanner from '../home/topBanner'
import Navbar from './navbar'
import HeroBanner from '../home/heroBanner'

const Outlet = () => {
  return (
    <div>
      <TopBanner  />
      <Navbar />
      <HeroBanner />
    </div>
  )
}

export default  React.memo(Outlet) 
