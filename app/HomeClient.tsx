"use client"

import Link from "next/link"
import Footer from "@/app/components/Footer"

export default function HomeClient({ categories }: any) {
  return (
    <main>

      <section className="hero">
        <div className="hero-content">

          <h1>
            Find the Best Products According to Reddit
          </h1>

          <p>
            We analyze thousands of Reddit discussions to discover the
            products real people recommend the most.
          </p>

          <a href="#categories" className="hero-button">
            Browse Categories
          </a>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section container">
        <h2>How It Works</h2>

        <div className="steps">
          <div className="step">
            <h3>1. We Scan Reddit</h3>
            <p>We analyze real discussions across multiple communities.</p>
          </div>

          <div className="step">
            <h3>2. Identify Top Products</h3>
            <p>We find products consistently recommended by real users.</p>
          </div>

          <div className="step">
            <h3>3. Rank & Curate</h3>
            <p>We organize them into easy-to-browse ranked lists.</p>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="container">
        <h2>Browse Categories</h2>

        <div className="category-grid">

          {categories.map((category: any) => (
            <Link
              key={category.slug}
              href={`/best/${category.slug}`}
              className="category-card"
            >
              <div className="category-image">
                <img
                  src={category.image_url || "/images/office-chair.png"}
                  alt={category.name}
                />
              </div>
              <h3>{category.name}</h3>
            </Link>
          ))}

        </div>
      </section>

      <Footer />
    </main>
  )
}