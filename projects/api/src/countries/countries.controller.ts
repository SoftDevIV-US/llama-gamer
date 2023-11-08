import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import CountriesService from './countries.service';
import CreateCountryDto from './dto/create-country.dto';
import UpdateCountryDto from './dto/update-country.dto';
import Country from './entities/country.entity';

@Controller('countries')
@ApiTags('Countries')
class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a country' })
  @ApiCreatedResponse({ type: Country })
  async create(@Body() createCountryDto: CreateCountryDto): Promise<Country> {
    const country: Country = await this.countriesService.create(createCountryDto);
    return country;
  }

  @Get()
  @ApiOperation({ summary: 'Find all countries' })
  @ApiCreatedResponse({ type: Country, isArray: true })
  async findAll(): Promise<Country[]> {
    const countries: Country[] = await this.countriesService.findAll();
    return countries;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one country' })
  @ApiCreatedResponse({ type: Country })
  async findOne(@Param('id') id: string): Promise<Country> {
    const country: Country = await this.countriesService.findOne(id);
    return country;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a country' })
  @ApiCreatedResponse({ type: Country })
  async update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto): Promise<Country> {
    const country: Country = await this.countriesService.update(id, updateCountryDto);
    return country;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a country' })
  @ApiCreatedResponse({ type: Country })
  async remove(@Param('id') id: string): Promise<Country> {
    const country: Country = await this.countriesService.remove(id);
    return country;
  }
}

export default CountriesController;
