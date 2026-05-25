
import { getSupabaseBrowserClient } from "../supabase/client";


export const handleSignUp = async ({
 firstName, name, lastName,  email, password, postalCode, phoneNumber, reset,setLoading,toast
}: any) => {
  const supabase = getSupabaseBrowserClient();

  try {
    if (password.length < 6) {
    return { error: 'Password must be at least 6 characters long' }
    }
      setLoading(true)
    const { data: user, error: signUpError } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
        },
      },
    });
    if (signUpError) {
      console.log(signUpError.message)
    toast.error(signUpError.message, {position : 'top-center'})
      return
    }


    const userId = user?.user?.id;
    if (!userId){
      console.log("user id not found", userId)
      return
    }
    await supabase.from("profile").insert([
      {
        id : userId,
        email: email,
        first_name : firstName,
        last_name : lastName,
        phone_number : phoneNumber,
        postal_code : postalCode,
      },
    ] as any);
    toast.success("Successfully SingUp", {position : 'top-center'})
    reset();
    setLoading(false)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("catch Error", error.message);
    }
  }
};