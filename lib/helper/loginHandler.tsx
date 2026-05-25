
import { closeModal } from "@/store/modalSlice";
import { getSupabaseBrowserClient } from "../supabase/client";

export const handleLogin = async ({
  email,
  password,
  reset,
   router,
   toast,
   dispatch,
   setLoading
}: any) => {
  const supabase = getSupabaseBrowserClient();
  try {
    setLoading(true)
    const { data: user, error: loginError } = await  supabase.auth.signInWithPassword({
       email : email,
        password : password,
      })

      if(loginError?.message === "Invalid login credentials"){
        toast.error("Email Or Password wasn't correct!", {position  : "top-center"})
        return
      }

    if (loginError) {
       console.log("error", loginError.message)
       throw new Error
    }
    
    setLoading(false)
    toast.success("Successfully Login", {position  : "top-center"})
    router.replace('/')
    router.refresh()
    dispatch(closeModal())
    reset();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("catch Error", error?.message);
    }
  }
};