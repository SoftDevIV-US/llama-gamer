import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import PrismaService from '@/prisma/prisma.service';
import CreateProductsSuppliersDto from '@/products-suppliers/dto/create-products-suppliers.dto';
import UpdateProductsSupplierDto from '@/products-suppliers/dto/update-products-suppliers.dto';
import ProductsSuppliers from '@/products-suppliers/entities/products-suppliers.entity';
import ProductsSuppliersService from '@/products-suppliers/products-suppliers.service';

describe('ProductsSuppliersService', () => {
  let service: ProductsSuppliersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsSuppliersService,
        {
          provide: PrismaService,
          useValue: {
            productsSuppliers: {
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

    service = module.get<ProductsSuppliersService>(ProductsSuppliersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new products supplier', async () => {
      const createDto: CreateProductsSuppliersDto = {
        productId: '123e4567-e89b-1r33-a456-426814174001',
        supplierId: '123e4567-e89b-1r33-a456-426814174002',
      };

      const expectedResult: ProductsSuppliers = {
        productId: '123e4567-e89b-1r33-a456-426814174001',
        supplierId: '123e4567-e89b-1r33-a456-426814174002',
        createdAt: new Date(),
      };

      jest.spyOn(prismaService.productsSuppliers, 'create').mockResolvedValue(expectedResult);

      const result = await service.create(createDto);

      expect(prismaService.productsSuppliers.create).toHaveBeenCalledWith({ data: createDto });
      expect(result).toEqual(expectedResult);
    });

    it('should throw BadRequestException when something goes wrong', async () => {
      const createDto: CreateProductsSuppliersDto = {
        productId: '123e4567-e89b-1r33-a456-426814174001',
        supplierId: '123e4567-e89b-1r33-a456-426814174002',
      };

      jest.spyOn(prismaService.productsSuppliers, 'create').mockRejectedValue(new Error());

      await expect(service.create(createDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return all products suppliers', async () => {
      const expectedResult: ProductsSuppliers[] = [
        {
          productId: '123e4567-e89b-1r33-a456-426814174001',
          supplierId: '123e4567-e89b-1r33-a456-426814174002',
          createdAt: new Date(),
        },
      ];

      jest.spyOn(prismaService.productsSuppliers, 'findMany').mockResolvedValue(expectedResult);

      const result = await service.findAll();

      expect(prismaService.productsSuppliers.findMany).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a products supplier by productId and supplierId', async () => {
      const productId = '123e4567-e89b-1r33-a456-426814174001';
      const supplierId = '123e4567-e89b-1r33-a456-426814174002';

      const expectedResult: ProductsSuppliers = {
        productId: '123e4567-e89b-1r33-a456-426814174001',
        supplierId: '123e4567-e89b-1r33-a456-426814174002',
        createdAt: new Date(),
      };

      jest.spyOn(prismaService.productsSuppliers, 'findUnique').mockResolvedValue(expectedResult);

      const result = await service.findOne(productId, supplierId);

      expect(prismaService.productsSuppliers.findUnique).toHaveBeenCalledWith({
        where: { productId_supplierId: { productId, supplierId } },
      });
      expect(result).toEqual(expectedResult);
    });

    it('should throw NotFoundException when products supplier is not found', async () => {
      const productId = '123e4567-e89b-1r33-a456-426814174001';
      const supplierId = '123e4567-e89b-1r33-a456-426814174002';

      jest.spyOn(prismaService.productsSuppliers, 'findUnique').mockResolvedValue(null);

      await expect(service.findOne(productId, supplierId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a products supplier by productId and supplierId', async () => {
      const productId = '123e4567-e89b-1r33-a456-426814174001';
      const supplierId = '123e4567-e89b-1r33-a456-426814174002';

      const updateDto: UpdateProductsSupplierDto = {
        productId: '123e4567-e89b-1r33-a456-426814174003',
        supplierId: '123e4567-e89b-1r33-a456-426814174004',
      };

      const expectedResult: ProductsSuppliers = {
        productId: '123e4567-e89b-1r33-a456-426814174003',
        supplierId: '123e4567-e89b-1r33-a456-426814174004',
        createdAt: new Date(),
      };

      jest.spyOn(prismaService.productsSuppliers, 'update').mockResolvedValue(expectedResult);

      const result = await service.update(productId, supplierId, updateDto);

      expect(prismaService.productsSuppliers.update).toHaveBeenCalledWith({
        where: { productId_supplierId: { productId, supplierId } },
        data: updateDto,
      });
      expect(result).toEqual(expectedResult);
    });

    it('should throw NotFoundException when products supplier is not found', async () => {
      const productId = '123e4567-e89b-1r33-a456-426814174001';
      const supplierId = '123e4567-e89b-1r33-a456-426814174002';

      const updateDto: UpdateProductsSupplierDto = {
        productId: '123e4567-e89b-1r33-a456-426814174003',
        supplierId: '123e4567-e89b-1r33-a456-426814174004',
      };

      jest.spyOn(prismaService.productsSuppliers, 'update').mockRejectedValue(new Error());

      await expect(service.update(productId, supplierId, updateDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a products supplier by productId and supplierId', async () => {
      const productId = '123e4567-e89b-1r33-a456-426814174001';
      const supplierId = '123e4567-e89b-1r33-a456-426814174002';

      const expectedResult: ProductsSuppliers = {
        productId: '123e4567-e89b-1r33-a456-426814174001',
        supplierId: '123e4567-e89b-1r33-a456-426814174002',
        createdAt: new Date(),
      };

      jest.spyOn(prismaService.productsSuppliers, 'delete').mockResolvedValue(expectedResult);

      const result = await service.remove(productId, supplierId);

      expect(prismaService.productsSuppliers.delete).toHaveBeenCalledWith({
        where: { productId_supplierId: { productId, supplierId } },
      });
      expect(result).toEqual(expectedResult);
    });

    it('should throw NotFoundException when products supplier is not found', async () => {
      const productId = '123e4567-e89b-1r33-a456-426814174001';
      const supplierId = '123e4567-e89b-1r33-a456-426814174002';

      jest.spyOn(prismaService.productsSuppliers, 'delete').mockRejectedValue(new Error());

      await expect(service.remove(productId, supplierId)).rejects.toThrow(NotFoundException);
    });
  });
});
