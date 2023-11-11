import { PrismaClient } from '@prisma/client';

import { brands, categories, countries } from './data/products';

const prisma = new PrismaClient();

async function seed() {
  await prisma.country.createMany({
    data: countries,
  });

  await prisma.brand.createMany({
    data: brands,
  });

  await prisma.category.createMany({
    data: categories,
  });
}

seed()
  .catch((e) => {
    throw new Error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
