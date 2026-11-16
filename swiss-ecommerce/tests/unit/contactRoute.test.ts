// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'

const sendMail = vi.fn()
const createTransport = vi.fn(() => ({ sendMail }))

vi.mock('nodemailer', () => ({
  default: { createTransport: (...args: unknown[]) => createTransport(...(args as [])) },
}))

const { POST } = await import('@/app/api/contact/route')

function jsonRequest(body: unknown) {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    sendMail.mockReset().mockResolvedValue({ messageId: '1' })
    createTransport.mockClear()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('returns 400 when any required field is missing', async () => {
    const res = await POST(jsonRequest({ name: 'Ann', email: 'ann@example.com' }))

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'All fields are required' })
    expect(sendMail).not.toHaveBeenCalled()
  })

  it('sends the message and returns success', async () => {
    const res = await POST(jsonRequest({ name: 'Ann', email: 'ann@example.com', message: 'Hi' }))

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ success: true })
    expect(sendMail).toHaveBeenCalledTimes(1)
  })

  it('escapes HTML in the html body but not in the plain text body', async () => {
    await POST(
      jsonRequest({
        name: '<script>x</script>',
        email: 'a@b.com',
        message: 'Line 1\n<b>bold</b> & "quotes"',
      })
    )

    const options = sendMail.mock.calls[0][0]
    expect(options.html).toContain('&lt;script&gt;x&lt;/script&gt;')
    expect(options.html).toContain('Line 1<br>&lt;b&gt;bold&lt;/b&gt; &amp; &quot;quotes&quot;')
    expect(options.html).not.toContain('<script>')
    expect(options.text).toContain('Name: <script>x</script>')
  })

  it('uses the raw name in the subject line, not HTML-escaped entities', async () => {
    await POST(jsonRequest({ name: 'Tom & Jerry', email: 'a@b.com', message: 'Hi' }))

    expect(sendMail.mock.calls[0][0].subject).toBe('New Contact Form Message from Tom & Jerry')
  })

  it('strips line breaks from the subject to prevent header injection', async () => {
    await POST(jsonRequest({ name: 'Ann\r\nBcc: x@evil.com', email: 'a@b.com', message: 'Hi' }))

    expect(sendMail.mock.calls[0][0].subject).not.toMatch(/[\r\n]/)
  })

  it('addresses the message to the site owner', async () => {
    await POST(jsonRequest({ name: 'Ann', email: 'ann@example.com', message: 'Hi' }))

    expect(sendMail.mock.calls[0][0].to).toBe('dwirog@gmail.com')
  })

  it('returns 500 with a friendly error when sending fails', async () => {
    sendMail.mockRejectedValueOnce(new Error('SMTP down'))
    const res = await POST(jsonRequest({ name: 'Ann', email: 'ann@example.com', message: 'Hi' }))

    expect(res.status).toBe(500)
    expect(await res.json()).toEqual({ error: 'Failed to send message. Please try again.' })
  })
})
