import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import AdminAccess from '@/auth/decorators/admin.decorator';
import AdminGuard from '@/auth/guard/admin.guard';
import JwtAuthGuard from '@/auth/guard/jwt.guard';

import CountryService from './country.service';
import CreateCountryDto from './dto/create-country.dto';
import UpdateCountryDto from './dto/update-country.dto';
import Country from './entities/country.entity';

@Controller('countries')
@ApiTags('Countries')
class CountryController {
  constructor(private readonly countriesService: CountryService) {}

  @Post()
  @AdminAccess()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new country' })
  @ApiCreatedResponse({ type: Country })
  async create(@Body() createCountryDto: CreateCountryDto): Promise<Country> {
    const country: Country = await this.countriesService.create(createCountryDto);
    return country;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all countries' })
  @ApiCreatedResponse({ type: Country, isArray: true })
  async findAll(): Promise<Country[]> {
    const countries: Country[] = await this.countriesService.findAll();
    return countries;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a country by id' })
  @ApiCreatedResponse({ type: Country })
  async findOne(@Param('id') id: string): Promise<Country> {
    const country: Country = await this.countriesService.findOne(id);
    return country;
  }

  @Patch(':id')
  @AdminAccess()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a country by id' })
  @ApiCreatedResponse({ type: Country })
  async update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto): Promise<Country> {
    const country: Country = await this.countriesService.update(id, updateCountryDto);
    return country;
  }

  @Delete(':id')
  @AdminAccess()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a country by id' })
  @ApiCreatedResponse({ type: Country })
  async remove(@Param('id') id: string): Promise<Country> {
    const country: Country = await this.countriesService.remove(id);
    return country;
  }
}

export default CountryController;
