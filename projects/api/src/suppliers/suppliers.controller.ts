import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import CreateSupplierDto from './dto/create-supplier.dto';
import UpdateSupplierDto from './dto/update-supplier.dto';
import Supplier from './entities/supplier.entity';
import SuppliersService from './suppliers.service';

@Controller('suppliers')
@ApiTags('Suppliers')
class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new supplier' })
  @ApiCreatedResponse({ type: Supplier })
  async create(@Body() createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const supplier: Supplier = await this.suppliersService.create(createSupplierDto);
    return supplier;
  }

  @Get()
  @ApiOperation({ summary: 'Get all suppliers' })
  @ApiCreatedResponse({ type: Supplier, isArray: true })
  async findAll(): Promise<Supplier[]> {
    const suppliers: Supplier[] = await this.suppliersService.findAll();
    return suppliers;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a supplier by id' })
  @ApiCreatedResponse({ type: Supplier })
  async findOne(@Param('id') id: string): Promise<Supplier> {
    const supplier: Supplier = await this.suppliersService.findOne(id);
    return supplier;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a supplier by id' })
  @ApiCreatedResponse({ type: Supplier })
  async update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto): Promise<Supplier> {
    const supplier: Supplier = await this.suppliersService.update(id, updateSupplierDto);
    return supplier;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a supplier by id' })
  @ApiCreatedResponse({ type: Supplier })
  async remove(@Param('id') id: string): Promise<Supplier> {
    const supplier: Supplier = await this.suppliersService.remove(id);
    return supplier;
  }
}

export default SuppliersController;
