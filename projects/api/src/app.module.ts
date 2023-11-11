import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import BrandModule from './brand/brand.module';
import CategoryModule from './category/category.module';
import CountryModule from './country/country.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../client/dist'),
    }),
    CountryModule,
    BrandModule,
    CategoryModule,
  ],
})
class AppModule {}

export default AppModule;
