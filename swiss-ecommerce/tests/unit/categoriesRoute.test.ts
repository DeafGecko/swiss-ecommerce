// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from 'vitest'

const findMany = vi.fn()

vi.mock('@/lib/prisma', () => ({
  prisma: { product: { findMany: (...args: unknown[]) => findMany(...args) } },
}))

const { GET } = await import('@/app/api/categories/route')

describe('GET /api/categories', () => {
  beforeEach(() => {
    findMany.mockReset()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('returns distinct category names', async () => {
    findMany.mockResolvedValue([{ category: 'Lighting' }, { category: 'Decor' }])

    const res = await GET()

    expect(findMany).toHaveBeenCalledWith({ select: { category: true }, distinct: ['category'] })
    expect(await res.json()).toEqual(['Lighting', 'Decor'])
  })

  it('drops empty category values', async () => {
    findMany.mockResolvedValue([{ category: 'Lighting' }, { category: '' }])

    const res = await GET()

    expect(await res.json()).toEqual(['Lighting'])
  })

  it('returns 500 when the database query fails', async () => {
    findMany.mockRejectedValue(new Error('db offline'))

    const res = await GET()

    expect(res.status).toBe(500)
    expect(await res.json()).toEqual({ error: 'Failed to fetch categories' })
  })
})
