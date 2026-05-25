 
"use client"
import Navbar from "@/components/layout/navbar";
import HeroBanner from "@/components/home/heroBanner";
import TopBanner from "@/components/home/topBanner";
import Footer from "@/components/layout/footer";
import { Provider } from 'react-redux'
import {store,persistor} from '@/store/store';

import { PersistGate } from "redux-persist/integration/react";

const LayoutProvider = ({children}:any) => {
  return (
   <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
          <TopBanner />
              <Navbar />
              <HeroBanner />
              {children}
              <Footer />
       </PersistGate>
    </Provider>
  )
}

export default LayoutProvider