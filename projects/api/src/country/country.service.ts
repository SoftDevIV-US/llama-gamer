import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import PrismaService from '@/prisma/prisma.service';

import CreateCountryDto from './dto/create-country.dto';
import UpdateCountryDto from './dto/update-country.dto';
import Country from './entities/country.entity';

@Injectable()
class CountryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCountryDto: CreateCountryDto): Promise<Country> {
    try {
      const country: Country = await this.prisma.country.create({
        data: {
          ...createCountryDto,
        },
      });
      return country;
    } catch (error) {
      if (error?.meta?.target?.includes('name')) {
        throw new BadRequestException('Country name already exists');
      }
      throw new BadRequestException('Something went wrong');
    }
  }

  async findAll(): Promise<Country[]> {
    const countries: Country[] = await this.prisma.country.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return countries;
  }

  async findOne(id: string): Promise<Country> {
    const country: Country = await this.prisma.country.findUnique({
      where: {
        id,
      },
    });
    if (!country) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
    return country;
  }

  async update(id: string, updateCountryDto: UpdateCountryDto): Promise<Country> {
    try {
      const country: Country = await this.prisma.country.update({
        where: {
          id,
        },
        data: updateCountryDto,
      });
      return country;
    } catch (error) {
      if (error?.meta?.target?.includes('name')) {
        throw new BadRequestException('Country name already exists');
      }
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
  }

  async remove(id: string): Promise<Country> {
    try {
      const country: Country = await this.prisma.country.delete({
        where: {
          id,
        },
      });
      return country;
    } catch (error) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
  }
}

export default CountryService;
