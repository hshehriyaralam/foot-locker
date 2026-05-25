import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  let res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isCheckoutLogin = req.nextUrl.pathname.startsWith("/checkout/login");
  const isCheckout = req.nextUrl.pathname === "/checkout";


  if (!user && isCheckout) {
    const url = req.nextUrl.clone();
    url.pathname = "/checkout/login";
    return NextResponse.redirect(url);
  }

  if (user && isCheckoutLogin) {
    const url = req.nextUrl.clone();
    url.pathname = "/checkout";
    return NextResponse.redirect(url);
  }
  return res;
}


export const config = {
  matcher: ["/:path*", "/checkout/login", "/project:path*", "/checkout"],
};