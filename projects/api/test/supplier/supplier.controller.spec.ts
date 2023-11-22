import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import CreateSupplierDto from '@/supplier/dto/create-supplier.dto';
import UpdateSupplierDto from '@/supplier/dto/update-supplier.dto';
import Supplier from '@/supplier/entities/supplier.entity';
import SupplierController from '@/supplier/supplier.controller';
import SupplierService from '@/supplier/supplier.service';

describe('SuppliersController', () => {
  let controller: SupplierController;
  let supplierService: SupplierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierController],
      providers: [
        {
          provide: SupplierService,
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

    controller = module.get<SupplierController>(SupplierController);
    supplierService = module.get<SupplierService>(SupplierService);
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
      jest.spyOn(supplierService, 'create').mockResolvedValue(supplier);

      const result: Supplier = await controller.create(createSupplierDto);

      expect(supplierService.create).toHaveBeenCalledWith(createSupplierDto);
      expect(result).toEqual(supplier);
    });

    it('should throw a BadRequestException if the email already exists', async () => {
      const createSupplierDto: CreateSupplierDto = {
        email: 'test@example.com',
        deliveryTime: 5,
        countryId: '123e4567-e89b-12d3-a456-426814174001',
      };
      jest.spyOn(supplierService, 'create').mockRejectedValue(new BadRequestException());

      await expect(controller.create(createSupplierDto)).rejects.toThrow(BadRequestException);
      expect(supplierService.create).toHaveBeenCalledWith(createSupplierDto);
    });

    it('should throw a BadRequestException if the country ID is not found', async () => {
      const createSupplierDto: CreateSupplierDto = {
        email: 'test@example.com',
        deliveryTime: 5,
        countryId: '123e4567-e89b-12d3-a456-426814174001',
      };

      jest.spyOn(supplierService, 'create').mockRejectedValue(new BadRequestException());

      await expect(controller.create(createSupplierDto)).rejects.toThrow(BadRequestException);
      expect(supplierService.create).toHaveBeenCalledWith(createSupplierDto);
    });

    it('should throw a BadRequestException if something else goes wrong', async () => {
      const createSupplierDto: CreateSupplierDto = {
        email: 'test@example.com',
        deliveryTime: 5,
        countryId: '123e4567-e89b-12d3-a456-426814174001',
      };
      const error = new BadRequestException();
      jest.spyOn(supplierService, 'create').mockRejectedValue(error);

      await expect(controller.create(createSupplierDto)).rejects.toThrow(BadRequestException);
      expect(supplierService.create).toHaveBeenCalledWith(createSupplierDto);
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
      jest.spyOn(supplierService, 'findAll').mockResolvedValue(suppliers);

      const result: Supplier[] = await controller.findAll();

      expect(supplierService.findAll).toHaveBeenCalled();
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
      jest.spyOn(supplierService, 'findOne').mockResolvedValue(supplier);

      const result: Supplier = await controller.findOne(id);

      expect(supplierService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(supplier);
    });

    it('should throw a NotFoundException if the supplier is not found', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      jest.spyOn(supplierService, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(id)).rejects.toThrow(NotFoundException);
      expect(supplierService.findOne).toHaveBeenCalledWith(id);
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
      jest.spyOn(supplierService, 'update').mockResolvedValue(supplier);

      const result: Supplier = await controller.update(id, updateSupplierDto);

      expect(supplierService.update).toHaveBeenCalledWith(id, updateSupplierDto);
      expect(result).toEqual(supplier);
    });

    it('should throw a BadRequestException if the email already exists', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const updateSupplierDto: UpdateSupplierDto = {
        email: 'test@example.com',
        deliveryTime: 5,
        countryId: '123e4567-e89b-12d3-a456-426814174001',
      };

      jest.spyOn(supplierService, 'update').mockRejectedValue(new BadRequestException());

      await expect(controller.update(id, updateSupplierDto)).rejects.toThrow(BadRequestException);
      expect(supplierService.update).toHaveBeenCalledWith(id, updateSupplierDto);
    });

    it('should throw a BadRequestException if the country ID is not found', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const updateSupplierDto: UpdateSupplierDto = {
        email: 'test@example.com',
        deliveryTime: 5,
        countryId: '123e4567-e89b-12d3-a456-426814174001',
      };

      jest.spyOn(supplierService, 'update').mockRejectedValue(new BadRequestException());

      await expect(controller.update(id, updateSupplierDto)).rejects.toThrow(BadRequestException);
      expect(supplierService.update).toHaveBeenCalledWith(id, updateSupplierDto);
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
      jest.spyOn(supplierService, 'remove').mockResolvedValue(supplier);

      const result: Supplier = await controller.remove(id);

      expect(supplierService.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(supplier);
    });

    it('should throw a NotFoundException if the supplier is not found', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      jest.spyOn(supplierService, 'remove').mockRejectedValue(new NotFoundException());

      await expect(controller.remove(id)).rejects.toThrow(NotFoundException);
      expect(supplierService.remove).toHaveBeenCalledWith(id);
    });
  });
});
