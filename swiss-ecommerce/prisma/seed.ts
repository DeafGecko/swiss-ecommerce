import { PrismaClient } from '@prisma/client'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const products = require('./seed-data.json')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding products...')
  
  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        isPopular: product.isPopular || false,
        images: [`/images/products/${product.sku}-main.jpg`],
        metadata: { hasVideo: product.hasVideo || false }
      },
      create: {
        sku: product.sku,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        isPopular: product.isPopular || false,
        images: [`/images/products/${product.sku}-main.jpg`],
        metadata: { hasVideo: product.hasVideo || false }
      }
    })
    console.log(`  ✅ ${product.name}`)
  }
  
  console.log(`✅ Seeded ${products.length} products!`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
