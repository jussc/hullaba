"use client"

import Header from "../../components/Header"
import ProductCard from "../../components/ProductCard"
import TopPick from "../../components/TopPick"
import Container from "../../components/Container"
import Footer from "@/app/components/Footer"

export default function CategoryPageClient({
  products,
  mentions,
  categoryInfo,
  categories,
  category,
}: any) {

  const topProduct = products.find((p: any) => p.rank === 1)

  return (
    <div>
      <Container style={{ padding: 40 }}>

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
          {products.map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
              mentions={mentions}
            />
          ))}
        </div>

        <div className="trust-container">
          <h2>Why You Can Trust Us</h2>
          <p>
            Our recommendations are based on real user feedback, not brand promotions.
            We analyze hundreds of Reddit discussions across multiple communities to
            identify the products that consistently receive positive feedback from real users.
            By aggregating insights from long-term usage experiences, we surface the products
            that stand out for comfort, reliability, and overall value. We don’t accept paid
            placements — every product is included based on genuine user recommendations.
          </p>
        </div>

      </Container>

      <Footer />
    </div>
  )
}