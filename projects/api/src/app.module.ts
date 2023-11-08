import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import CountriesModule from './countries/countries.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../client/dist'),
    }),
    CountriesModule,
  ],
})
class AppModule {}

export default AppModule;
