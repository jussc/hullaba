import fetch from "node-fetch"
import dotenv from "dotenv"
import { createClient } from "@supabase/supabase-js"

dotenv.config()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

async function fetchThreads() {

  const res = await fetch(
    "https://www.reddit.com/r/OfficeChairs/top.json?limit=5"
  )

  const data = await res.json()

  return data.data.children

}

async function fetchComments(threadId) {

  const url = `https://www.reddit.com/comments/${threadId}.json`

  const res = await fetch(url)

  const data = await res.json()

  const comments = data[1].data.children

  return comments

}

async function loadProducts() {

  const { data } = await supabase
    .from("products")
    .select("id, name")

  return data

}

function detectProduct(commentText, products) {

  if (!products) return null

  for (const product of products) {

    if (!product || !product.name) continue

    const name = product.name.toLowerCase()

    if (commentText.toLowerCase().includes(name)) {
      return product
    }

  }

  return null
}

async function saveMention(product, comment) {

  await supabase
    .from("reddit_mentions")
    .insert({
      product_id: product.id,
      subreddit: comment.data.subreddit,
      comment: comment.data.body,
      upvotes: comment.data.score
    })

  console.log("Mention saved:", product.name)

}

async function run() {

  const threads = await fetchThreads()

  const products = await loadProducts()

  for (const thread of threads) {

    const threadId = thread.data.id

    const comments = await fetchComments(threadId)

    for (const c of comments) {

      if (!c.data.body) continue

let product = detectProduct(c.data.body, products)

const newProductName = detectPossibleProduct(c.data.body)

console.log("Detected candidate:", newProductName)

if (!newProductName) {
  continue
}

console.log("Creating candidate product:", newProductName)

product = await createProduct(newProductName)

// if (!product) {

//   const newProductName = detectPossibleProduct(c.data.body)
// console.log("Detected candidate:", newProductName)
// console.log("Creating candidate product:", newProductName)
//   if (newProductName) {

// product = await createProduct(newProductName)

// if (product) {
//   products.push(product)
// }

//   }

// }
// 
if (product) {
  await saveMention(product, c)
}

    }

  }

}

run()

function detectPossibleProduct(text) {

  const pattern = /([A-Z][a-zA-Z]+\s[A-Z][a-zA-Z0-9]+)/g

  const matches = text.match(pattern)

  if (!matches || matches.length === 0) {
    return null
  }

  return matches[0]
}

// async function createProduct(name) {

//   const slug = name
//     .toLowerCase()
//     .replace(/\s+/g, "-")

//   // check if already exists in candidate table
//   const { data: existingCandidate } = await supabase
//     .from("candidate_products")
//     .select("*")
//     .eq("slug", slug)
//     .maybeSingle()

//   if (existingCandidate) {

//     await supabase
//       .from("candidate_products")
//       .update({
//         mentions: existingCandidate.mentions + 1
//       })
//       .eq("id", existingCandidate.id)

//     console.log("Incremented mention:", name)

//     return existingCandidate
//   }

//   // check if already exists in real products table
//   const { data: existingProduct } = await supabase
//     .from("products")
//     .select("*")
//     .eq("slug", slug)
//     .maybeSingle()

//   if (existingProduct) {
//     console.log("Product already exists:", name)
//     return existingProduct
//   }
// console.log("INSERTING:", name)
//   // insert new candidate
//   const { data, error } = await supabase
//     .from("candidate_products")
//     .insert({
//       name: name,
//       slug: slug,
//       category: "office-chairs",
//       source: "reddit",
//       mentions: 1
//     })
//     .select()
//     .single()

//   if (error) {
//     console.error("Insert error:", error)
//     return null
//   }

//   console.log("New candidate product discovered:", name)

//   return data
// }

async function createProduct(name) {

  const slug = name
    .toLowerCase()
    .replace(/\s+/g, "-")

  const { data, error } = await supabase
    .from("candidate_products")
    .insert({
      name: name,
      slug: slug,
      category: "office-chairs",
      source: "reddit",
      mentions: 1
    })
    .select()
    .single()

  if (error) {
    console.error("Insert error:", error)
    return null
  }

  console.log("New candidate product discovered:", name)

  return data
}