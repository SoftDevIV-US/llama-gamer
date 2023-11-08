import { Module } from '@nestjs/common';

import PrismaService from '@/prisma/prisma.service';

import CountriesController from './countries.controller';
import CountriesService from './countries.service';

@Module({
  controllers: [CountriesController],
  providers: [CountriesService, PrismaService],
})
class CountriesModule {}

export default CountriesModule;
