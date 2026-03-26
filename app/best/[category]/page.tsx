import { supabase } from "../../lib/supabase"
import CategoryPageClient from "./CategoryPageClient"

// export async function generateMetadata({ params }: any) {
//   const category = params?.category || ""

//   const name = category.replace("-", " ")

//   return {
//     title: `Best ${name} According to Reddit (2026)`,
//     description: `Discover the best ${name} based on real user recommendations and Reddit discussions.`,
//   }
// }

export async function generateMetadata(props: any) {
  const params = await props.params
  const category = params?.category || ""

  const name = category.replace(/-/g, " ")

  return {
    title: `Best ${name} According to Reddit (2026)`,
    description: `Discover the best ${name} based on real user recommendations.`,
  }
}

// export default async function Page({ params }: { params: { category: string } }) {
//   const category = params?.category
export default async function Page(props: any) {
  const params = await props.params
  const category = params?.category

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .eq("is_visible", true)
    .order("rank", { ascending: true })

  const { data: mentions } = await supabase
    .from("reddit_mentions")
    .select("*")

  const { data: categoryInfo } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", category)
    .single()

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name")

    console.log("CATEGORY:", category)
    console.log("PRODUCTS:", products)

  return (
    <CategoryPageClient
      products={products || []}
      mentions={mentions || []}
      categoryInfo={categoryInfo}
      categories={categories || []}
      category={category}
    />
  )
}