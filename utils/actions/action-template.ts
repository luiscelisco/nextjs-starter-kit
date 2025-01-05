"use server";

import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function actionTemplate() {
  const { userId } = await auth();

  if (!userId) {
    return "You must be signed in";
  }

  const cookieStore = cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: { path: string; }) {
          try {
            cookieStore.set(name, value, options);
          } catch (error) {
            // Handle error in server component
          }
        },
        remove(name: string, options: { path: string; }) {
          try {
            cookieStore.set(name, "", { ...options, maxAge: 0 });
          } catch (error) {
            // Handle error in server component
          }
        }
      }
    }
  );

  // Your action logic here
  return "Action completed";
}
