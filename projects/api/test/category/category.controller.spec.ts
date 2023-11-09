import { Test, TestingModule } from '@nestjs/testing';

import CategoryController from '@/category/category.controller';
import CategoryService from '@/category/category.service';
import CreateCategoryDto from '@/category/dto/create-category.dto';
import UpdateCategoryDto from '@/category/dto/update-category.dto';
import Category from '@/category/entities/category.entity';

describe('CategoryController', () => {
  let categoriesController: CategoryController;

  const categoryService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: categoryService,
        },
      ],
    }).compile();

    categoriesController = module.get<CategoryController>(CategoryController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be define', () => {
    expect(categoriesController).toBeDefined();
  });

  describe('create', () => {
    it('should create a category', async () => {
      const createCategoryDto: CreateCategoryDto = { name: 'Test Category', image: 'wwww.testImage.com' };
      const createdCategory: Category = {
        id: '1',
        name: 'Test Category',
        image: 'wwww.testImage.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      categoryService.create.mockResolvedValue(createdCategory);

      const result = await categoriesController.create(createCategoryDto);

      expect(result).toEqual(createdCategory);
      expect(categoryService.create).toHaveBeenCalledWith(createCategoryDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const expectedCategories: Category[] = [
        {
          id: '1',
          name: 'Test Category',
          image: 'www.testImage.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Category',
          image: 'www.testImage.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      categoryService.findAll.mockResolvedValue(expectedCategories);

      const result = await categoriesController.findAll();

      expect(result).toEqual(expectedCategories);
      expect(categoryService.findAll).toHaveBeenCalledWith();
    });
  });

  describe('findOne', () => {
    it('should return a category by ID', async () => {
      const categoryId = '1';
      const expectedCategory: Category = {
        id: categoryId,
        name: 'Category',
        image: 'www.testImage.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      categoryService.findOne.mockResolvedValue(expectedCategory);

      const result = await categoriesController.findOne(categoryId);

      expect(result).toEqual(expectedCategory);
      expect(categoryService.findOne).toHaveBeenCalledWith(categoryId);
    });
  });

  describe('update', () => {
    it('should update a category by ID', async () => {
      const categoryId = '1';
      const updateCategoryDto: UpdateCategoryDto = { name: 'Updated Category', image: 'www.category.com' };
      const updatedCategory: Category = {
        id: categoryId,
        name: 'Updated Category',
        image: 'www.category.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      categoryService.update.mockResolvedValue(updatedCategory);

      const result = await categoriesController.update(categoryId, updateCategoryDto);

      expect(result).toEqual(updatedCategory);
      expect(categoryService.update).toHaveBeenCalledWith(categoryId, updateCategoryDto);
    });
  });

  describe('remove', () => {
    it('should remove a category by ID', async () => {
      const categoryId = '1';
      const deletedCategory: Category = {
        id: categoryId,
        name: 'Deleted Category',
        image: 'www.image.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      categoryService.remove.mockResolvedValue(deletedCategory);

      const result = await categoriesController.remove(categoryId);

      expect(result).toEqual(deletedCategory);
      expect(categoryService.remove).toHaveBeenCalledWith(categoryId);
    });
  });
});
