'use client'

import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Message sent! We\'ll get back to you soon.')
        setFormData({ name: '', email: '', message: '' })
      } else {
        toast.error(data.error || 'Something went wrong.')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      toast.error('Failed to send. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors inline-flex items-center gap-1"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="mb-10">
          <h1 className="font-mono text-3xl sm:text-4xl font-bold tracking-tight">
            Contact Us
          </h1>
          <div className="w-12 h-0.5 bg-[var(--color-primary)] mt-4" aria-hidden="true"></div>
          <p className="text-[var(--color-text-secondary)] mt-4">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-mono mb-1">
              Name <span className="text-[var(--color-text-muted)]" aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded-sm focus:outline-none focus:border-[var(--color-primary)] bg-[var(--color-background)] text-[var(--color-text)] transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-mono mb-1">
              Email <span className="text-[var(--color-text-muted)]" aria-hidden="true">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded-sm focus:outline-none focus:border-[var(--color-primary)] bg-[var(--color-background)] text-[var(--color-text)] transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-mono mb-1">
              Message <span className="text-[var(--color-text-muted)]" aria-hidden="true">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded-sm focus:outline-none focus:border-[var(--color-primary)] bg-[var(--color-background)] text-[var(--color-text)] transition-colors resize-vertical"
              placeholder="Your message..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3 bg-[var(--color-primary)] text-[var(--color-text-inverse)] font-mono text-sm hover:bg-[var(--color-primary-hover)] transition-colors rounded disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[var(--color-border-light)] text-center text-sm text-[var(--color-text-muted)]">
          Or email us directly at{' '}
          <a
            href="mailto:dwirog@gmail.com"
            className="text-[var(--color-text)] hover:underline"
          >
            dwirog@gmail.com
          </a>
        </div>
      </div>
    </div>
  )
}
