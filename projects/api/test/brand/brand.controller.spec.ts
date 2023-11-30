import { Test, TestingModule } from '@nestjs/testing';

import BrandController from '@/brand/brand.controller';
import BrandService from '@/brand/brand.service';
import CreateBrandDto from '@/brand/dto/create-brand.dto';
import UpdateBrandDto from '@/brand/dto/update-brand.dto';
import Brand from '@/brand/entities/brand.entity';
import PrismaService from '@/prisma/prisma.service';

describe('BrandController', () => {
  let brandController: BrandController;
  let brandService: BrandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandController],
      providers: [BrandService, PrismaService],
    }).compile();

    brandController = module.get<BrandController>(BrandController);
    brandService = module.get<BrandService>(BrandService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(brandController).toBeDefined();
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
        products: [],
      };

      jest.spyOn(brandService, 'create').mockResolvedValue(createdBrand);

      const result = await brandController.create(createBrandDto);

      expect(result).toEqual(createdBrand);
      expect(brandService.create).toHaveBeenCalledWith(createBrandDto);
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
          products: [],
        },
        {
          id: '2',
          name: 'Brand 2',
          logo: 'https://test-logo.com/logo-2.png',
          createdAt: new Date(),
          updatedAt: new Date(),
          products: [],
        },
      ];

      jest.spyOn(brandService, 'findAll').mockResolvedValue(expectedBrands);

      const result = await brandController.findAll();

      expect(result).toEqual(expectedBrands);
      expect(brandService.findAll).toHaveBeenCalled();
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
        products: [],
      };

      jest.spyOn(brandService, 'findOne').mockResolvedValue(expectedBrand);

      const result = await brandController.findOne(brandId);

      expect(result).toEqual(expectedBrand);
      expect(brandService.findOne).toHaveBeenCalledWith(brandId);
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
        products: [],
      };

      jest.spyOn(brandService, 'update').mockResolvedValue(updatedBrand);

      const result = await brandController.update(brandId, updateBrandDto);

      expect(result).toEqual(updatedBrand);
      expect(brandService.update).toHaveBeenCalledWith(brandId, updateBrandDto);
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
        products: [],
      };

      jest.spyOn(brandService, 'remove').mockResolvedValue(deletedBrand);

      const result = await brandController.remove(brandId);

      expect(result).toEqual(deletedBrand);
      expect(brandService.remove).toHaveBeenCalledWith(brandId);
    });
  });
});
