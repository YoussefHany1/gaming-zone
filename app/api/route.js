// app/api/rss-to-json/route.ts
import { NextResponse } from 'next/server'
import { parseStringPromise } from 'xml2js'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const rssUrl = searchParams.get('url')
    if (!rssUrl) {
      return NextResponse.json({ error: 'Missing `url` param' }, { status: 400 })
    }

    const resp = await fetch(rssUrl)
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
    const xml = await resp.text()
    const js = await parseStringPromise(xml, { mergeAttrs: true })
    const items = js.rss?.channel?.[0]?.item ?? []

    const jsonItems = items.map((item) => ({
      title: item.title?.[0] ?? '',
      link: item.link?.[0] ?? '',
      pubDate: item.pubDate?.[0] ?? '',
      description: item.description?.[0] ?? '',
    }))

    return NextResponse.json(jsonItems)
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: err.message || 'Failed to fetch/parse RSS' },
      { status: 500 }
    )
  }
}
