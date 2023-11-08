import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Brand } from '@prisma/client';

import BrandService from '@/brand/brand.service';
import CreateBrandDto from '@/brand/dto/create-brand.dto';
import UpdateBrandDto from '@/brand/dto/update-brand.dto';
import PrismaService from '@/prisma/prisma.service';

describe('BrandService', () => {
  let brandService: BrandService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandService, PrismaService],
    }).compile();

    brandService = module.get<BrandService>(BrandService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(brandService).toBeDefined();
  });

  describe('create', () => {
    it('should create a brand', async () => {
      const createBrandDto: CreateBrandDto = { name: 'Test Brand', logo: 'https://test-logo.com/test.png' };
      const createdBrand: Brand = {
        id: '1',
        name: 'Test Brand',
        logo: 'https://test-logo.com/test.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.brand, 'create').mockResolvedValue(createdBrand);

      const result = await brandService.create(createBrandDto);

      expect(result).toEqual(createdBrand);
      expect(prismaService.brand.create).toHaveBeenCalledWith({
        data: createBrandDto,
      });
    });

    it('should handle a duplicate brand name', async () => {
      const createBrandDto: CreateBrandDto = { name: 'Test Brand', logo: 'https://test-logo.com/test.png' };

      jest.spyOn(prismaService.brand, 'create').mockRejectedValue({ meta: { target: ['name'] } });

      await expect(brandService.create(createBrandDto)).rejects.toThrow(BadRequestException);
    });

    it('should handle unexpected errors', async () => {
      const createBrandDto: CreateBrandDto = { name: 'Test Brand', logo: 'https://test-logo.com/test.png' };

      jest.spyOn(prismaService.brand, 'create').mockRejectedValue(new Error('Some unexpected error'));

      await expect(brandService.create(createBrandDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of brands', async () => {
      const expectedBrands: Brand[] = [
        {
          id: '1',
          name: 'Brand 1',
          logo: 'https://test-logo.com/logo-1.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Brand 2',
          logo: 'https://test-logo.com/logo-2.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(prismaService.brand, 'findMany').mockResolvedValue(expectedBrands);

      const result = await brandService.findAll();

      expect(result).toEqual(expectedBrands);
      expect(prismaService.brand.findMany).toHaveBeenCalledWith({
        orderBy: {
          name: 'asc',
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a brand by ID', async () => {
      const brandId = '1';
      const expectedBrand: Brand = {
        id: brandId,
        name: 'Brand 1',
        logo: 'https://test-logo.com/logo-1.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.brand, 'findUnique').mockResolvedValue(expectedBrand);

      const result = await brandService.findOne(brandId);

      expect(result).toEqual(expectedBrand);
      expect(prismaService.brand.findUnique).toHaveBeenCalledWith({
        where: {
          id: brandId,
        },
      });
    });

    it('should handle not found scenario', async () => {
      const brandId = '99';

      jest.spyOn(prismaService.brand, 'findUnique').mockResolvedValue(null);

      await expect(brandService.findOne(brandId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a brand by ID', async () => {
      const brandId = '1';
      const updateBrandDto: UpdateBrandDto = { name: 'Updated Brand', logo: 'https://test-logo.com/updated-logo.png' };
      const updatedBrand: Brand = {
        id: brandId,
        name: 'Updated Brand',
        logo: 'https://test-logo.com/updated-logo.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.brand, 'update').mockResolvedValue(updatedBrand);

      const result = await brandService.update(brandId, updateBrandDto);

      expect(result).toEqual(updatedBrand);
      expect(prismaService.brand.update).toHaveBeenCalledWith({
        where: {
          id: brandId,
        },
        data: updateBrandDto,
      });
    });

    it('should handle a duplicate brand name during update', async () => {
      const brandId = '1';
      const updateBrandDto: UpdateBrandDto = { name: 'Brand 2', logo: 'https://test-logo.com/updated-logo.png' };

      jest.spyOn(prismaService.brand, 'update').mockRejectedValue({ meta: { target: ['name'] } });

      await expect(brandService.update(brandId, updateBrandDto)).rejects.toThrow(BadRequestException);
    });

    it('should handle unexpected errors during update', async () => {
      const brandId = '1';
      const updateBrandDto: UpdateBrandDto = { name: 'Updated Brand', logo: 'https://test-logo.com/updated-logo.png' };

      jest.spyOn(prismaService.brand, 'update').mockRejectedValue(new Error('Some unexpected error'));

      await expect(brandService.update(brandId, updateBrandDto)).rejects.toThrow(BadRequestException);
    });

    it('should handle not found scenario during update', async () => {
      const brandId = '99';
      jest.spyOn(prismaService.brand, 'update').mockRejectedValue({ code: 'P2025' });

      await expect(brandService.update(brandId, {} as UpdateBrandDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a brand by ID', async () => {
      const brandId = '1';
      const deletedBrand: Brand = {
        id: brandId,
        name: 'Deleted Brand',
        logo: 'https://test-logo.com/deleted-logo.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.brand, 'delete').mockResolvedValue(deletedBrand);

      const result = await brandService.remove(brandId);

      expect(result).toEqual(deletedBrand);
      expect(prismaService.brand.delete).toHaveBeenCalledWith({
        where: {
          id: brandId,
        },
      });
    });

    it('should handle unexpected errors during removal', async () => {
      const brandId = '1';

      jest.spyOn(prismaService.brand, 'delete').mockRejectedValue(new Error('Some unexpected error'));

      await expect(brandService.remove(brandId)).rejects.toThrow(BadRequestException);
    });

    it('should handle not found scenario during removal', async () => {
      const brandId = '99';
      jest.spyOn(prismaService.brand, 'delete').mockRejectedValue({ code: 'P2025' });

      await expect(brandService.remove(brandId)).rejects.toThrow(NotFoundException);
    });
  });
});
