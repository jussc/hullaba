"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import CategoryNav from "../../components/CategoryNav"
import Header from "../../components/Header"
import ProductCard from "../../components/ProductCard"
import TopPick from "../../components/TopPick"
import Container from "../../components/Container"
import Footer from "@/app/components/Footer"

export default function Page() {

  const params = useParams()
  const category = params?.category as string

  const [products, setProducts] = useState<any[]>([])
  const [mentions, setMentions] = useState<any[]>([])
  const [categoryInfo, setCategoryInfo] = useState<any>(null)
  const [categories, setCategories] = useState<any[]>([])
  const topProduct = products.find((p) => p.rank === 1)

  useEffect(() => {

    async function loadProducts() {

      const { data: productsData } = await supabase
        .from("products")
        .select("*")
        .eq("category", category)
        .eq("is_visible", true)
        .order("rank", { ascending: true })

      const { data: mentionsData } = await supabase
        .from("reddit_mentions")
        .select("*")

      const { data: categoryData } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", category)
        .single()

      const { data: categoriesData } = await supabase
        .from("categories")
        .select("*")
        .order("name")

      setProducts(productsData || [])
      setMentions(mentionsData || [])
      setCategoryInfo(categoryData)
      setCategories(categoriesData || [])

    }

    if (category) {
      loadProducts()
    }

  }, [category])

  return (
    <div>
      <Container style={{ padding: 40 }}>
        {/*<h1>Best {category} According to Reddit</h1>*/}
      {/*<CategoryNav categories={categories} />*/}
      <Header categories={categories} />
      <h1>
        Best {categoryInfo?.name || category} According to Reddit
      </h1>

      {categoryInfo?.intro && (
        <p style={{ marginBottom: 30 }}>
          {categoryInfo.intro}
        </p>
      )}

      <TopPick product={topProduct} />

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            mentions={mentions}
          />
        ))}
      </div>
  {/*{products.map((product) => {

    const productMentions = mentions.filter(
      (m) => m.product_id === product.id
    )

    return (
      <div
        key={product.id}
        style={{
          border: "1px solid #ddd",
          padding: 20,
          marginBottom: 20,
          borderRadius: 8
        }}
      >

        <a
          href={product.affiliate_url}
          target="_blank"
          style={{ textDecoration: "none", color: "black" }}
        >

          <img
            src={product.image_url}
            alt={product.name}
            style={{
              width: 200,
              height: "auto",
              marginBottom: 10
            }}
          />

          <h2>#{product.rank} {product.name}</h2>
          <p style={{ marginTop: 10 }}>{product.description}</p>

        </a>

        <p>Reddit mentions: {productMentions.length}</p>

        {productMentions.map((m) => (
          <p key={m.id}>
            "{m.comment}" — r/{m.subreddit}
          </p>
        ))}

      </div>
    )
  })}*/}
        <div className="trust-container">
          <h2>Why You Can Trust Us</h2>
          <p>Our recommendations are based on real user feedback, not brand promotions. We analyze hundreds of Reddit discussions across multiple communities to identify the products that consistently receive positive feedback from real users. By aggregating insights from long-term usage experiences, we surface the products that stand out for comfort, reliability, and overall value. We don’t accept paid placements — every product is included based on genuine user recommendations.</p>
        </div>
      </Container>
      <Footer/>
    </div>
  )
}