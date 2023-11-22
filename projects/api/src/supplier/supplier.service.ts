import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import PrismaService from '@/prisma/prisma.service';

import CreateSupplierDto from './dto/create-supplier.dto';
import UpdateSupplierDto from './dto/update-supplier.dto';
import Supplier from './entities/supplier.entity';

@Injectable()
class SupplierService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    try {
      const supplier: Supplier = await this.prisma.supplier.create({
        data: createSupplierDto,
        include: {
          country: true,
        },
      });
      return supplier;
    } catch (error) {
      if (!error.code) {
        throw new BadRequestException('Something went wrong');
      }
      if (error?.code === 'P2002') {
        throw new BadRequestException('Supplier email already exists');
      }
      if (error?.code === 'P2023') {
        throw new BadRequestException('Country ID not found');
      }
      throw new BadRequestException('Something went wrong');
    }
  }

  async findAll(): Promise<Supplier[]> {
    const suppliers: Supplier[] = await this.prisma.supplier.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        country: true,
      },
    });
    return suppliers;
  }

  async findOne(id: string): Promise<Supplier> {
    const supplier: Supplier = await this.prisma.supplier.findUnique({
      where: {
        id,
      },
      include: {
        country: true,
      },
    });
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
    return supplier;
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto): Promise<Supplier> {
    try {
      const supplier: Supplier = await this.prisma.supplier.update({
        where: {
          id,
        },
        data: updateSupplierDto,
        include: {
          country: true,
        },
      });
      return supplier;
    } catch (error) {
      if (!error.code) {
        throw new BadRequestException('Something went wrong');
      }
      if (error?.code === 'P2002') {
        throw new BadRequestException('Supplier email already exists');
      }
      if (error?.code === 'P2023') {
        throw new BadRequestException('Country ID not found');
      }
      throw new BadRequestException('Something went wrong');
    }
  }

  async remove(id: string): Promise<Supplier> {
    try {
      const supplier: Supplier = await this.prisma.supplier.delete({
        where: {
          id,
        },
        include: {
          country: true,
        },
      });
      return supplier;
    } catch (error) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
  }
}

export default SupplierService;
