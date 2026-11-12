"use client";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { fetchUserProfile, clearUser } from "@/store/userSlice"; 
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useEffect } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserProfile());

    const supabase = getSupabaseBrowserClient();
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        dispatch(fetchUserProfile());
      }
      if (event === "SIGNED_OUT") {
        dispatch(clearUser());   // 👈 Redux clear
      }
    });

    return () => sub.subscription.unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
}