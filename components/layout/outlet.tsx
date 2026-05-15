import React from 'react'
import TopBanner from '../home/topBanner'
import Navbar from './navbar'
import HeroBanner from '../home/heroBanner'
import HeroCarousal from '../home/heroCarousal'
import SeasonalRefresh from '../home/seasonalRefresh'
import Overview from '../home/overview'
import NewAt from '../home/newAt'
import SaleBanner from '../home/saleBanner'
import Banner from '../home/banner'

const Outlet = () => {
  return (
    <div>
      <TopBanner  />
      <Navbar />
      <HeroBanner />
      <HeroCarousal />
      <SeasonalRefresh />
      <Overview />
      <NewAt  />
      <SaleBanner />
      <Banner />
    </div>
  )
}

export default  React.memo(Outlet) 
