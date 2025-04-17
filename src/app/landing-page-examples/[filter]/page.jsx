import Link from 'next/link'
import Image from 'next/image'
import { getFilters, getPagesByFilter } from '../../../../lib/pages'

export async function generateStaticParams() {
  const filters = await getFilters()
  return filters.map((filter) => ({ filter }))
}

export default async function FilterPage(props) {
  const { filter } = await props.params
  const pages = await getPagesByFilter(filter)

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        {filter.replace(/-/g, ' ')}
      </h1>
      <div className="flex flex-wrap gap-6">
        {pages.map((page) => (
          <Link
            key={page.slug}
            href={`/landing-page-examples/${filter}/${page.slug}/`}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
          >
            <div className="bg-white rounded-lg shadow hover:shadow-md overflow-hidden">
              <Image
                src={page.image}
                alt={page.title}
                width={400}
                height={250}
                className="object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-medium text-gray-900">{page.title}</h2>
                <p className="mt-2 text-sm text-gray-900">
                  {page.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
