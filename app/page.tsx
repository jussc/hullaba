import { supabase } from "./lib/supabase"
import HomeClient from "./HomeClient"

export const metadata = {
  title: "Best Products According to Reddit (2026)",
  description:
    "Discover the best products based on real Reddit discussions. We analyze thousands of conversations to find top-rated picks.",
}

export default async function Page() {
  const { data } = await supabase
    .from("categories")
    .select("*")
    .order("name")

  return <HomeClient categories={data || []} />
}