import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import CreateProductDto from '@/product/dto/create-product.dto';
import UpdateProductDto from '@/product/dto/update-product.dto';
import Product from '@/product/entities/product.entity';
import ProductController from '@/product/product.controller';
import ProductService from '@/product/product.service';

describe('ProductController', () => {
  let controller: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
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
    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Keyboard Red Dragon',
        description: 'The best Keyboard',
        stock: 3,
        price: 50.5,
        categoryId: '213e4567-e89b-12d3-a456-426614174000',
        brandId: '213e4567-e89b-12d3-a456-426614174012',
      };
      const product: Product = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Keyboard Red Dragon',
        description: 'The best Keyboard',
        stock: 3,
        price: 50.5,
        isAvailable: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: '213e4567-e89b-12d3-a456-426614174000',
        category: {
          id: '213e4567-e89b-12d3-a456-426614174000',
          name: 'Keyboard',
          image: 'www.web.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        brandId: '213e4567-e89b-12d3-a456-426614174012',
        brand: {
          id: '213e4567-e89b-12d3-a456-426614174012',
          name: 'Red Dragon',
          logo: 'www.red.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        productImages: [],
        productsSuppliers: [],
      };
      jest.spyOn(productService, 'create').mockResolvedValue(product);

      const result: Product = await controller.create(createProductDto);

      expect(productService.create).toHaveBeenCalledWith(createProductDto);
      expect(result).toEqual(product);
    });

    it('should throw a BadRequestException if something else goes wrong', async () => {
      const createProductDto: CreateProductDto = {
        name: '',
        description: '',
        stock: 0,
        price: 0,
        categoryId: '',
        brandId: '',
      };
      const error = new BadRequestException();
      jest.spyOn(productService, 'create').mockRejectedValue(error);

      await expect(controller.create(createProductDto)).rejects.toThrow(BadRequestException);
      expect(productService.create).toHaveBeenCalledWith(createProductDto);
    });
  });
  describe('findAll', () => {
    it('should return an array of products', async () => {
      const product: Product[] = [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Keyboard Red Dragon',
          description: 'The best Keyboard',
          stock: 3,
          price: 50.5,
          isAvailable: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          categoryId: '213e4567-e89b-12d3-a456-426614174000',
          category: {
            id: '213e4567-e89b-12d3-a456-426614174000',
            name: 'Keyboard',
            image: 'www.web.com',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          brandId: '213e4567-e89b-12d3-a456-426614174012',
          brand: {
            id: '213e4567-e89b-12d3-a456-426614174012',
            name: 'Red Dragon',
            logo: 'www.red.com',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          productImages: [],
          productsSuppliers: [],
        },
        {
          id: '123a4567-e89b-12d3-a456-426614174000',
          name: 'Mouse Red Dragon',
          description: 'The best Mouse',
          stock: 32,
          price: 54.5,
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          categoryId: '214e4567-e89b-12d3-a456-426614174000',
          category: {
            id: '21e4567-e89b-12d3-a456-426614174000',
            name: 'Mouse',
            image: 'www.Mouse.com',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          brandId: '213e4567-e89c-12d3-a456-426614174012',
          brand: {
            id: '213e4567-e89c-12d3-a456-426614174012',
            name: 'Red Dragon',
            logo: 'www.redMouse.com',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          productImages: [],
          productsSuppliers: [],
        },
      ];
      jest.spyOn(productService, 'findAll').mockResolvedValue(product);

      const result: Product[] = await controller.findAll();

      expect(productService.findAll).toHaveBeenCalled();
      expect(result).toEqual(product);
    });
  });
  describe('findOne', () => {
    it('should return a product', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const product: Product = {
        id: '123a4567-e89b-12d3-a456-426614174000',
        name: 'Mouse Red Dragon',
        description: 'The best Mouse',
        stock: 32,
        price: 54.5,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: '214e4567-e89b-12d3-a456-426614174000',
        category: {
          id: '21e4567-e89b-12d3-a456-426614174000',
          name: 'Mouse',
          image: 'www.Mouse.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        brandId: '213e4567-e89c-12d3-a456-426614174012',
        brand: {
          id: '213e4567-e89c-12d3-a456-426614174012',
          name: 'Red Dragon',
          logo: 'www.redMouse.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        productImages: [],
        productsSuppliers: [],
      };
      jest.spyOn(productService, 'findOne').mockResolvedValue(product);

      const result: Product = await controller.findOne(id);

      expect(productService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(product);
    });

    it('should throw a NotFoundException if the product is not found', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      jest.spyOn(productService, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(id)).rejects.toThrow(NotFoundException);
      expect(productService.findOne).toHaveBeenCalledWith(id);
    });
  });
  describe('update', () => {
    it('should update a product', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const updateProductDto: UpdateProductDto = {
        name: 'Keyboard Red Dragon',
        description: 'The best Keyboard',
        stock: 3,
        price: 50.5,
        categoryId: '213e4567-e89b-12d3-a456-426614174000',
        brandId: '213e4567-e89b-12d3-a456-426614174012',
      };
      const product: Product = {
        id: '',
        name: '',
        description: '',
        stock: 0,
        price: 0,
        isAvailable: false,
        createdAt: undefined,
        updatedAt: undefined,
        categoryId: '',
        category: {
          id: '',
          name: '',
          image: '',
          createdAt: undefined,
          updatedAt: undefined,
        },
        brandId: '',
        brand: {
          id: '',
          name: '',
          logo: '',
          createdAt: undefined,
          updatedAt: undefined,
        },
        productImages: [],
        productsSuppliers: [],
      };
      jest.spyOn(productService, 'update').mockResolvedValue(product);

      const result: Product = await controller.update(id, updateProductDto);

      expect(productService.update).toHaveBeenCalledWith(id, updateProductDto);
      expect(result).toEqual(product);
    });
  });
  describe('remove', () => {
    it('should remove a product', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const product: Product = {
        id,
        name: 'Keyboard Red Dragon',
        description: 'The best Keyboard',
        stock: 3,
        price: 50.5,
        isAvailable: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: '213e4567-e89b-12d3-a456-426614174000',
        category: {
          id: '213e4567-e89b-12d3-a456-426614174000',
          name: 'Keyboard',
          image: 'www.web.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        brandId: '213e4567-e89b-12d3-a456-426614174012',
        brand: {
          id: '213e4567-e89b-12d3-a456-426614174012',
          name: 'Red Dragon',
          logo: 'www.red.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        productImages: [],
        productsSuppliers: [],
      };
      jest.spyOn(productService, 'remove').mockResolvedValue(product);

      const result: Product = await controller.remove(id);

      expect(productService.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(product);
    });

    it('should throw a NotFoundException if the product is not found', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      jest.spyOn(productService, 'remove').mockRejectedValue(new NotFoundException());

      await expect(controller.remove(id)).rejects.toThrow(NotFoundException);
      expect(productService.remove).toHaveBeenCalledWith(id);
    });
  });
});
