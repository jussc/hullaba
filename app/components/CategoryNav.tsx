"use client"

export default function CategoryNav({ categories }: any) {
  return (
    <div style={{ marginBottom: 30 }}>
      {categories.map((c: any) => (
        <a className="nav-button"
          key={c.slug}
          href={`/best/${c.slug}`}
          style={{
            marginRight: 20,
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          {c.name}
        </a>
      ))}
    </div>
  )
}