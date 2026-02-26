import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string
      slug?: { current?: string }
    }>(req, process.env.SANITY_REVALIDATE_SECRET)

    if (!isValidSignature) {
      return new NextResponse('Invalid Signature', { status: 401 })
    }

    if (!body?._type) {
      return new NextResponse('Bad Request', { status: 400 })
    }

    await revalidateTag(body._type, 'default')
    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    })
  } catch (err) {
    console.error(err)
    return new NextResponse('Error', { status: 500 })
  }
}
