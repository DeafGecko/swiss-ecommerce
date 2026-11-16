import { NextRequest, NextResponse } from 'next/server'

interface CheckoutItem {
  name: string
  price: number
  quantity: number
}

// Client-supplied prices are trusted only for this mock flow, but they still
// must be well-formed or the computed total becomes NaN or negative.
function isValidItem(item: unknown): item is CheckoutItem {
  if (!item || typeof item !== 'object') return false
  const { name, price, quantity } = item as Record<string, unknown>
  return (
    typeof name === 'string' &&
    name.length > 0 &&
    typeof price === 'number' &&
    Number.isFinite(price) &&
    price >= 0 &&
    typeof quantity === 'number' &&
    Number.isInteger(quantity) &&
    quantity >= 1
  )
}

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json()

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    if (!items.every(isValidItem)) {
      return NextResponse.json(
        { error: 'Invalid cart items' },
        { status: 400 }
      )
    }

// Calculate total
    const total = items.reduce(
      (sum: number, item: CheckoutItem) => sum + item.price * item.quantity,
      0
    )

// Generate readable order number: ORD-YYYYMMDD-XXXX
    const now = new Date()
    const datePart = now.toISOString().slice(0, 10).replace(/-/g, '')
    const randPart = crypto.randomUUID().replace(/-/g, '').slice(0, 4).toUpperCase()
    const sessionId = `ORD-${datePart}-${randPart}`

// Create order object
    const order = {
      id: sessionId,
      items: items.map((item: CheckoutItem) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: total * 1.08, // including tax
      date: new Date().toISOString(),
    }

// Save to localStorage via response – we can't directly set localStorage from the server,
// so we'll pass the order data to the client via a cookie or header, or just let the client
// handle saving on the success page.

// For now, we'll just return success and the client will save on the success page.
    return NextResponse.json({
      success: true,
      sessionId,
      order,
      url: `/checkout/success?session_id=${sessionId}`,
    })
  } catch (error) {
    console.error('Mock checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to process checkout' },
      { status: 500 }
    )
  }
}
