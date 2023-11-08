import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import BrandModule from './brand/brand.module';
import CategoryModule from './category/category.module';
import CountriesModule from './countries/countries.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../client/dist'),
    }),
    CountriesModule,
    BrandModule,
    CategoryModule,
    BrandModule,
  ],
})
class AppModule {}

export default AppModule;
