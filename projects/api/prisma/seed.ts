import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

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
  const passwordAdmin = await bcrypt.hash('admin123', 10);
  const passwordUser = await bcrypt.hash('user1234', 10);

  await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {
      password: passwordAdmin,
    },
    create: {
      name: 'admin',
      lastName: 'admin',
      email: 'admin@admin.com',
      password: passwordAdmin,
      role: Role.ADMIN,
    },
  });

  await prisma.user.upsert({
    where: { email: 'user@user.com' },
    update: {
      password: passwordUser,
    },
    create: {
      name: 'user',
      lastName: 'user',
      email: 'user@user.com',
      password: passwordUser,
      role: Role.USER,
    },
  });
}

seed()
  .catch((e) => {
    throw new Error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
