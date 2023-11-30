import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import CreateProductsSuppliersDto from '@/products-suppliers/dto/create-products-suppliers.dto';
import CreateSupplierDto from '@/supplier/dto/create-supplier.dto';

import { brands, categories, countries, products } from './data/products';

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
  const brandList = await prisma.brand.findMany();
  const categoryList = await prisma.category.findMany();

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

  const supplierList = await prisma.supplier.findMany();

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

  const createProducts = products.map((item) => ({
    ...item,
    brandId: brandList[Math.floor(Math.random() * brandList.length)].id,
    categoryId: categoryList[Math.floor(Math.random() * categoryList.length)].id,
  }));

  await prisma.product.createMany({
    data: createProducts,
  });

  const productList = await prisma.product.findMany();

  const createProductImages = productList.map((item) => ({
    image: 'https://i.ibb.co/HgfxQGH/product.png',
    productId: item.id,
  }));

  await prisma.productImage.createMany({
    data: createProductImages,
  });

  const createProductsSuppliers: CreateProductsSuppliersDto[] = [];

  productList.forEach(async (item) => {
    const suppliersIds: string[] = [];
    while (suppliersIds.length < 4) {
      const supplierId = supplierList[Math.floor(Math.random() * supplierList.length)].id;
      if (!suppliersIds.includes(supplierId)) {
        suppliersIds.push(supplierId);
      }
    }
    suppliersIds.forEach((supplierId) => {
      createProductsSuppliers.push({
        productId: item.id,
        supplierId,
      });
    });
  });

  await prisma.productsSuppliers.createMany({
    data: createProductsSuppliers,
  });
}

seed()
  .catch((e) => {
    throw new Error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
