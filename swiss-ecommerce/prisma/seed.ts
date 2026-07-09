import { PrismaClient } from '@prisma/client'
import products from './seed-data.json'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding products...')
  
  for (const product of products) {
    const data = {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      isPopular: product.isPopular || false,
      images: [`/images/products/${product.sku}-main.jpg`],
      metadata: { hasVideo: product.hasVideo || false },
    }
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: data,
      create: { sku: product.sku, ...data },
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
