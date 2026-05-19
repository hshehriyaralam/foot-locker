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
import Footer from './footer'

const Outlet = () => {
  return (
    <div>
      <HeroCarousal />
      <SeasonalRefresh />
      {/* <Overview /> */}
      <SaleBanner />
      <NewAt  />
      <Banner />
    </div>
  )
}

export default  React.memo(Outlet) 
