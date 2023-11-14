import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import PrismaService from '@/prisma/prisma.service';
import CreateSupplierDto from '@/suppliers/dto/create-supplier.dto';
import UpdateSupplierDto from '@/suppliers/dto/update-supplier.dto';
import Supplier from '@/suppliers/entities/supplier.entity';
import SuppliersService from '@/suppliers/suppliers.service';

describe('SuppliersService', () => {
  let suppliersService: SuppliersService;

  const prismaService = {
    supplier: {
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
        SuppliersService,
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
    }).compile();

    suppliersService = module.get<SuppliersService>(SuppliersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(suppliersService).toBeDefined();
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

      prismaService.supplier.create.mockResolvedValue(createdSupplier);

      const result = await suppliersService.create(createSupplierDto);

      expect(result).toEqual(createdSupplier);
      expect(prismaService.supplier.create).toHaveBeenCalledWith({
        data: createSupplierDto,
      });
    });

    it('should handle a duplicate supplier email', async () => {
      const createSupplierDto: CreateSupplierDto = {
        email: 'lenovo@gmail.com',
        deliveryTime: 2,
        countryId: '123e4567-e89b-12d3-af56-426814172801',
      };

      prismaService.supplier.create.mockRejectedValue({ meta: { target: ['email'] } });
      let error;
      try {
        await suppliersService.create(createSupplierDto);
      } catch (err) {
        error = err;
      }
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Supplier email already exists');
      expect(prismaService.supplier.create).toHaveBeenCalledWith({
        data: createSupplierDto,
      });
    });

    it('should handle unexpected errors', async () => {
      const createSupplierDto: CreateSupplierDto = {
        email: 'ryzen@gmail.com',
        deliveryTime: 4,
        countryId: '123e4567-e89b-12d3-af56-426814172109',
      };

      prismaService.supplier.create.mockRejectedValue(new BadRequestException('Some unexpected error'));
      let error;
      try {
        await suppliersService.create(createSupplierDto);
      } catch (err) {
        error = err;
      }
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Something went wrong');
      expect(prismaService.supplier.create).toHaveBeenCalledWith({
        data: createSupplierDto,
      });
    });

    it('should handle missing email during create', async () => {
      const createSupplierDto: CreateSupplierDto = {
        email: '',
        deliveryTime: 5,
        countryId: '123e4567-e89b-12d3-a456-426814172801',
      };

      let error;

      try {
        await suppliersService.create(createSupplierDto);
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('The supplier email must not be empty');
      expect(prismaService.supplier.create).toHaveBeenCalled();
    });

    it('should handle missing countryId during create', async () => {
      const createSupplierDto: CreateSupplierDto = {
        email: 'lenovo@gmail.com',
        deliveryTime: 5,
        countryId: '',
      };

      let error;

      try {
        await suppliersService.create(createSupplierDto);
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('The supplier country ID must not be empty');
      expect(prismaService.supplier.create).toHaveBeenCalled();
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

      prismaService.supplier.findMany.mockResolvedValue(expectedSuppliers);

      const result = await suppliersService.findAll();

      expect(result).toEqual(expectedSuppliers);
      expect(prismaService.supplier.findMany).toHaveBeenCalledWith({
        orderBy: {
          createdAt: 'asc',
        },
      });
    });

    it('should handle unexpected errors during findMany', async () => {
      prismaService.supplier.findMany.mockRejectedValue(new BadRequestException('Some unexpected error'));

      let error;

      try {
        await suppliersService.findAll();
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Something went wrong');
      expect(prismaService.supplier.findMany).toHaveBeenCalledWith({
        orderBy: {
          createdAt: 'asc',
        },
      });
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

      prismaService.supplier.findUnique.mockResolvedValue(expectedSupplier);

      const result = await suppliersService.findOne(supplierId);

      expect(result).toEqual(expectedSupplier);
      expect(prismaService.supplier.findUnique).toHaveBeenCalledWith({
        where: {
          id: supplierId,
        },
      });
    });

    it('should handle not found scenario', async () => {
      const supplierId = '98';

      prismaService.supplier.findUnique.mockResolvedValue(null);

      let error;

      try {
        await suppliersService.findOne(supplierId);
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe(`Supplier with ID ${supplierId} not found`);
      expect(prismaService.supplier.findUnique).toHaveBeenCalledWith({
        where: {
          id: supplierId,
        },
      });
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

      prismaService.supplier.update.mockResolvedValue(updatedSupplier);

      const result = await suppliersService.update(supplierId, updateSupplierDto);

      expect(result).toEqual(updatedSupplier);
      expect(prismaService.supplier.update).toHaveBeenCalledWith({
        where: {
          id: supplierId,
        },
        data: updateSupplierDto,
      });
    });

    it('should handle a duplicate supplier email during update', async () => {
      const supplierId = '1';
      const updateSupplierDto: UpdateSupplierDto = { email: 'dell@gmail.com', deliveryTime: 4 };

      prismaService.supplier.update.mockRejectedValue({ meta: { target: ['email'] } });

      let error;

      try {
        await suppliersService.update(supplierId, updateSupplierDto);
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Supplier email already exists');
      expect(prismaService.supplier.update).toHaveBeenCalledWith({
        where: {
          id: supplierId,
        },
        data: updateSupplierDto,
      });
    });

    it('should handle unexpected errors during update', async () => {
      const supplierId = '1';
      const updateSupplierDto: UpdateSupplierDto = { email: 'dell@gmail.com', deliveryTime: 4 };

      prismaService.supplier.update.mockRejectedValue(new Error('Some unexpected error'));

      let error;

      try {
        await suppliersService.update(supplierId, updateSupplierDto);
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Supplier with ID 1 not found');
      expect(prismaService.supplier.update).toHaveBeenCalledWith({
        where: {
          id: supplierId,
        },
        data: updateSupplierDto,
      });
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

      prismaService.supplier.delete.mockResolvedValue(deletedSupplier);

      const result = await suppliersService.remove(supplierId);

      expect(result).toEqual(deletedSupplier);
      expect(prismaService.supplier.delete).toHaveBeenCalledWith({
        where: {
          id: supplierId,
        },
      });
    });

    it('should handle unexpected errors during removal', async () => {
      const supplierId = '1';

      prismaService.supplier.delete.mockRejectedValue(new Error('Some unexpected error'));

      let error;

      try {
        await suppliersService.remove(supplierId);
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Supplier with ID 1 not found');
      expect(prismaService.supplier.delete).toHaveBeenCalledWith({
        where: {
          id: supplierId,
        },
      });
    });
  });
});
