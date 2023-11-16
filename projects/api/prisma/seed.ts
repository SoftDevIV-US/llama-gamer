import { PrismaClient } from '@prisma/client';

import CreateSupplierDto from '@/suppliers/dto/create-supplier.dto';

import { brands, categories, countries } from './data/products';

const prisma = new PrismaClient();

async function seed() {
  const createdCountries = await prisma.country.createMany({
    data: countries,
  });

  const countryList = await prisma.country.findMany({
    where: {
      name: {
        in: countries.map((country) => country.name),
      },
    },
  });

  await prisma.brand.createMany({
    data: brands,
  });

  await prisma.category.createMany({
    data: categories,
  });

  const suppliers: CreateSupplierDto[] = [];

  countryList.forEach((country) => {
    for (let i = 0; i < 2; i += 1) {
      const email = `supplier_${country.name.toLowerCase().replace(/\s+/g, '_')}_${i + 1}@example.com`;
      const deliveryTime = Math.floor(Math.random() * 180) + 1;
      suppliers.push({
        email,
        deliveryTime,
        countryId: country.id,
      });
    }
  });

  await prisma.supplier.createMany({
    data: suppliers,
  });
}

seed()
  .catch((e) => {
    throw new Error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
