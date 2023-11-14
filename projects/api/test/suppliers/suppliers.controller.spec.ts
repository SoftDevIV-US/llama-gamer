import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import CreateSupplierDto from '@/suppliers/dto/create-supplier.dto';
import UpdateSupplierDto from '@/suppliers/dto/update-supplier.dto';
import Supplier from '@/suppliers/entities/supplier.entity';
import SuppliersController from '@/suppliers/suppliers.controller';

import SuppliersService from '../../src/suppliers/suppliers.service';

describe('SuppliersController', () => {
  let suppliersController: SuppliersController;

  const suppliersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuppliersController],
      providers: [
        {
          provide: SuppliersService,
          useValue: suppliersService,
        },
      ],
    }).compile();

    suppliersController = module.get<SuppliersController>(SuppliersController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(suppliersController).toBeDefined();
  });

  describe('create', () => {
    it('should create a supplier', async () => {
      const createSupplierDto: CreateSupplierDto = {
        email: 'lenovo@gmail.com',
        deliveryTime: 5,
        countryId: '123e4567-e89b-12d3-a456-426814172801',
      };
      const createdSupplier: Supplier = {
        id: '1',
        email: 'lenovo@gmail.com',
        deliveryTime: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        countryId: '123e4567-e89b-12d3-a456-426814172801',
      };

      suppliersService.create.mockResolvedValue(createdSupplier);

      const result = await suppliersController.create(createSupplierDto);

      expect(result).toEqual(createdSupplier);
      expect(suppliersService.create).toHaveBeenCalledWith(createSupplierDto);
    });

    it('should not create a supplier with an invalid email', async () => {
      const createSupplierDto: CreateSupplierDto = {
        email: 'lenovo@hola.com',
        deliveryTime: 5,
        countryId: '123e4567-e89b-12d3-a456-426814172801',
      };

      suppliersService.create.mockRejectedValue(new BadRequestException('Invalid email'));

      await expect(suppliersController.create(createSupplierDto)).rejects.toThrow(BadRequestException);
      expect(suppliersService.create).toHaveBeenCalledWith(createSupplierDto);
    });

    it('should handle unexpected errors during creation', async () => {
      const createSupplierDto: CreateSupplierDto = {
        email: 'lenovo@gmail.com',
        deliveryTime: 5,
        countryId: '123e4567-e89b-12d3-a456-426814172801',
      };

      suppliersService.create.mockRejectedValueOnce(new BadRequestException('Something went wrong'));

      await expect(suppliersController.create(createSupplierDto)).rejects.toThrow(BadRequestException);
      expect(suppliersService.create).toHaveBeenCalledWith(createSupplierDto);
    });

    it('should not create a supplier with an empty email', async () => {
      const createSupplierDto: CreateSupplierDto = {
        email: '',
        deliveryTime: 5,
        countryId: '123e4567-e89b-12d3-a456-426814172801',
      };

      await expect(suppliersController.create(createSupplierDto)).rejects.toThrow(BadRequestException);
      expect(suppliersService.create).toHaveBeenCalled();
    });

    it('should not create a supplier with deliveryTime less than 0', async () => {
      const createSupplierDto: CreateSupplierDto = {
        email: 'lenovo@gmail.com',
        deliveryTime: -1,
        countryId: '123e4567-e89b-12d3-a456-426814172801',
      };

      await expect(suppliersController.create(createSupplierDto)).rejects.toThrow(BadRequestException);
      expect(suppliersService.create).toHaveBeenCalled();
    });

    it('should not create a supplier with an empty countryId', async () => {
      const createSupplierDto: CreateSupplierDto = {
        email: 'lenovo@gmail.com',
        deliveryTime: 5,
        countryId: '',
      };

      await expect(suppliersController.create(createSupplierDto)).rejects.toThrow(BadRequestException);
      expect(suppliersService.create).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of suppliers', async () => {
      const expectedSuppliers: Supplier[] = [
        {
          id: '1',
          email: 'asus@gmail.com',
          deliveryTime: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
          countryId: '123e4567-e89b-12d3-a456-426814172810',
        },
        {
          id: '2',
          email: 'toshiba@gmail.com',
          deliveryTime: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
          countryId: '123e4567-e89b-12d3-a456-426814172818',
        },
      ];

      suppliersService.findAll.mockResolvedValue(expectedSuppliers);

      const result = await suppliersController.findAll();

      expect(result).toEqual(expectedSuppliers);
      expect(suppliersService.findAll).toHaveBeenCalledWith();
    });
  });

  describe('findOne', () => {
    it('should return a supplier by ID', async () => {
      const supplierId = '1';
      const expectedSupplier: Supplier = {
        id: supplierId,
        email: 'hp@gmail.com',
        deliveryTime: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
        countryId: '123e4567-e89b-12d3-a456-426814172820',
      };

      suppliersService.findOne.mockResolvedValue(expectedSupplier);

      const result = await suppliersController.findOne(supplierId);

      expect(result).toEqual(expectedSupplier);
      expect(suppliersService.findOne).toHaveBeenCalledWith(supplierId);
    });
  });

  describe('update', () => {
    it('should update a supplier by ID', async () => {
      const supplierId = '1';
      const updateSupplierDto: UpdateSupplierDto = { email: 'dell@gmail.com', deliveryTime: 4 };
      const updatedSupplier: Supplier = {
        id: supplierId,
        email: 'ryzen@gmail.com',
        deliveryTime: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        countryId: '123a4867-e89b-12d3-a456-426814172820',
      };

      suppliersService.update.mockResolvedValue(updatedSupplier);

      const result = await suppliersController.update(supplierId, updateSupplierDto);

      expect(result).toEqual(updatedSupplier);
      expect(suppliersService.update).toHaveBeenCalledWith(supplierId, updateSupplierDto);
    });

    it('should not update a supplier with an invalid email', async () => {
      const supplierId = '1';
      const updateSupplierDto: UpdateSupplierDto = {
        email: 'dell@hithere.com',
        deliveryTime: 4,
      };

      suppliersService.update.mockRejectedValue(new BadRequestException('Invalid email'));

      await expect(suppliersController.update(supplierId, updateSupplierDto)).rejects.toThrow(BadRequestException);
      expect(suppliersService.update).toHaveBeenCalledWith(supplierId, updateSupplierDto);
    });
  });

  describe('remove', () => {
    it('should remove a supplier by ID', async () => {
      const supplierId = '1';
      const deletedSupplier: Supplier = {
        id: supplierId,
        email: 'acer@gmail.com',
        deliveryTime: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
        countryId: '123a4867-e89b-12m8-a456-426814172820',
      };

      suppliersService.remove.mockResolvedValue(deletedSupplier);

      const result = await suppliersController.remove(supplierId);

      expect(result).toEqual(deletedSupplier);
      expect(suppliersService.remove).toHaveBeenCalledWith(supplierId);
    });
  });
});
