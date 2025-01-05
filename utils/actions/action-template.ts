"use server";

import { auth } from "@clerk/nextjs/server";
import { createBrowserClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function actionTemplate() {
  const { userId } = await auth();

  if (!userId) {
    return "You must be signed in";
  }

  const cookieStore = cookies();
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  // Your action logic here
  return "Action completed";
}
