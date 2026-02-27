import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    "Katie's Krops privacy policy. Learn how we collect, use, and protect your personal information when you visit our website and use our services.",
  robots: { index: true, follow: true },
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: "Privacy Policy | Katie's Krops",
    description:
      "How Katie's Krops collects, uses, and protects your personal information.",
    url: 'https://katieskrops.com/privacy',
    siteName: "Katie's Krops",
    type: 'website',
    images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: "Katie's Krops — Growing for the Greater Good" }],
  },
}

export default function PrivacyPage() {
  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-stone-400">
            Last updated: February 2026
          </p>

          <div className="mt-10 space-y-10 text-stone-600">
            {/* Introduction */}
            <div>
              <p className="leading-relaxed">
                Katie&apos;s Krops (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
                &ldquo;our&rdquo;) is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, and safeguard
                your personal information when you visit our website at{' '}
                <span className="font-medium text-stone-800">
                  katieskrops.com
                </span>{' '}
                or interact with our programs and services.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <h2 className="font-display text-xl font-semibold text-stone-900">
                Information We Collect
              </h2>
              <p className="mt-3 leading-relaxed">
                We may collect the following personal information when you
                interact with our website or programs:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-stone-800">Contact information</strong>{' '}
                  such as your name, email address, phone number, and mailing
                  address when you fill out forms, sign up for newsletters, or
                  contact us directly.
                </li>
                <li>
                  <strong className="text-stone-800">
                    Garden grant applications
                  </strong>{' '}
                  including information about applicants such as name, age, school,
                  and project details submitted through our application forms.
                </li>
                <li>
                  <strong className="text-stone-800">Donation information</strong>{' '}
                  including your name and email when you make a donation through our
                  third-party payment processor.
                </li>
                <li>
                  <strong className="text-stone-800">
                    Event registration details
                  </strong>{' '}
                  when you sign up for classes, dinners, or other events.
                </li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div>
              <h2 className="font-display text-xl font-semibold text-stone-900">
                How We Use Your Information
              </h2>
              <p className="mt-3 leading-relaxed">
                We use the information we collect for the following purposes:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>
                  To respond to your inquiries, applications, and requests
                </li>
                <li>
                  To send newsletters, program updates, and event announcements
                  (you may opt out at any time)
                </li>
                <li>To process donations and issue tax receipts</li>
                <li>
                  To administer our programs, including garden grants, Outdoor
                  Classroom registration, and community dinners
                </li>
                <li>To improve our website and user experience</li>
              </ul>
            </div>

            {/* Third-Party Services */}
            <div>
              <h2 className="font-display text-xl font-semibold text-stone-900">
                Third-Party Services
              </h2>
              <p className="mt-3 leading-relaxed">
                We use the following third-party services to operate our
                programs. Each service has its own privacy policy governing the
                data they collect:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-stone-800">CharityProud</strong> for
                  processing donations and managing donor records
                </li>
                <li>
                  <strong className="text-stone-800">JotForm</strong> for
                  garden grant applications and program registration forms
                </li>
                <li>
                  <strong className="text-stone-800">Google Analytics</strong>{' '}
                  for understanding website traffic and usage patterns
                </li>
              </ul>
              <p className="mt-3 leading-relaxed">
                We do not sell, rent, or share your personal information with
                third parties for their marketing purposes.
              </p>
            </div>

            {/* Cookies and Analytics */}
            <div>
              <h2 className="font-display text-xl font-semibold text-stone-900">
                Cookies and Analytics
              </h2>
              <p className="mt-3 leading-relaxed">
                Our website may use cookies and similar tracking technologies to
                improve your browsing experience and to analyze site traffic. You
                can control cookie preferences through your browser settings.
              </p>
              <p className="mt-3 leading-relaxed">
                We use Google Analytics to collect anonymous data about how
                visitors use our website, including pages visited, time spent on
                the site, and referring sources. This information helps us
                improve our website and better serve our community.
              </p>
            </div>

            {/* Children's Privacy */}
            <div>
              <h2 className="font-display text-xl font-semibold text-stone-900">
                Children&apos;s Privacy
              </h2>
              <p className="mt-3 leading-relaxed">
                Katie&apos;s Krops is dedicated to empowering youth and we take
                the privacy of children seriously. We comply with the
                Children&apos;s Online Privacy Protection Act (COPPA).
              </p>
              <p className="mt-3 leading-relaxed">
                We do not knowingly collect personal information from children
                under the age of 13 without verifiable parental consent. Garden
                grant applications and program registrations for children under
                13 require a parent or guardian to submit the form. If we learn
                that we have collected personal information from a child under 13
                without parental consent, we will take steps to delete that
                information promptly.
              </p>
              <p className="mt-3 leading-relaxed">
                If you believe we have inadvertently collected information from a
                child under 13, please contact us immediately at the address
                below.
              </p>
            </div>

            {/* Data Security */}
            <div>
              <h2 className="font-display text-xl font-semibold text-stone-900">
                Data Security
              </h2>
              <p className="mt-3 leading-relaxed">
                We take reasonable measures to protect your personal information
                from unauthorized access, disclosure, alteration, or
                destruction. However, no method of transmission over the internet
                or electronic storage is 100% secure, and we cannot guarantee
                absolute security.
              </p>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="font-display text-xl font-semibold text-stone-900">
                Your Rights
              </h2>
              <p className="mt-3 leading-relaxed">You have the right to:</p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>
                  Request access to the personal information we hold about you
                </li>
                <li>
                  Request correction of inaccurate or incomplete information
                </li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of email communications at any time</li>
              </ul>
            </div>

            {/* Changes to This Policy */}
            <div>
              <h2 className="font-display text-xl font-semibold text-stone-900">
                Changes to This Policy
              </h2>
              <p className="mt-3 leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with a revised &ldquo;Last
                updated&rdquo; date. We encourage you to review this policy
                periodically.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="font-display text-xl font-semibold text-stone-900">
                Contact Us
              </h2>
              <p className="mt-3 leading-relaxed">
                If you have any questions or concerns about this Privacy Policy
                or our data practices, please contact us at:
              </p>
              <div className="mt-4 rounded-2xl border border-border bg-white p-6 shadow-sm">
                <p className="font-semibold text-stone-800">
                  Katie&apos;s Krops
                </p>
                <p className="mt-1 text-stone-600">
                  Email:{' '}
                  <a
                    href="mailto:katie@katieskrops.com"
                    className="font-medium text-forest underline underline-offset-2 hover:text-forest-dark"
                  >
                    katie@katieskrops.com
                  </a>
                </p>
                <p className="mt-1 text-stone-600">
                  Summerville, South Carolina
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
