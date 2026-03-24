import { NextResponse } from "next/server"
import { supabase } from "@/app/lib/supabase"

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {

  const { slug } = await context.params

  const { data } = await supabase
    .from("products")
    .select("affiliate_url")
    .eq("slug", slug)
    .single()

  if (!data?.affiliate_url) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.redirect(data.affiliate_url)
}