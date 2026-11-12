import { closeModal } from "@/store/modalSlice";
import { getSupabaseBrowserClient } from "../supabase/client";
import { fetchUserProfile } from "@/store/userSlice";  

export const handleLogin = async ({
  email, password, reset, router, toast, dispatch, setLoading,
}: any) => {
  const supabase = getSupabaseBrowserClient();
  try {
    setLoading(true);

    const { data, error: loginError } =
      await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (loginError?.message === "Invalid login credentials") {
      toast.error("Email Or Password wasn't correct!", { position: "top-center" });
      return;
    }
    if (loginError) {
      toast.error(loginError.message, { position: "top-center" });
      return;
    }

    
    await dispatch(fetchUserProfile());

    toast.success("Successfully Login", { position: "top-center" });
    router.replace("/");
    router.refresh();
    dispatch(closeModal());
    reset();
  } catch (error) {
    setLoading(false);
    if (error instanceof Error) console.log(error.message);
  }
};