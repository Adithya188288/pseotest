import Link from 'next/link'
import { getFilters } from '../../../lib/pages'

export const revalidate = 0  // Fully static at build time

export default async function FiltersPage() {
  const filters = await getFilters()

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Landing‑page Examples</h1>
      <div className="flex flex-wrap gap-4">
        {filters.map((filter) => (
          <Link
            key={filter}
            href={`/landing-page-examples/${filter}/`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {filter.replace(/-/g, ' ')}
          </Link>
        ))}
      </div>
    </main>
  )
}
