import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';
import Product from './entities/product.entity';
import ProductService from './product.service';

@Controller('product')
@ApiTags('Product')
class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Product' })
  @ApiCreatedResponse({ type: Product })
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    const product: Product = await this.productService.create(createProductDto);
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
  @ApiOperation({ summary: 'Update a product by id' })
  @ApiCreatedResponse({ type: Product })
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    const product: Product = await this.productService.update(id, updateProductDto);
    return product;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by id' })
  @ApiCreatedResponse({ type: Product })
  async remove(@Param('id') id: string): Promise<Product> {
    const product: Product = await this.productService.remove(id);
    return product;
  }
}
export default ProductController;
