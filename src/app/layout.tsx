import type { Metadata } from 'next'
import { Fraunces, Source_Sans_3 } from 'next/font/google'
import { SanityLive } from '@/sanity/lib/live'
import { VisualEditing } from 'next-sanity/visual-editing'
import { draftMode } from 'next/headers'
import { DisableDraftMode } from '@/components/layout/disable-draft-mode'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SITE_URL } from '@/lib/site-config'
import './globals.css'

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  variable: '--font-source-sans',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: './',
  },
  title: {
    default: "Katie's Krops — Growing for the Greater Good",
    template: "%s | Katie's Krops",
  },
  description:
    "Katie's Krops empowers youth to start and maintain vegetable gardens and donate the harvest to help feed people in need in their community.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: "Katie's Krops",
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: "Katie's Krops — Growing for the Greater Good",
      },
    ],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const draft = await draftMode()

  return (
    <html lang="en" className={`${fraunces.variable} ${sourceSans.variable}`}>
      <body className="bg-background text-foreground font-body antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <SanityLive />
        {draft.isEnabled && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
      </body>
    </html>
  )
}
