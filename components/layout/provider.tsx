"use client"
import React from 'react'
import Navbar from "@/components/layout/navbar";
import HeroBanner from "@/components/home/heroBanner";
import TopBanner from "@/components/home/topBanner";
import Footer from "@/components/layout/footer";
import { Provider } from 'react-redux'
import {store} from '@/store/store';

const LayoutProvider = ({children}:any) => {
  return (
   <Provider store={store}>
          <TopBanner />
              <Navbar />
              <HeroBanner />
              {children}
              <Footer />

    </Provider>
  )
}

export default LayoutProvider
