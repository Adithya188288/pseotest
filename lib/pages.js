import fs from 'fs/promises'
import path from 'path'
import { parse } from 'papaparse'

const csvPath = path.join(process.cwd(), 'data', 'pages.csv')

async function loadRaw() {
  const raw = await fs.readFile(csvPath, 'utf-8')
  const { data } = parse(raw, { header: true, skipEmptyLines: true })
  return data
}

export async function getAllPages() {
  return loadRaw()
}

export async function getFilters() {
  const pages = await loadRaw()
  return Array.from(new Set(pages.map((p) => p.filter)))
}

export async function getPagesByFilter(filter) {
  const pages = await loadRaw()
  return pages.filter((p) => p.filter === filter)
}

export async function getPage(filter, slug) {
  const pages = await getPagesByFilter(filter)
  return pages.find((p) => p.slug === slug)
}
