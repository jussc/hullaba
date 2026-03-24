"use client"

import CategoryNav from "./CategoryNav"

export default function Header({ categories }: any) {
  return (
    <header
      style={{
        borderBottom: "1px solid #ddd",
        // padding: "20px 40px",
        marginBottom: 30
      }}
    >
      <h2 style={{ marginBottom: 10 }}>
        <a href="/">Hullaba</a>
      </h2>

      {/*<CategoryNav categories={categories} />*/}
    </header>
  )
}