import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import CreateSupplierDto from '@/suppliers/dto/create-supplier.dto';
import UpdateSupplierDto from '@/suppliers/dto/update-supplier.dto';
import Supplier from '@/suppliers/entities/supplier.entity';
import SuppliersController from '@/suppliers/suppliers.controller';
import SuppliersService from '@/suppliers/suppliers.service';

describe('SuppliersController', () => {
  let controller: SuppliersController;
  let suppliersService: SuppliersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuppliersController],
      providers: [
        {
          provide: SuppliersService,
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

    controller = module.get<SuppliersController>(SuppliersController);
    suppliersService = module.get<SuppliersService>(SuppliersService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create a supplier', async () => {
      const createSupplierDto: CreateSupplierDto = {
        email: 'test@example.com',
        deliveryTime: 5,
        countryId: '123e4567-e89b-12d3-a456-426814174001',
      };
      const supplier: Supplier = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        deliveryTime: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        countryId: '123e4567-e89b-12d3-a456-426814174001',
        country: {
          id: '123e4567-e89b-12d3-a456-426814174001',
          name: 'United States',
          tax: 0.07,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };
      jest.spyOn(suppliersService, 'create').mockResolvedValue(supplier);

      const result: Supplier = await controller.create(createSupplierDto);

      expect(suppliersService.create).toHaveBeenCalledWith(createSupplierDto);
      expect(result).toEqual(supplier);
    });

    it('should throw a BadRequestException if the email already exists', async () => {
      const createSupplierDto: CreateSupplierDto = {
        email: 'test@example.com',
        deliveryTime: 5,
        countryId: '123e4567-e89b-12d3-a456-426814174001',
      };
      jest.spyOn(suppliersService, 'create').mockRejectedValue(new BadRequestException());

      await expect(controller.create(createSupplierDto)).rejects.toThrow(BadRequestException);
      expect(suppliersService.create).toHaveBeenCalledWith(createSupplierDto);
    });

    it('should throw a BadRequestException if the country ID is not found', async () => {
      const createSupplierDto: CreateSupplierDto = {
        email: 'test@example.com',
        deliveryTime: 5,
        countryId: '123e4567-e89b-12d3-a456-426814174001',
      };

      jest.spyOn(suppliersService, 'create').mockRejectedValue(new BadRequestException());

      await expect(controller.create(createSupplierDto)).rejects.toThrow(BadRequestException);
      expect(suppliersService.create).toHaveBeenCalledWith(createSupplierDto);
    });

    it('should throw a BadRequestException if something else goes wrong', async () => {
      const createSupplierDto: CreateSupplierDto = {
        email: 'test@example.com',
        deliveryTime: 5,
        countryId: '123e4567-e89b-12d3-a456-426814174001',
      };
      const error = new BadRequestException();
      jest.spyOn(suppliersService, 'create').mockRejectedValue(error);

      await expect(controller.create(createSupplierDto)).rejects.toThrow(BadRequestException);
      expect(suppliersService.create).toHaveBeenCalledWith(createSupplierDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of suppliers', async () => {
      const suppliers: Supplier[] = [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          email: 'test1@example.com',
          deliveryTime: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
          countryId: '123e4567-e89b-12d3-a456-426814174001',
          country: {
            id: '123e4567-e89b-12d3-a456-426814174001',
            name: 'United States',
            tax: 0.07,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        {
          id: '123e4567-e89b-12d3-a456-426614174001',
          email: 'test2@example.com',
          deliveryTime: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
          countryId: '123e4567-e89b-12d3-a456-426814174002',
          country: {
            id: '123e4567-e89b-12d3-a456-426814174002',
            name: 'Canada',
            tax: 0.05,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ];
      jest.spyOn(suppliersService, 'findAll').mockResolvedValue(suppliers);

      const result: Supplier[] = await controller.findAll();

      expect(suppliersService.findAll).toHaveBeenCalled();
      expect(result).toEqual(suppliers);
    });
  });

  describe('findOne', () => {
    it('should return a supplier', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const supplier: Supplier = {
        id,
        email: 'test@example.com',
        deliveryTime: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        countryId: '123e4567-e89b-12d3-a456-426814174001',
        country: {
          id: '123e4567-e89b-12d3-a456-426814174001',
          name: 'United States',
          tax: 0.07,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };
      jest.spyOn(suppliersService, 'findOne').mockResolvedValue(supplier);

      const result: Supplier = await controller.findOne(id);

      expect(suppliersService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(supplier);
    });

    it('should throw a NotFoundException if the supplier is not found', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      jest.spyOn(suppliersService, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(id)).rejects.toThrow(NotFoundException);
      expect(suppliersService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a supplier', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const updateSupplierDto: UpdateSupplierDto = {
        email: 'test@example.com',
        deliveryTime: 5,
        countryId: '123e4567-e89b-12d3-a456-426814174001',
      };
      const supplier: Supplier = {
        id,
        email: 'test@example.com',
        deliveryTime: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        countryId: '123e4567-e89b-12d3-a456-426814174001',
        country: {
          id: '123e4567-e89b-12d3-a456-426814174001',
          name: 'United States',
          tax: 0.07,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };
      jest.spyOn(suppliersService, 'update').mockResolvedValue(supplier);

      const result: Supplier = await controller.update(id, updateSupplierDto);

      expect(suppliersService.update).toHaveBeenCalledWith(id, updateSupplierDto);
      expect(result).toEqual(supplier);
    });

    it('should throw a BadRequestException if the email already exists', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const updateSupplierDto: UpdateSupplierDto = {
        email: 'test@example.com',
        deliveryTime: 5,
        countryId: '123e4567-e89b-12d3-a456-426814174001',
      };

      jest.spyOn(suppliersService, 'update').mockRejectedValue(new BadRequestException());

      await expect(controller.update(id, updateSupplierDto)).rejects.toThrow(BadRequestException);
      expect(suppliersService.update).toHaveBeenCalledWith(id, updateSupplierDto);
    });

    it('should throw a BadRequestException if the country ID is not found', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const updateSupplierDto: UpdateSupplierDto = {
        email: 'test@example.com',
        deliveryTime: 5,
        countryId: '123e4567-e89b-12d3-a456-426814174001',
      };

      jest.spyOn(suppliersService, 'update').mockRejectedValue(new BadRequestException());

      await expect(controller.update(id, updateSupplierDto)).rejects.toThrow(BadRequestException);
      expect(suppliersService.update).toHaveBeenCalledWith(id, updateSupplierDto);
    });
  });

  describe('remove', () => {
    it('should remove a supplier', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const supplier: Supplier = {
        id,
        email: 'test@example.com',
        deliveryTime: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        countryId: '123e4567-e89b-12d3-a456-426814174001',
        country: {
          id: '123e4567-e89b-12d3-a456-426814174001',
          name: 'United States',
          tax: 0.07,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };
      jest.spyOn(suppliersService, 'remove').mockResolvedValue(supplier);

      const result: Supplier = await controller.remove(id);

      expect(suppliersService.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(supplier);
    });

    it('should throw a NotFoundException if the supplier is not found', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      jest.spyOn(suppliersService, 'remove').mockRejectedValue(new NotFoundException());

      await expect(controller.remove(id)).rejects.toThrow(NotFoundException);
      expect(suppliersService.remove).toHaveBeenCalledWith(id);
    });
  });
});
