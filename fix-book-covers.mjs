
const API_URL = "http://localhost:3000/books"

// Informe um e-mail de contato para identificar as requisições.
const USER_AGENT = "MeuLivro/1.0 (contato: seu-email@example.com)"

const FAILED_IDS = new Set([
  14, 35, 48, 34, 2, 4, 27, 42, 3, 15, 32, 41,
  51, 16, 17, 18, 40, 59, 31, 56, 36, 57, 54, 52,
  30, 60, 39, 44, 7, 53, 43, 58, 24, 47, 49, 38,
  9, 10, 55, 28, 11, 46, 29, 12
])

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function titleMatches(expected, candidate) {
  const a = normalize(expected)
  const b = normalize(candidate)

  if (a === b || b.startsWith(a) || a.startsWith(b)) {
    return true
  }

  const wordsA = new Set(a.split(" ").filter(w => w.length > 2))
  const wordsB = new Set(b.split(" ").filter(w => w.length > 2))

  const intersection = [...wordsA].filter(w => wordsB.has(w)).length
  const similarity = intersection / Math.max(wordsA.size, 1)

  return similarity >= 0.75
}

function authorMatches(expected, candidates = []) {
  const expectedAuthors = expected
    .split(";")
    .map(author => normalize(author).split(" ").filter(Boolean).pop())
    .filter(Boolean)

  const foundAuthors = candidates.map(normalize).join(" ")

  return expectedAuthors.every(author => foundAuthors.includes(author))
}

function validImage(buffer) {
  if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    return "image/jpeg"
  }

  if (
    buffer.length >= 8 &&
    buffer.subarray(0, 8).equals(
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
    )
  ) {
    return "image/png"
  }

  if (
    buffer.length >= 12 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return "image/webp"
  }

  return null
}

async function searchBook(book) {
  const url = new URL("https://openlibrary.org/search.json")

  url.searchParams.set("title", book.title)
  url.searchParams.set("author", book.author)
  url.searchParams.set(
    "fields",
    "title,author_name,cover_i,isbn"
  )
  url.searchParams.set("limit", "10")

  const response = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
    signal: AbortSignal.timeout(20000)
  })

  if (!response.ok) {
    throw new Error(`Busca HTTP ${response.status}`)
  }

  const data = await response.json()

  const candidates = (data.docs || []).filter(item =>
    item.cover_i &&
    titleMatches(book.title, item.title) &&
    authorMatches(book.author, item.author_name)
  )

  if (!candidates.length) return null

  // Prefere o resultado cujo título mais se aproxima do cadastro.
  candidates.sort((a, b) => {
    const exactA = normalize(a.title) === normalize(book.title)
    const exactB = normalize(b.title) === normalize(book.title)

    return Number(exactB) - Number(exactA)
  })

  for (const candidate of candidates) {
    const imageUrl =
      `https://covers.openlibrary.org/b/id/${candidate.cover_i}-L.jpg?default=false`

    const imageResponse = await fetch(imageUrl, {
      headers: { "User-Agent": USER_AGENT },
      signal: AbortSignal.timeout(20000)
    })

    if (!imageResponse.ok) continue

    const buffer = Buffer.from(await imageResponse.arrayBuffer())
    const mime = validImage(buffer)

    if (!mime) continue

    return {
      url: imageUrl,
      mime,
      matchedTitle: candidate.title,
      matchedAuthors: candidate.author_name
    }
  }

  return null
}

function escapeSql(value) {
  return value.replaceAll("'", "''")
}

async function main() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error(`API local: HTTP ${response.status}`)
  }

  const books = await response.json()
  const targets = books.filter(book => FAILED_IDS.has(book.id))

  const updates = []
  const unresolved = []

  console.error(`Livros para corrigir: ${targets.length}`)

  for (const [index, book] of targets.entries()) {
    console.error(
      `[${index + 1}/${targets.length}] ${book.id} - ${book.title}`
    )

    try {
      const cover = await searchBook(book)

      if (!cover) {
        unresolved.push(book)
        console.error("  CAPA NÃO ENCONTRADA")
      } else {
        updates.push({
          id: book.id,
          url: cover.url,
          mime: cover.mime
        })

        console.error(`  ENCONTRADA: ${cover.mime}`)
        console.error(`  Título: ${cover.matchedTitle}`)
        console.error(
          `  Autor: ${cover.matchedAuthors.join(", ")}`
        )
      }
    } catch (error) {
      unresolved.push(book)
      console.error(`  ERRO: ${error.message}`)
    }

    // Respeita o limite de requisições da Open Library.
    if (index < targets.length - 1) {
      await wait(1100)
    }
  }

  console.log("BEGIN;")

  for (const item of updates) {
    console.log(`
UPDATE books
SET image_url = '${escapeSql(item.url)}'
WHERE id = ${item.id};`)
  }

  console.log("COMMIT;")

  console.error("\n===== RESULTADO =====")
  console.error(`Livros analisados: ${targets.length}`)
  console.error(`Capas aprovadas: ${updates.length}`)
  console.error(`Sem capa: ${unresolved.length}`)

  if (unresolved.length) {
    console.error("\nLIVROS SEM CAPA:")
    unresolved.forEach(book => {
      console.error(
        `${book.id} | ${book.title} | ${book.isbn}`
      )
    })
  }
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
