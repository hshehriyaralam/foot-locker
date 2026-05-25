"use client"

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import {  useState } from "react";

  

export const GetUser = () => {    
    const supabase = getSupabaseBrowserClient();
    const [user, setuser ] = useState<any>()

    
  const fetchUser =  async  () => {
 const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id
  if(!userId) return
   const { data, error } = await supabase
      .from('profile')
      .select('*')
      .eq('id', userId)
      .single(); 
      setuser(data)
  }



    return {fetchUser,user}
}