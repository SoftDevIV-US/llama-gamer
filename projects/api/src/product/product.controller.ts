import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import AdminAccess from '@/auth/decorators/admin.decorator';
import AdminGuard from '@/auth/guard/admin.guard';
import JwtAuthGuard from '@/auth/guard/jwt.guard';
import CreateProductImageDto from '@/product-image/dto/create-product-image.dto';
import ProductImageService from '@/product-image/product-image.service';
import CreateProductsSuppliersDto from '@/products-suppliers/dto/create-products-suppliers.dto';
import ProductsSuppliersService from '@/products-suppliers/products-suppliers.service';

import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';
import Product from './entities/product.entity';
import ProductService from './product.service';

@Controller('product')
@ApiTags('Product')
class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productSupplierService: ProductsSuppliersService,
    private readonly productImageService: ProductImageService
  ) {}

  @Post()
  @AdminAccess()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new Product' })
  @ApiCreatedResponse({ type: Product })
  async create(@Body() createProductForm): Promise<Product> {
    const createProductDto: CreateProductDto = {
      name: createProductForm.name,
      description: createProductForm.description,
      stock: createProductForm.stock,
      price: createProductForm.price,
      categoryId: createProductForm.categoryId,
      brandId: createProductForm.brandId,
    };
    const createSupplierIds = createProductForm.supplierIds;
    const createProductImages = createProductForm.productImages;
    const product: Product = await this.productService.create(createProductDto);
    createSupplierIds.forEach(async (element) => {
      const cpsdto: CreateProductsSuppliersDto = {
        productId: product.id,
        supplierId: element,
      };
      await this.productSupplierService.create(cpsdto);
    });
    createProductImages.forEach(async (element) => {
      const cpidto: CreateProductImageDto = {
        productId: product.id,
        image: element,
      };
      await this.productImageService.create(cpidto);
    });
    return product;
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiCreatedResponse({ type: Product, isArray: true })
  async findAll(): Promise<Product[]> {
    const product: Product[] = await this.productService.findAll();
    return product;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id' })
  @ApiCreatedResponse({ type: Product })
  async findOne(@Param('id') id: string): Promise<Product> {
    const product: Product = await this.productService.findOne(id);
    return product;
  }

  @Patch(':id')
  @AdminAccess()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a product by id' })
  @ApiCreatedResponse({ type: Product })
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    const product: Product = await this.productService.update(id, updateProductDto);
    return product;
  }

  @Delete(':id')
  @AdminAccess()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a product by id' })
  @ApiCreatedResponse({ type: Product })
  async remove(@Param('id') id: string): Promise<Product> {
    const product: Product = await this.productService.remove(id);
    return product;
  }
}
export default ProductController;
