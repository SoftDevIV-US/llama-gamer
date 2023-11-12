import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Brand } from '@prisma/client';

import BrandService from '@/brand/brand.service';
import CreateBrandDto from '@/brand/dto/create-brand.dto';
import UpdateBrandDto from '@/brand/dto/update-brand.dto';
import PrismaService from '@/prisma/prisma.service';

describe('BrandService', () => {
  let service: BrandService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandService, PrismaService],
    }).compile();

    service = module.get<BrandService>(BrandService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create a brand', async () => {
      const createBrandDto: CreateBrandDto = {
        name: 'Asus',
        logo: 'https://test-logo.com/test.png',
      };
      const brand: Brand = {
        id: 'd0f02b9c-1d9a-4f1a-9e2a-3d9a3b0c4c7e',
        name: createBrandDto.name,
        logo: createBrandDto.logo,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prismaService.brand, 'create').mockResolvedValueOnce(brand);

      const result = await service.create(createBrandDto);

      expect(prismaService.brand.create).toHaveBeenCalledWith({
        data: createBrandDto,
      });
      expect(result).toEqual(brand);
    });

    it('should throw a BadRequestException if the brand name already exists', async () => {
      const createBrandDto: CreateBrandDto = {
        name: 'Asus',
        logo: 'https://test-logo.com/test.png',
      };
      const error = {
        meta: {
          target: ['name'],
        },
      };
      jest.spyOn(prismaService.brand, 'create').mockRejectedValueOnce(error);

      await expect(service.create(createBrandDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw a BadRequestException if something goes wrong', async () => {
      const createBrandDto: CreateBrandDto = {
        name: 'Asus',
        logo: 'https://test-logo.com/test.png',
      };
      jest.spyOn(prismaService.brand, 'create').mockRejectedValueOnce({});

      await expect(service.create(createBrandDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of brands', async () => {
      const brands: Brand[] = [
        {
          id: 'd0f02b9c-1d9a-4f1a-9e2a-3d9a3b0c4c7e',
          name: 'Asus',
          logo: 'https://test-logo.com/test.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(prismaService.brand, 'findMany').mockResolvedValueOnce(brands);

      const result = await service.findAll();

      expect(prismaService.brand.findMany).toHaveBeenCalledWith({
        orderBy: {
          name: 'desc',
        },
      });
      expect(result).toEqual(brands);
    });
  });

  describe('findOne', () => {
    it('should return a brand', async () => {
      const id = 'd0f02b9c-1d9a-4f1a-9e2a-3d9a3b0c4c7e';
      const brand: Brand = {
        id,
        name: 'Asus',
        logo: 'https://test-logo.com/test.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prismaService.brand, 'findUnique').mockResolvedValueOnce(brand);

      const result = await service.findOne(id);

      expect(prismaService.brand.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(brand);
    });

    it('should throw a NotFoundException if the brand is not found', async () => {
      const id = 'd0f02b9c-1d9a-4f1a-9e2a-3d9a3b0c4c7e';
      jest.spyOn(prismaService.brand, 'findUnique').mockResolvedValueOnce(null);

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a brand', async () => {
      const id = 'd0f02b9c-1d9a-4f1a-9e2a-3d9a3b0c4c7e';
      const updateBrandDto: UpdateBrandDto = {
        name: 'Asus',
        logo: 'https://test-logo.com/test.png',
      };
      const brand: Brand = {
        id,
        name: updateBrandDto.name,
        logo: updateBrandDto.logo,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prismaService.brand, 'update').mockResolvedValueOnce(brand);

      const result = await service.update(id, updateBrandDto);

      expect(prismaService.brand.update).toHaveBeenCalledWith({
        where: { id },
        data: updateBrandDto,
      });
      expect(result).toEqual(brand);
    });

    it('should throw a BadRequestException if the brand name already exists', async () => {
      const id = 'd0f02b9c-1d9a-4f1a-9e2a-3d9a3b0c4c7e';
      const updateBrandDto: UpdateBrandDto = {
        name: 'Asus',
        logo: 'https://test-logo.com/test.png',
      };
      const error = {
        meta: {
          target: ['name'],
        },
      };
      jest.spyOn(prismaService.brand, 'update').mockRejectedValueOnce(error);

      await expect(service.update(id, updateBrandDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw a NotFoundException if the brand is not found', async () => {
      const id = 'd0f02b9c-1d9a-4f1a-9e2a-3d9a3b0c4c7e';
      const updateBrandDto: UpdateBrandDto = {
        name: 'Asus',
        logo: 'https://test-logo.com/test.png',
      };
      jest.spyOn(prismaService.brand, 'update').mockRejectedValueOnce({});

      await expect(service.update(id, updateBrandDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a brand', async () => {
      const id = 'd0f02b9c-1d9a-4f1a-9e2a-3d9a3b0c4c7e';
      const brand: Brand = {
        id,
        name: 'Asus',
        logo: 'https://test-logo.com/test.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prismaService.brand, 'delete').mockResolvedValueOnce(brand);

      const result = await service.remove(id);

      expect(prismaService.brand.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(brand);
    });

    it('should throw a NotFoundException if the brand is not found', async () => {
      const id = 'd0f02b9c-1d9a-4f1a-9e2a-3d9a3b0c4c7e';
      jest.spyOn(prismaService.brand, 'delete').mockRejectedValueOnce({});

      await expect(service.remove(id)).rejects.toThrow(NotFoundException);
    });
  });
});
