import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import AdminAccess from '@/auth/decorators/admin.decorator';
import AdminGuard from '@/auth/guard/admin.guard';
import JwtAuthGuard from '@/auth/guard/jwt.guard';

import CreateProductsSupplierDto from './dto/create-products-suppliers.dto';
import UpdateProductsSupplierDto from './dto/update-products-suppliers.dto';
import ProductsSuppliers from './entities/products-suppliers.entity';
import ProductsSuppliersService from './products-suppliers.service';

@ApiTags('Products Suppliers')
@Controller('products-suppliers')
class ProductsSuppliersController {
  constructor(private readonly productsSuppliersService: ProductsSuppliersService) {}

  @Post()
  @AdminAccess()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new products supplier' })
  @ApiCreatedResponse({ type: ProductsSuppliers })
  async create(@Body() createProductsSupplierDto: CreateProductsSupplierDto): Promise<ProductsSuppliers> {
    const productsSuppliers: ProductsSuppliers = await this.productsSuppliersService.create(createProductsSupplierDto);
    return productsSuppliers;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all products suppliers' })
  @ApiCreatedResponse({ type: ProductsSuppliers, isArray: true })
  async findAll(): Promise<ProductsSuppliers[]> {
    const productsSuppliers: ProductsSuppliers[] = await this.productsSuppliersService.findAll();
    return productsSuppliers;
  }

  @Get(':productId/:supplierId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a products supplier by id' })
  @ApiCreatedResponse({ type: ProductsSuppliers })
  async findOne(
    @Param('productId') productId: string,
    @Param('supplierId') supplierId: string
  ): Promise<ProductsSuppliers> {
    const productsSuppliers: ProductsSuppliers = await this.productsSuppliersService.findOne(productId, supplierId);
    return productsSuppliers;
  }

  @Patch(':productId/:supplierId')
  @AdminAccess()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a products supplier by id' })
  @ApiCreatedResponse({ type: ProductsSuppliers })
  async update(
    @Param('productId') productId: string,
    @Param('supplierId') supplierId: string,
    @Body() updateProductsSupplierDto: UpdateProductsSupplierDto
  ): Promise<ProductsSuppliers> {
    const productsSuppliers: ProductsSuppliers = await this.productsSuppliersService.update(
      productId,
      supplierId,
      updateProductsSupplierDto
    );
    return productsSuppliers;
  }

  @Delete(':productId/:supplierId')
  @AdminAccess()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a products supplier by id' })
  @ApiCreatedResponse({ type: ProductsSuppliers })
  async remove(
    @Param('productId') productId: string,
    @Param('supplierId') supplierId: string
  ): Promise<ProductsSuppliers> {
    const productsSuppliers: ProductsSuppliers = await this.productsSuppliersService.remove(productId, supplierId);
    return productsSuppliers;
  }
}

export default ProductsSuppliersController;
