// @vitest-environment node
import { describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '@/app/api/checkout/route'

function jsonRequest(body: unknown) {
  return new NextRequest('http://localhost/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  })
}

describe('POST /api/checkout', () => {
  it('rejects an empty cart with 400', async () => {
    const res = await POST(jsonRequest({ items: [] }))

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Cart is empty' })
  })

  it('rejects a request with no items field with 400', async () => {
    const res = await POST(jsonRequest({}))

    expect(res.status).toBe(400)
  })

  it('returns an order with total including 8% tax', async () => {
    const res = await POST(
      jsonRequest({
        items: [
          { id: 'p1', name: 'Desk Lamp', price: 100, quantity: 2 },
          { id: 'p2', name: 'Clock', price: 50, quantity: 1 },
        ],
      })
    )
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.order.items).toEqual([
      { name: 'Desk Lamp', quantity: 2, price: 100 },
      { name: 'Clock', quantity: 1, price: 50 },
    ])
    expect(data.order.total).toBeCloseTo(250 * 1.08, 2)
  })

  it('generates an ORD-YYYYMMDD-XXXX session id and redirect url', async () => {
    const res = await POST(jsonRequest({ items: [{ id: 'p1', name: 'A', price: 1, quantity: 1 }] }))
    const data = await res.json()

    expect(data.sessionId).toMatch(/^ORD-\d{8}-[A-Z0-9]{1,4}$/)
    expect(data.order.id).toBe(data.sessionId)
    expect(data.url).toBe(`/checkout/success?session_id=${data.sessionId}`)
  })

  it.each([
    ['zero quantity', { id: 'p1', name: 'A', price: 10, quantity: 0 }],
    ['negative quantity', { id: 'p1', name: 'A', price: 10, quantity: -2 }],
    ['fractional quantity', { id: 'p1', name: 'A', price: 10, quantity: 1.5 }],
    ['string price', { id: 'p1', name: 'A', price: '10', quantity: 1 }],
    ['negative price', { id: 'p1', name: 'A', price: -10, quantity: 1 }],
    ['missing name', { id: 'p1', price: 10, quantity: 1 }],
  ])('rejects an item with %s with 400', async (_label, item) => {
    const res = await POST(jsonRequest({ items: [item] }))

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Invalid cart items' })
  })

  it('returns 500 when the body is not valid JSON', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const res = await POST(jsonRequest('{not json'))

    expect(res.status).toBe(500)
    expect(await res.json()).toEqual({ error: 'Failed to process checkout' })
    spy.mockRestore()
  })
})
