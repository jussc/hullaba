"use client"

export default function TopPick({ product }: any) {

  if (!product) return null

  return (
    <div
      style={{
        border: "2px solid gold",
        padding: 30,
        marginBottom: 40,
        borderRadius: 10,
        background: "#fffbe6"
      }}
    >

      <h2 style={{ marginBottom: 15 }}>
        🏆 Best Overall
      </h2>

      <div style={{ display: "flex", gap: 20 }}>

        <img
          src={product.image_url}
          alt={product.name}
          style={{ width: 200 }}
        />

        <div>

          <h3>{product.name}</h3>

          <p style={{ marginTop: 10 }}>
            {product.top_pick_summary || product.description}
          </p>

          <a
            href={product.affiliate_url}
            target="_blank"
            rel="nofollow sponsored"
            style={{
              display: "inline-block",
              marginTop: 15,
              fontWeight: "bold"
            }}
          >
            View Product →
          </a>

        </div>

      </div>

    </div>
  )
}