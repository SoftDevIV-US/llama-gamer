import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsSuppliers } from '@prisma/client';

import CreateProductsSuppliersDto from '@/products-suppliers/dto/create-products-suppliers.dto';
import UpdateProductsSupplierDto from '@/products-suppliers/dto/update-products-suppliers.dto';
import ProductsSuppliersController from '@/products-suppliers/products-suppliers.controller';
import ProductsSuppliersService from '@/products-suppliers/products-suppliers.service';

describe('ProductsSuppliersController', () => {
  let controller: ProductsSuppliersController;
  let service: ProductsSuppliersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsSuppliersController],
      providers: [
        {
          provide: ProductsSuppliersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsSuppliersController>(ProductsSuppliersController);
    service = module.get<ProductsSuppliersService>(ProductsSuppliersService);
  });

  describe('create', () => {
    it('should create a new products supplier', async () => {
      const createProductsSupplierDto: CreateProductsSuppliersDto = {
        productId: '1',
        supplierId: '2',
      };
      const expectedResult: ProductsSuppliers = {
        productId: '1',
        supplierId: '2',
        createdAt: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValueOnce(expectedResult);

      const result = await controller.create(createProductsSupplierDto);

      expect(result).toBe(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createProductsSupplierDto);
    });

    it('should handle errors during products supplier creation', async () => {
      const createProductsSupplierDto: CreateProductsSuppliersDto = {
        productId: '1',
        supplierId: '2',
      };

      jest.spyOn(service, 'create').mockRejectedValueOnce(new BadRequestException('Something went wrong'));

      await expect(controller.create(createProductsSupplierDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should get all products suppliers', async () => {
      const expectedResult: ProductsSuppliers[] = [
        {
          productId: '1',
          supplierId: '2',
          createdAt: new Date(),
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValueOnce(expectedResult);

      const result = await controller.findAll();

      expect(result).toBe(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should get a products supplier by id', async () => {
      const productId = '1';
      const supplierId = '2';
      const expectedResult: ProductsSuppliers = {
        productId: '1',
        supplierId: '2',
        createdAt: new Date(),
      };

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(expectedResult);

      const result = await controller.findOne(productId, supplierId);

      expect(result).toBe(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(productId, supplierId);
    });

    it('should handle errors when products supplier is not found', async () => {
      const productId = '1';
      const supplierId = '2';

      jest
        .spyOn(service, 'findOne')
        .mockRejectedValueOnce(
          new NotFoundException(`Products supplier with ${productId} and ${supplierId} not found`)
        );

      await expect(controller.findOne(productId, supplierId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a products supplier by id', async () => {
      const productId = '1';
      const supplierId = '2';
      const updateProductsSupplierDto: UpdateProductsSupplierDto = {
        productId: '3',
      };
      const expectedResult: ProductsSuppliers = {
        productId: '3',
        supplierId: '2',
        createdAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValueOnce(expectedResult);

      const result = await controller.update(productId, supplierId, updateProductsSupplierDto);

      expect(result).toBe(expectedResult);
      expect(service.update).toHaveBeenCalledWith(productId, supplierId, updateProductsSupplierDto);
    });

    it('should handle errors when products supplier is not found', async () => {
      const productId = '1';
      const supplierId = '2';
      const updateProductsSupplierDto: UpdateProductsSupplierDto = {
        productId: '3',
      };

      jest
        .spyOn(service, 'update')
        .mockRejectedValueOnce(
          new NotFoundException(`Products supplier with ${productId} and ${supplierId} not found`)
        );

      await expect(controller.update(productId, supplierId, updateProductsSupplierDto)).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe('remove', () => {
    it('should remove a products supplier by id', async () => {
      const productId = '1';
      const supplierId = '2';
      const expectedResult: ProductsSuppliers = {
        productId: '1',
        supplierId: '2',
        createdAt: new Date(),
      };

      jest.spyOn(service, 'remove').mockResolvedValueOnce(expectedResult);

      const result = await controller.remove(productId, supplierId);

      expect(result).toBe(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(productId, supplierId);
    });

    it('should handle errors when products supplier is not found', async () => {
      const productId = '1';
      const supplierId = '2';

      jest
        .spyOn(service, 'remove')
        .mockRejectedValueOnce(
          new NotFoundException(`Products supplier with ${productId} and ${supplierId} not found`)
        );

      await expect(controller.remove(productId, supplierId)).rejects.toThrow(NotFoundException);
    });
  });
});
