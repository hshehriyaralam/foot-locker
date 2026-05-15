import React from 'react'
import TopBanner from '../home/topBanner'
import Navbar from './navbar'
import HeroBanner from '../home/heroBanner'
import HeroCarousal from '../home/heroCarousal'
import SeasonalRefresh from '../home/seasonalRefresh'

const Outlet = () => {
  return (
    <div>
      <TopBanner  />
      <Navbar />
      <HeroBanner />
      <HeroCarousal />
      <SeasonalRefresh />
    </div>
  )
}

export default  React.memo(Outlet) 
