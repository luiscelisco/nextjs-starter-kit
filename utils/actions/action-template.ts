"use server";

import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { CookieOptions } from "@supabase/ssr";

export async function actionTemplate() {
  const { userId } = await auth();

  if (!userId) {
    return "You must be signed in";
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(key: string) {
          return cookieStore.get(key)?.value;
        },
        set(key: string, value: string, options: CookieOptions) {
          cookieStore.set(key, value, options);
        },
        remove(key: string, options: CookieOptions) {
          cookieStore.set(key, "", { ...options, maxAge: 0 });
        }
      }
    }
  );

  // Your action logic here
  return "Action completed";
}
