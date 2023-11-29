import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import PrismaService from '@/prisma/prisma.service';
import CreateProductImageDto from '@/product-image/dto/create-product-image.dto';
import UpdateProductImageDto from '@/product-image/dto/update-product-image.dto';
import ProductImage from '@/product-image/entities/product-image.entity';
import ProductImageService from '@/product-image/product-image.service';

describe('ProductImageService', () => {
  let service: ProductImageService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductImageService,
        {
          provide: PrismaService,
          useValue: {
            productImage: {
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

    service = module.get<ProductImageService>(ProductImageService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a product image', async () => {
      const createProductImageDto: CreateProductImageDto = {
        image: 'https://example.com/image.png',
        productId: '123e4567-e89b-1r33-a456-426814174001',
      };

      const expectedProductImage: ProductImage = {
        id: '123e4567-e89b-1r33-a456-426814174001',
        image: 'https://example.com/image.png',
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: '123e4567-e89b-1r33-a456-426814174001',
      };

      jest.spyOn(prismaService.productImage, 'create').mockResolvedValue(expectedProductImage);

      const result = await service.create(createProductImageDto);

      expect(prismaService.productImage.create).toHaveBeenCalledWith({
        data: createProductImageDto,
      });
      expect(result).toEqual(expectedProductImage);
    });

    it('should throw BadRequestException when create fails', async () => {
      const createProductImageDto: CreateProductImageDto = {
        image: 'https://example.com/image.png',
        productId: '123e4567-e89b-1r33-a456-426814174001',
      };

      jest.spyOn(prismaService.productImage, 'create').mockRejectedValue(new Error());

      await expect(service.create(createProductImageDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of product images', async () => {
      const expectedProductImages: ProductImage[] = [
        {
          id: '123e4567-e89b-1r33-a456-426814174001',
          image: 'https://example.com/image1.png',
          createdAt: new Date(),
          updatedAt: new Date(),
          productId: '123e4567-e89b-1r33-a456-426814174001',
        },
        {
          id: '123e4567-e89b-1r33-a456-426814174002',
          image: 'https://example.com/image2.png',
          createdAt: new Date(),
          updatedAt: new Date(),
          productId: '123e4567-e89b-1r33-a456-426814174002',
        },
      ];

      jest.spyOn(prismaService.productImage, 'findMany').mockResolvedValue(expectedProductImages);

      const result = await service.findAll();

      expect(prismaService.productImage.findMany).toHaveBeenCalled();
      expect(result).toEqual(expectedProductImages);
    });
  });

  describe('findOne', () => {
    it('should return a product image by id', async () => {
      const id = '123e4567-e89b-1r33-a456-426814174001';

      const expectedProductImage: ProductImage = {
        id: '123e4567-e89b-1r33-a456-426814174001',
        image: 'https://example.com/image.png',
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: '123e4567-e89b-1r33-a456-426814174001',
      };

      jest.spyOn(prismaService.productImage, 'findUnique').mockResolvedValue(expectedProductImage);

      const result = await service.findOne(id);

      expect(prismaService.productImage.findUnique).toHaveBeenCalledWith({
        where: {
          id,
        },
      });
      expect(result).toEqual(expectedProductImage);
    });

    it('should throw NotFoundException when product image is not found', async () => {
      const id = '123e4567-e89b-1r33-a456-426814174001';

      jest.spyOn(prismaService.productImage, 'findUnique').mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a product image by id', async () => {
      const id = '123e4567-e89b-1r33-a456-426814174001';
      const updateProductImageDto: UpdateProductImageDto = {
        image: 'https://example.com/new-image.png',
      };

      const expectedProductImage: ProductImage = {
        id: '123e4567-e89b-1r33-a456-426814174001',
        image: 'https://example.com/new-image.png',
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: '123e4567-e89b-1r33-a456-426814174001',
      };

      jest.spyOn(prismaService.productImage, 'update').mockResolvedValue(expectedProductImage);

      const result = await service.update(id, updateProductImageDto);

      expect(prismaService.productImage.update).toHaveBeenCalledWith({
        where: {
          id,
        },
        data: updateProductImageDto,
      });
      expect(result).toEqual(expectedProductImage);
    });

    it('should throw NotFoundException when product image is not found', async () => {
      const id = '123e4567-e89b-1r33-a456-426814174001';
      const updateProductImageDto: UpdateProductImageDto = {
        image: 'https://example.com/new-image.png',
      };

      jest.spyOn(prismaService.productImage, 'update').mockRejectedValue(new Error());

      await expect(service.update(id, updateProductImageDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a product image by id', async () => {
      const id = '123e4567-e89b-1r33-a456-426814174001';

      const expectedProductImage: ProductImage = {
        id: '123e4567-e89b-1r33-a456-426814174001',
        image: 'https://example.com/image.png',
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: '123e4567-e89b-1r33-a456-426814174001',
      };

      jest.spyOn(prismaService.productImage, 'delete').mockResolvedValue(expectedProductImage);

      const result = await service.remove(id);

      expect(prismaService.productImage.delete).toHaveBeenCalledWith({
        where: {
          id,
        },
      });
      expect(result).toEqual(expectedProductImage);
    });

    it('should throw NotFoundException when product image is not found', async () => {
      const id = '123e4567-e89b-1r33-a456-426814174001';

      jest.spyOn(prismaService.productImage, 'delete').mockRejectedValue(new Error());

      await expect(service.remove(id)).rejects.toThrow(NotFoundException);
    });
  });
});
