import Image from 'next/image'
import { getFilters, getPagesByFilter, getPage } from '../../../../../lib/pages'

export async function generateStaticParams() {
  const filters = await getFilters()
  const paths = []
  for (const filter of filters) {
    const pages = await getPagesByFilter(filter)
    pages.forEach((page) => {
      paths.push({ filter, slug: page.slug })
    })
  }
  return paths
}

export default async function PageDetail(props) {
  const { filter, slug } = await props.params
  const page = await getPage(filter, slug)
  if (!page) return <p className="p-6">Not found</p>

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
      <div>
        <Image
          src={page.image}
          alt={page.title}
          width={600}
          height={400}
          className="rounded-lg object-cover"
        />
        <div className="max-w-xl mt-4">
          <p className="text-white-700">{page.description}</p>
        </div>
      </div>
    </main>
  )
}
