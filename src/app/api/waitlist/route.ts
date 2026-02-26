import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, classTitle, phone } = body

    if (!name || !email || !classTitle) {
      return NextResponse.json(
        { error: 'Name, email, and class title are required' },
        { status: 400 }
      )
    }

    // TODO: Send email via Resend once API key is configured
    // For now, log the submission
    console.log('Waitlist submission:', { name, email, classTitle, phone })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
