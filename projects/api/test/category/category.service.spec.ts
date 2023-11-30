import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import CategoryService from '@/category/category.service';
import CreateCategoryDto from '@/category/dto/create-category.dto';
import UpdateCategoryDto from '@/category/dto/update-category.dto';
import Category from '@/category/entities/category.entity';
import PrismaService from '@/prisma/prisma.service';

describe('CategoryService', () => {
  let categoryService: CategoryService;

  const prismaService = {
    category: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
  });

  describe('create', () => {
    it('should create a category', async () => {
      const createCategoryDto: CreateCategoryDto = { name: 'Test Category', image: 'www.image.com' };
      const createdCategory: Category = {
        id: '1',
        name: 'Test Category',
        image: 'www.image.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        products: [],
      };

      prismaService.category.create.mockResolvedValue(createdCategory);

      const result = await categoryService.create(createCategoryDto);

      expect(result).toEqual(createdCategory);
      expect(prismaService.category.create).toHaveBeenCalledWith({
        data: createCategoryDto,
        include: {
          products: {
            orderBy: {
              name: 'asc',
            },
          },
        },
      });
    });

    it('should handle a duplicate category name', async () => {
      const createCategoryDto: CreateCategoryDto = { name: 'Test Category', image: 'www.image.com' };

      prismaService.category.create.mockRejectedValue({ meta: { target: ['name'] } });
      let error;
      try {
        await categoryService.create(createCategoryDto);
      } catch (err) {
        error = err;
      }
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Category name already exists');
      expect(prismaService.category.create).toHaveBeenCalledWith({
        data: createCategoryDto,
        include: {
          products: {
            orderBy: {
              name: 'asc',
            },
          },
        },
      });
    });

    it('should handle unexpected errors', async () => {
      const createCategoryDto: CreateCategoryDto = { name: 'Test Country', image: 'www.image.com' };

      prismaService.category.create.mockRejectedValue(new Error('Some unexpected error'));
      let error;
      try {
        await categoryService.create(createCategoryDto);
      } catch (err) {
        error = err;
      }
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Something went wrong');
      expect(prismaService.category.create).toHaveBeenCalledWith({
        data: createCategoryDto,
        include: {
          products: {
            orderBy: {
              name: 'asc',
            },
          },
        },
      });
    });

    describe('findAll', () => {
      it('should return an array of categories', async () => {
        const expectedCategories: Category[] = [
          {
            id: '1',
            name: 'Category',
            image: 'www.image.com',
            createdAt: new Date(),
            updatedAt: new Date(),
            products: [],
          },
          {
            id: '2',
            name: 'Test Category',
            image: 'www.image.com',
            createdAt: new Date(),
            updatedAt: new Date(),
            products: [],
          },
        ];

        prismaService.category.findMany.mockResolvedValue(expectedCategories);

        const result = await categoryService.findAll();

        expect(result).toEqual(expectedCategories);
        expect(prismaService.category.findMany).toHaveBeenCalledWith({
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            products: {
              orderBy: {
                name: 'asc',
              },
            },
          },
        });
      });
    });

    describe('findOne', () => {
      it('should return a category by ID', async () => {
        const categoryId = '1';
        const expectedCategory: Category = {
          id: categoryId,
          name: 'Category Test',
          image: 'www.image.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          products: [],
        };

        prismaService.category.findUnique.mockResolvedValue(expectedCategory);

        const result = await categoryService.findOne(categoryId);

        expect(result).toEqual(expectedCategory);
        expect(prismaService.category.findUnique).toHaveBeenCalledWith({
          where: {
            id: categoryId,
          },
          include: {
            products: {
              orderBy: {
                name: 'asc',
              },
            },
          },
        });
      });

      it('should handle not found scenario', async () => {
        const countryId = '99';

        prismaService.category.findUnique.mockResolvedValue(null);

        let error;

        try {
          await categoryService.findOne(countryId);
        } catch (err) {
          error = err;
        }

        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(`Category with ID ${countryId} not found`);
        expect(prismaService.category.findUnique).toHaveBeenCalledWith({
          where: {
            id: countryId,
          },
          include: {
            products: {
              orderBy: {
                name: 'asc',
              },
            },
          },
        });
      });
    });

    describe('update', () => {
      it('should update a category by ID', async () => {
        const categoryId = '1';
        const updateCategoryDto: UpdateCategoryDto = { name: 'Updated Category', image: 'www.test.com' };
        const updatedCategory: Category = {
          id: categoryId,
          name: 'Updated Category',
          image: 'www.test.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          products: [],
        };

        prismaService.category.update.mockResolvedValue(updatedCategory);

        const result = await categoryService.update(categoryId, updateCategoryDto);

        expect(result).toEqual(updatedCategory);
        expect(prismaService.category.update).toHaveBeenCalledWith({
          where: {
            id: categoryId,
          },
          data: updateCategoryDto,
          include: {
            products: {
              orderBy: {
                name: 'asc',
              },
            },
          },
        });
      });

      it('should handle a duplicate category name during update', async () => {
        const categoryId = '1';
        const updateCategoryDto: UpdateCategoryDto = { name: 'Category', image: 'www.image.com' };

        prismaService.category.update.mockRejectedValue({ meta: { target: ['name'] } });

        let error;

        try {
          await categoryService.update(categoryId, updateCategoryDto);
        } catch (err) {
          error = err;
        }

        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Category name already exists');
        expect(prismaService.category.update).toHaveBeenCalledWith({
          where: {
            id: categoryId,
          },
          data: updateCategoryDto,
          include: {
            products: {
              orderBy: {
                name: 'asc',
              },
            },
          },
        });
      });

      it('should handle unexpected errors during update', async () => {
        const categoryId = '1';
        const updateCategoryDto: UpdateCategoryDto = { name: 'Updated Category', image: 'www.image.com' };

        prismaService.category.update.mockRejectedValue(new Error('Some unexpected error'));

        let error;

        try {
          await categoryService.update(categoryId, updateCategoryDto);
        } catch (err) {
          error = err;
        }

        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Category with ID 1 not found');
        expect(prismaService.category.update).toHaveBeenCalledWith({
          where: {
            id: categoryId,
          },
          data: updateCategoryDto,
          include: {
            products: {
              orderBy: {
                name: 'asc',
              },
            },
          },
        });
      });
    });

    describe('remove', () => {
      it('should remove a category by ID', async () => {
        const categoryId = '1';
        const deletedCategory: Category = {
          id: categoryId,
          name: 'Deleted Country',
          image: 'www.image.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          products: [],
        };

        prismaService.category.delete.mockResolvedValue(deletedCategory);

        const result = await categoryService.remove(categoryId);

        expect(result).toEqual(deletedCategory);
        expect(prismaService.category.delete).toHaveBeenCalledWith({
          where: {
            id: categoryId,
          },
          include: {
            products: {
              orderBy: {
                name: 'asc',
              },
            },
          },
        });
      });

      it('should handle unexpected errors during removal', async () => {
        const countryId = '1';

        prismaService.category.delete.mockRejectedValue(new Error('Some unexpected error'));

        let error;

        try {
          await categoryService.remove(countryId);
        } catch (err) {
          error = err;
        }

        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Category with ID 1 not found');
        expect(prismaService.category.delete).toHaveBeenCalledWith({
          where: {
            id: countryId,
          },
          include: {
            products: {
              orderBy: {
                name: 'asc',
              },
            },
          },
        });
      });
    });
  });
});
