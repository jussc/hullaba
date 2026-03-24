"use client"

export default function ProductCard({ product, mentions }: any) {

  const productMentions = mentions.filter(
    (m: any) => m.product_id === product.id
  )

  return (
    <div
      style={{
        // display: "flex",
        // gap: 24,
        // border: "1px solid #ddd",
        // padding: 24,
        // marginBottom: 30,
        // borderRadius: 12,
        // background: "grey",
        height: "100%"
      }}
    >

      {/*<img
        src={product.image_url}
        alt={product.name}
        style={{
          width: "100%",
          borderRadius: 8,
          marginBottom: 10
        }}
      />*/}

      <div className="product-card">
        <img src={product.image_url} alt={product.name} />

        <h3>#{product.rank} {product.name}</h3>

        <p className="product-description">{product.description}</p>

{/*                <a
          href={product.affiliate_url}
          target="_blank"
          rel="nofollow sponsored"
          style={{
            display: "inline-block",
            marginTop: 10,
            fontWeight: "bold"
          }}
        >
          View Product →
        </a>*/}
        <div className="card-footer">
          <a
    // href={product.affiliate_url} change to redirect slug
            href={`/go/${product.slug}`}
            target="_blank"
            rel="nofollow sponsored"
            className="product-button"
          >
            View Product
          </a>
        </div>
      </div>

{/*      <div>

        <h2>
          #{product.rank} {product.name}
        </h2>

        <p style={{ marginTop: 10 }}>
          {product.description}
        </p>

        <p style={{ marginTop: 10 }}>
          Reddit mentions: {productMentions.length}
        </p>

        <a
          href={product.affiliate_url}
          target="_blank"
          rel="nofollow sponsored"
          style={{
            display: "inline-block",
            marginTop: 10,
            fontWeight: "bold"
          }}
        >
          View Product →
        </a>

      </div>*/}

    </div>
  )
}