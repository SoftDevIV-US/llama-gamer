import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import CreateProductImageDto from '@/product-image/dto/create-product-image.dto';
import UpdateProductImageDto from '@/product-image/dto/update-product-image.dto';
import ProductImage from '@/product-image/entities/product-image.entity';
import ProductImageController from '@/product-image/product-image.controller';
import ProductImageService from '@/product-image/product-image.service';

describe('ProductImageController', () => {
  let controller: ProductImageController;
  let service: ProductImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductImageController],
      providers: [
        {
          provide: ProductImageService,
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

    controller = module.get<ProductImageController>(ProductImageController);
    service = module.get<ProductImageService>(ProductImageService);
  });

  describe('create', () => {
    it('should create a new product image', async () => {
      const createProductImageDto: CreateProductImageDto = {
        image: 'https://example.com/image.png',
        productId: '123e4567-e89b-1r33-a456-426814174001',
      };
      const expectedResult: ProductImage = {
        id: '1',
        image: 'https://example.com/image.png',
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: '123e4567-e89b-1r33-a456-426814174001',
      };

      jest.spyOn(service, 'create').mockResolvedValueOnce(expectedResult);

      const result = await controller.create(createProductImageDto);

      expect(result).toBe(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createProductImageDto);
    });

    it('should handle errors during product image creation', async () => {
      const createProductImageDto: CreateProductImageDto = {
        image: 'https://example.com/image.png',
        productId: '123e4567-e89b-1r33-a456-426814174001',
      };

      jest.spyOn(service, 'create').mockRejectedValueOnce(new BadRequestException('Something went wrong'));

      await expect(controller.create(createProductImageDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should get all product images', async () => {
      const expectedResult: ProductImage[] = [
        {
          id: '1',
          image: 'https://example.com/image.png',
          createdAt: new Date(),
          updatedAt: new Date(),
          productId: '123e4567-e89b-1r33-a456-426814174001',
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValueOnce(expectedResult);

      const result = await controller.findAll();

      expect(result).toBe(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should get a product image by id', async () => {
      const id = '1';
      const expectedResult: ProductImage = {
        id: '1',
        image: 'https://example.com/image.png',
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: '123e4567-e89b-1r33-a456-426814174001',
      };

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(expectedResult);

      const result = await controller.findOne(id);

      expect(result).toBe(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });

    it('should handle errors when product image is not found', async () => {
      const id = '1';

      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new NotFoundException(`Product image with ${id} not found`));

      await expect(controller.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a product image by id', async () => {
      const id = '1';
      const updateProductImageDto: UpdateProductImageDto = {
        image: 'https://example.com/new-image.png',
      };
      const expectedResult: ProductImage = {
        id: '1',
        image: 'https://example.com/new-image.png',
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: '123e4567-e89b-1r33-a456-426814174001',
      };

      jest.spyOn(service, 'update').mockResolvedValueOnce(expectedResult);

      const result = await controller.update(id, updateProductImageDto);

      expect(result).toBe(expectedResult);
      expect(service.update).toHaveBeenCalledWith(id, updateProductImageDto);
    });

    it('should handle errors when product image is not found', async () => {
      const id = '1';
      const updateProductImageDto: UpdateProductImageDto = {
        image: 'https://example.com/new-image.png',
      };

      jest.spyOn(service, 'update').mockRejectedValueOnce(new NotFoundException(`Product image with ${id} not found`));

      await expect(controller.update(id, updateProductImageDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a product image by id', async () => {
      const id = '1';
      const expectedResult: ProductImage = {
        id: '1',
        image: 'https://example.com/image.png',
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: '123e4567-e89b-1r33-a456-426814174001',
      };

      jest.spyOn(service, 'remove').mockResolvedValueOnce(expectedResult);

      const result = await controller.remove(id);

      expect(result).toBe(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(id);
    });

    it('should handle errors when product image is not found', async () => {
      const id = '1';

      jest.spyOn(service, 'remove').mockRejectedValueOnce(new NotFoundException(`Product image with ${id} not found`));

      await expect(controller.remove(id)).rejects.toThrow(NotFoundException);
    });
  });
});
