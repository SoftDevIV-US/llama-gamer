import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Product } from '@prisma/client';

import PrismaService from '@/prisma/prisma.service';
import CreateProductDto from '@/product/dto/create-product.dto';
import UpdateProductDto from '@/product/dto/update-product.dto';
import ProductService from '@/product/product.service';

describe('ProductService', () => {
  let productService: ProductService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PrismaService,
          useValue: {
            product: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  describe('create', () => {
    it('should create a product and return it', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        stock: 10,
        price: 99.99,
        description: 'This product is god',
        categoryId: '12345',
        brandId: '54321',
      };

      const expectedResult: Product = {
        id: '1',
        name: 'Test Product',
        stock: 10,
        price: 99.99,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: 'This product is god',
        isAvailable: false,
        categoryId: '12345',
        brandId: '54321',
      };

      jest.spyOn(prismaService.product, 'create').mockResolvedValueOnce(expectedResult);

      const result = await productService.create(createProductDto);

      expect(result).toEqual(expectedResult);
    });

    it('should throw BadRequestException if product name already exists', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        stock: 10,
        price: 99.99,
        description: 'This product is devil',
        categoryId: '6547asf3',
        brandId: '13452asd',
      };

      jest.spyOn(prismaService.product, 'create').mockRejectedValueOnce({
        meta: {
          target: ['name'],
        },
      });

      await expect(productService.create(createProductDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if an error occurs', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        stock: 10,
        price: 99.99,
        description: 'This product is a keyboard',
        categoryId: '8745sid',
        brandId: '4234cth',
      };

      jest.spyOn(prismaService.product, 'create').mockRejectedValueOnce(new Error());

      await expect(productService.create(createProductDto)).rejects.toThrow(BadRequestException);
    });
  });
  describe('findAll', () => {
    it('should return an array of products', async () => {
      const expectedProducts: Product[] = [
        {
          id: '1',
          name: 'Product 1',
          stock: 10,
          price: 19.99,
          createdAt: new Date(),
          updatedAt: new Date(),
          description: 'Description 1',
          isAvailable: true,
          categoryId: '12345',
          brandId: '54321',
        },
        {
          id: '2',
          name: 'Product 2',
          stock: 15,
          price: 29.99,
          createdAt: new Date(),
          updatedAt: new Date(),
          description: 'Description 2',
          isAvailable: false,
          categoryId: '67890',
          brandId: '98765',
        },
      ];

      jest.spyOn(prismaService.product, 'findMany').mockResolvedValueOnce(expectedProducts);

      const result = await productService.findAll();

      expect(result).toEqual(expectedProducts);
    });

    it('should return an empty array if no products are found', async () => {
      const expectedProducts: Product[] = [];

      jest.spyOn(prismaService.product, 'findMany').mockResolvedValueOnce(expectedProducts);

      const result = await productService.findAll();

      expect(result).toEqual(expectedProducts);
    });

    it('should throw an error if an error occurs while fetching products', async () => {
      jest.spyOn(prismaService.product, 'findMany').mockRejectedValueOnce(new Error('Database error'));

      await expect(productService.findAll()).rejects.toThrow('Database error');
    });
  });
  describe('findOne', () => {
    it('should return a product when a valid ID is provided', async () => {
      const productId = '1';
      const expectedProduct: Product = {
        id: productId,
        name: 'Test Product',
        stock: 10,
        price: 99.99,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: 'This product is awesome',
        isAvailable: true,
        categoryId: '12345',
        brandId: '54321',
      };

      jest.spyOn(prismaService.product, 'findUnique').mockResolvedValueOnce(expectedProduct);

      const result = await productService.findOne(productId);

      expect(result).toEqual(expectedProduct);
    });

    it('should throw a NotFoundException if no product is found with the provided ID', async () => {
      const productId = '999'; // Assuming a non-existent ID
      jest.spyOn(prismaService.product, 'findUnique').mockResolvedValueOnce(null);

      await expect(productService.findOne(productId)).rejects.toThrow(
        new NotFoundException(`Product with ID ${productId} not found`)
      );
    });

    it('should throw an error if an error occurs while fetching the product', async () => {
      const productId = '1';
      jest.spyOn(prismaService.product, 'findUnique').mockRejectedValueOnce(new Error('Database error'));

      await expect(productService.findOne(productId)).rejects.toThrow('Database error');
    });
  });

  describe('update', () => {
    it('should update a product and return the updated product', async () => {
      const productId = '1';
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
        stock: 20,
        price: 129.99,
        description: 'This product is updated',
        categoryId: '54321',
        brandId: '12345',
      };

      const expectedUpdatedProduct: Product = {
        id: productId,
        name: 'Updated Product',
        stock: 20,
        price: 129.99,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: 'This product is updated',
        isAvailable: true,
        categoryId: '54321',
        brandId: '12345',
      };

      jest.spyOn(prismaService.product, 'update').mockResolvedValueOnce(expectedUpdatedProduct);

      const result = await productService.update(productId, updateProductDto);

      expect(result).toEqual(expectedUpdatedProduct);
    });

    it('should throw a BadRequestException if the updated product name already exists', async () => {
      const productId = '1';
      const updateProductDto: UpdateProductDto = {
        name: 'Existing Product',
        stock: 20,
        price: 129.99,
        description: 'This product already exists',
        categoryId: '54321',
        brandId: '12345',
      };

      jest.spyOn(prismaService.product, 'update').mockRejectedValueOnce({
        meta: {
          target: ['name'],
        },
      });

      await expect(productService.update(productId, updateProductDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw a NotFoundException if no product is found with the provided ID', async () => {
      const productId = '999';
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
        stock: 20,
        price: 129.99,
        description: 'This product is updated',
        categoryId: '54321',
        brandId: '12345',
      };

      jest.spyOn(prismaService.product, 'update').mockRejectedValueOnce(new Error('Database error'));

      await expect(productService.update(productId, updateProductDto)).rejects.toThrow(
        new NotFoundException(`Product with ID ${productId} not found`)
      );
    });
  });

  describe('remove', () => {
    it('should remove a product and return the removed product', async () => {
      const productId = '1';

      const expectedRemovedProduct: Product = {
        id: productId,
        name: 'Removed Product',
        stock: 15,
        price: 49.99,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: 'This product has been removed',
        isAvailable: false,
        categoryId: '98765',
        brandId: '54321',
      };

      jest.spyOn(prismaService.product, 'delete').mockResolvedValueOnce(expectedRemovedProduct);

      const result = await productService.remove(productId);

      expect(result).toEqual(expectedRemovedProduct);
    });

    it('should throw a NotFoundException if no product is found with the provided ID', async () => {
      const productId = '999';

      jest.spyOn(prismaService.product, 'delete').mockRejectedValueOnce(new Error('Database error'));

      await expect(productService.remove(productId)).rejects.toThrow(
        new NotFoundException(`Product with ID ${productId} not found`)
      );
    });
  });
});
