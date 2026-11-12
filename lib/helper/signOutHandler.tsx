"use client"
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { clearUser } from "@/store/userSlice";   
import { toast } from "sonner";

export const SignOut = async ({setLoading,router}:any) => {
    try {
      setLoading(true);
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log("signOut", error);
        setLoading(false);
        return;
      }
      router.replace("/");
      setLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };




export const signOutHeader = async (dispatch?: any, router?: any) => {
  try {
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("Error SignOut From Header", error);
      toast.error("Failed to logout. Please try again.");
      return;
    }
    dispatch?.(clearUser());

    toast.success("Logged out successfully");
    if (router) {
      router.push("/");
      router.refresh();
    }
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
  }
};