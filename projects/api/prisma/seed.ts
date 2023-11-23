import { PrismaClient } from '@prisma/client';

import CreateSupplierDto from '@/supplier/dto/create-supplier.dto';

import { brands, categories, countries } from './data/products';

const prisma = new PrismaClient();

/**
 * Seed the database with data
 */
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

  const suppliers: CreateSupplierDto[] = [];
  const countryList = await prisma.country.findMany();

  countryList.forEach((country) => {
    suppliers.push({
      email: `supplier_${country.name.toLowerCase().replace(/\s+/g, '_')}@example.com`,
      deliveryTime: Math.floor(Math.random() * 180) + 1,
      countryId: country.id,
    });
  });

  await prisma.supplier.createMany({
    data: suppliers,
  });
}

seed()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error('Error seeding database', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
