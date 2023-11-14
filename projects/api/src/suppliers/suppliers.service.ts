import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import PrismaService from '@/prisma/prisma.service';

import CreateSupplierDto from './dto/create-supplier.dto';
import UpdateSupplierDto from './dto/update-supplier.dto';
import Supplier from './entities/supplier.entity';

@Injectable()
class SuppliersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    try {
      const supplier: Supplier = await this.prisma.supplier.create({
        data: createSupplierDto,
      });
      return supplier;
    } catch (error) {
      if (error?.meta?.target?.includes('email')) {
        throw new BadRequestException('Supplier email already exists');
      }
      throw new BadRequestException('Something went wrong');
    }
  }

  async findAll(): Promise<Supplier[]> {
    const suppliers: Supplier[] = await this.prisma.supplier.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return suppliers;
  }

  async findOne(id: string): Promise<Supplier> {
    const supplier: Supplier = await this.prisma.supplier.findUnique({
      where: {
        id,
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
      });
      return supplier;
    } catch (error) {
      if (error?.meta?.target?.includes('email')) {
        throw new BadRequestException('Supplier email already exists');
      }
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
  }

  async remove(id: string): Promise<Supplier> {
    try {
      const supplier: Supplier = await this.prisma.supplier.delete({
        where: {
          id,
        },
      });
      return supplier;
    } catch (error) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
  }
}

export default SuppliersService;
