import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — Monochrome Studio',
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors inline-flex items-center gap-1"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-mono text-3xl sm:text-4xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <div className="w-12 h-0.5 bg-[var(--color-primary)] mx-auto mt-4" aria-hidden="true"></div>
          <p className="text-sm text-[var(--color-text-muted)] mt-4">Last updated: January 2024</p>
        </div>

        <div className="space-y-8 text-[var(--color-text-secondary)] leading-relaxed">
          <section>
            <h2 className="font-mono text-lg font-medium text-[var(--color-text)] mb-3">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when you make a purchase, create an
              account, or contact us for support. This includes your name, email address, shipping
              address, and payment information.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-medium text-[var(--color-text)] mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Respond to your questions and support requests</li>
              <li>Improve our products and services</li>
            </ul>
          </section>

          <section>
            <h2 className="font-mono text-lg font-medium text-[var(--color-text)] mb-3">3. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share
              your information with trusted service providers who assist us in operating our website
              and fulfilling orders, subject to confidentiality agreements.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-medium text-[var(--color-text)] mb-3">4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. Payment
              data is processed through secure, PCI-compliant payment processors and is never stored
              on our servers.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-medium text-[var(--color-text)] mb-3">5. Cookies</h2>
            <p>
              We use cookies to maintain your shopping cart and improve your browsing experience.
              You can disable cookies in your browser settings, though some features may not function
              correctly as a result.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-lg font-medium text-[var(--color-text)] mb-3">6. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please{' '}
              <Link href="/contact" className="text-[var(--color-text)] underline hover:no-underline">
                contact us
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
