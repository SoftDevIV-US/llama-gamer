/* eslint-disable simple-import-sort/imports */
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import AuthModule from './auth/auth.module';
import BrandModule from './brand/brand.module';
import CategoryModule from './category/category.module';
import CountryModule from './country/country.module';
import ProductImageModule from './product-image/product-image.module';
import ProductModule from './product/product.module';
import ProductsSuppliersModule from './products-suppliers/products-suppliers.module';
import SupplierModule from './supplier/supplier.module';
import UserModule from './user/user.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../client/dist'),
    }),
    AuthModule,
    UserModule,
    CountryModule,
    SupplierModule,
    BrandModule,
    CategoryModule,
    ProductModule,
    ProductImageModule,
    ProductsSuppliersModule,
  ],
})
class AppModule {}

export default AppModule;
