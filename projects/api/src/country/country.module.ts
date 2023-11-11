import { Module } from '@nestjs/common';

import PrismaService from '@/prisma/prisma.service';

import CountryController from './country.controller';
import CountryService from './country.service';

@Module({
  controllers: [CountryController],
  providers: [CountryService, PrismaService],
})
class CountryModule {}

export default CountryModule;
