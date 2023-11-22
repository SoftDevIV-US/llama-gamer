import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import PrismaService from '@/prisma/prisma.service';
import CreateSupplierDto from '@/supplier/dto/create-supplier.dto';
import UpdateSupplierDto from '@/supplier/dto/update-supplier.dto';
import Supplier from '@/supplier/entities/supplier.entity';
import SupplierService from '@/supplier/supplier.service';

describe('SuppliersService', () => {
  let service: SupplierService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupplierService,
        {
          provide: PrismaService,
          useValue: {
            supplier: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<SupplierService>(SupplierService);
    prismaService = module.get<PrismaService>(PrismaService);
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
      jest.spyOn(prismaService.supplier, 'create').mockResolvedValue(supplier);

      const result: Supplier = await service.create(createSupplierDto);

      expect(prismaService.supplier.create).toHaveBeenCalledWith({
        data: createSupplierDto,
        include: {
          country: true,
        },
      });
      expect(result).toEqual(supplier);
    });

    it('should throw a BadRequestException if the email already exists', async () => {
      const createSupplierDto: CreateSupplierDto = {
        email: 'test@example.com',
        deliveryTime: 5,
        countryId: '123e4567-e89b-12d3-a456-426814174001',
      };
      const error = {
        code: 'P2002',
      };
      jest.spyOn(prismaService.supplier, 'create').mockRejectedValue(error);

      await expect(service.create(createSupplierDto)).rejects.toThrow(BadRequestException);
      expect(prismaService.supplier.create).toHaveBeenCalledWith({
        data: createSupplierDto,
        include: {
          country: true,
        },
      });
    });

    it('should throw a BadRequestException if the country ID is not found', async () => {
      const createSupplierDto: CreateSupplierDto = {
        email: 'test@example.com',
        deliveryTime: 5,
        countryId: '123e4567-e89b-12d3-a456-426814174001',
      };
      const error = {
        code: 'P2023',
      };
      jest.spyOn(prismaService.supplier, 'create').mockRejectedValue(error);

      await expect(service.create(createSupplierDto)).rejects.toThrow();
      expect(prismaService.supplier.create).toHaveBeenCalledWith({
        data: createSupplierDto,
        include: {
          country: true,
        },
      });
    });

    it('should throw a BadRequestException if something else goes wrong', async () => {
      const createSupplierDto: CreateSupplierDto = {
        email: 'test@example.com',
        deliveryTime: 5,
        countryId: '123e4567-e89b-12d3-a456-426814174001',
      };
      const error = new Error();
      jest.spyOn(prismaService.supplier, 'create').mockRejectedValue(error);

      await expect(service.create(createSupplierDto)).rejects.toThrow(BadRequestException);
      expect(prismaService.supplier.create).toHaveBeenCalledWith({
        data: createSupplierDto,
        include: {
          country: true,
        },
      });
    });

    it('should throw a BadRequestException if the delivery time is negative', async () => {
      const createSupplierDto: CreateSupplierDto = {
        email: 'test@example.com',
        deliveryTime: -5,
        countryId: '123e4567-e89b-12d3-a456-426814174001',
      };

      jest.spyOn(prismaService.supplier, 'create').mockRejectedValue(new BadRequestException());
      await expect(service.create(createSupplierDto)).rejects.toThrow(BadRequestException);
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
      jest.spyOn(prismaService.supplier, 'findMany').mockResolvedValue(suppliers);

      const result: Supplier[] = await service.findAll();

      expect(prismaService.supplier.findMany).toHaveBeenCalledWith({
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          country: true,
        },
      });
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
      jest.spyOn(prismaService.supplier, 'findUnique').mockResolvedValue(supplier);

      const result: Supplier = await service.findOne(id);

      expect(prismaService.supplier.findUnique).toHaveBeenCalledWith({
        where: {
          id,
        },
        include: {
          country: true,
        },
      });
      expect(result).toEqual(supplier);
    });

    it('should throw a NotFoundException if the supplier is not found', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174900';
      const error = {
        code: 'P2023',
      };
      jest.spyOn(prismaService.supplier, 'findUnique').mockRejectedValue(error);

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
      expect(prismaService.supplier.findUnique).toHaveBeenCalledWith({
        where: {
          id,
        },
        include: {
          country: true,
        },
      });
    });

    it('should throw a NotFoundException if the id is not a valid UUID', async () => {
      const id = 'invalid-id';
      const error = {
        code: 'P2023',
      };
      jest.spyOn(prismaService.supplier, 'findUnique').mockRejectedValue(error);
      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
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
      jest.spyOn(prismaService.supplier, 'update').mockResolvedValue(supplier);

      const result: Supplier = await service.update(id, updateSupplierDto);

      expect(prismaService.supplier.update).toHaveBeenCalledWith({
        where: {
          id,
        },
        data: updateSupplierDto,
        include: {
          country: true,
        },
      });
      expect(result).toEqual(supplier);
    });

    it('should throw a BadRequestException if the email already exists', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const updateSupplierDto: UpdateSupplierDto = {
        email: 'test@example.com',
        deliveryTime: 5,
        countryId: '123e4567-e89b-12d3-a456-426814174001',
      };
      const error = {
        code: 'P2002',
      };
      jest.spyOn(prismaService.supplier, 'update').mockRejectedValue(error);

      await expect(service.update(id, updateSupplierDto)).rejects.toThrow(BadRequestException);
      expect(prismaService.supplier.update).toHaveBeenCalledWith({
        where: {
          id,
        },
        data: updateSupplierDto,
        include: {
          country: true,
        },
      });
    });

    it('should throw a BadRequestException if the country ID is not found', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const updateSupplierDto: UpdateSupplierDto = {
        email: 'test@example.com',
        deliveryTime: 5,
        countryId: '123e4567-e89b-12d3-a456-426814174001',
      };
      const error = {
        code: 'P2023',
      };
      jest.spyOn(prismaService.supplier, 'update').mockRejectedValue(error);

      await expect(service.update(id, updateSupplierDto)).rejects.toThrow(BadRequestException);
      expect(prismaService.supplier.update).toHaveBeenCalledWith({
        where: {
          id,
        },
        data: updateSupplierDto,
        include: {
          country: true,
        },
      });
    });

    it('should throw a BadRequestException if something else goes wrong', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const updateSupplierDto: UpdateSupplierDto = {
        email: 'test@example.com',
        deliveryTime: 5,
        countryId: '123e4567-e89b-12d3-a456-426814174001',
      };
      const error = new Error();
      jest.spyOn(prismaService.supplier, 'update').mockRejectedValue(error);

      await expect(service.update(id, updateSupplierDto)).rejects.toThrow(BadRequestException);
      expect(prismaService.supplier.update).toHaveBeenCalledWith({
        where: {
          id,
        },
        data: updateSupplierDto,
        include: {
          country: true,
        },
      });
    });

    it('should throw a BadRequestException if the delivery time is negative', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const updateSupplierDto: UpdateSupplierDto = {
        email: 'test@example.com',
        deliveryTime: -5,
        countryId: '123e4567-e89b-12d3-a456-426814174001',
      };

      jest.spyOn(prismaService.supplier, 'update').mockRejectedValue(new BadRequestException());
      await expect(service.update(id, updateSupplierDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw a BadRequestException if the id is not a valid UUID', async () => {
      const id = 'invalid-id';
      const updateSupplierDto: UpdateSupplierDto = {
        email: 'test@example.com',
        deliveryTime: 5,
        countryId: '123e4567-e89b-12d3-a456-426814174001',
      };

      jest.spyOn(prismaService.supplier, 'update').mockRejectedValue(new BadRequestException());
      await expect(service.update(id, updateSupplierDto)).rejects.toThrow(BadRequestException);
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
      jest.spyOn(prismaService.supplier, 'delete').mockResolvedValue(supplier);

      const result: Supplier = await service.remove(id);

      expect(prismaService.supplier.delete).toHaveBeenCalledWith({
        where: {
          id,
        },
        include: {
          country: true,
        },
      });
      expect(result).toEqual(supplier);
    });

    it('should throw a NotFoundException if the supplier is not found', async () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      jest.spyOn(prismaService.supplier, 'delete').mockRejectedValue(new Error());

      await expect(service.remove(id)).rejects.toThrow(NotFoundException);
      expect(prismaService.supplier.delete).toHaveBeenCalledWith({
        where: {
          id,
        },
        include: {
          country: true,
        },
      });
    });

    it('should throw a NotFoundException if the id is not a valid UUID', async () => {
      const id = 'invalid-id';

      jest.spyOn(prismaService.supplier, 'delete').mockRejectedValue(new BadRequestException());
      await expect(service.remove(id)).rejects.toThrow(NotFoundException);
    });
  });
});
