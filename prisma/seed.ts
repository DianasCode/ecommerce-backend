import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Wireless Headphones",
        description: "Premium wireless headphones with noise cancellation.",
        price: 129.00,
        category: "Electronics",
      },
      {
        name: "Minimal Backpack",
        description: "A clean and lightweight everyday backpack.",
        price: 79.00,
        category: "Fashion",
      },
      {
        name: "Smart Desk Lamp",
        description: "Modern desk lamp with adjustable brightness.",
        price: 59.00,
        category: "Home & Living",
      },
      {
        name: "Mechanical Keyboard",
        description: "Responsive mechanical keyboard for work and gaming.",
        price: 149.00,
        category: "Electronics",
      },
      {
        name: "Everyday Sneakers",
        description: "Comfortable sneakers designed for everyday use.",
        price: 99.00,
        category: "Fashion",
      },
      {
        name: "Travel Bottle",
        description: "Reusable insulated bottle for everyday travel.",
        price: 29.00,
        category: "Sports",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
