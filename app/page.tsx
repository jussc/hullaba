// "use client"

// import { useEffect, useState } from "react"
// import { supabase } from "./lib/supabase"

// export default function Home() {

//   const [categories, setCategories] = useState<any[]>([])

//   useEffect(() => {

//     async function loadCategories() {

//       const { data } = await supabase
//         .from("categories")
//         .select("*")
//         .order("name")

//       setCategories(data || [])
//     }

//     loadCategories()

//   }, [])

//   return (
//     <main style={{ padding: 40 }}>

//       <h1 style={{ marginBottom: 20 }}>
//         Reddit Product Picks
//       </h1>

//       <p style={{ marginBottom: 30 }}>
//         Discover the best products recommended by real Reddit users.
//       </p>

//       <h2>Browse Categories</h2>

//       <div style={{ marginTop: 20 }}>

//         {categories.map((category) => (
//           <div key={category.slug} style={{ marginBottom: 15 }}>

//             <a
//               href={`/best/${category.slug}`}
//               style={{
//                 fontSize: 18,
//                 textDecoration: "none",
//                 fontWeight: "bold"
//               }}
//             >
//               {category.name} →
//             </a>

//           </div>
//         ))}

//       </div>

//     </main>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { supabase } from "./lib/supabase"
import Link from "next/link"
import Footer from "@/app/components/Footer"

export default function Home() {

  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {

    async function loadCategories() {

      const { data } = await supabase
        .from("categories")
        .select("*")
        .order("name")

      setCategories(data || [])
    }

    loadCategories()

  }, [])

  return (
    <main className="">

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

      <section id="categories" className="container">

        <h2>Browse Categories</h2>

        <div className="category-grid">

{/*          {categories.map((category) => (
            <a
              key={category.slug}
              href={`/best/${category.slug}`}
              className="category-card"
            >
              {category.name}
            </a>
          ))}*/}

          <a href="/best/office-chairs" className="category-card">
            <div className="category-image">
              <img src="/images/office-chair.png" alt="Office Chairs" />
            </div>
            <h3>Office Chairs</h3>
          </a>
        </div>

      </section>

      <Footer/>
    </main>
  )
}