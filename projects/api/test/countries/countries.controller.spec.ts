import { Test, TestingModule } from '@nestjs/testing';

import CountriesController from '@/countries/countries.controller';
import CountriesService from '@/countries/countries.service';
import CreateCountryDto from '@/countries/dto/create-country.dto';
import UpdateCountryDto from '@/countries/dto/update-country.dto';
import Country from '@/countries/entities/country.entity';

describe('CountriesController', () => {
  let countriesController: CountriesController;

  const countriesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
      providers: [
        {
          provide: CountriesService,
          useValue: countriesService,
        },
      ],
    }).compile();

    countriesController = module.get<CountriesController>(CountriesController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(countriesController).toBeDefined();
  });

  describe('create', () => {
    it('should create a country', async () => {
      const createCountryDto: CreateCountryDto = { name: 'Test Country', tax: 0.1 };
      const createdCountry: Country = {
        id: '1',
        name: 'Test Country',
        tax: 0.1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      countriesService.create.mockResolvedValue(createdCountry);

      const result = await countriesController.create(createCountryDto);

      expect(result).toEqual(createdCountry);
      expect(countriesService.create).toHaveBeenCalledWith(createCountryDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of countries', async () => {
      const expectedCountries: Country[] = [
        {
          id: '1',
          name: 'Country 1',
          tax: 0.1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Country 2',
          tax: 0.2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      countriesService.findAll.mockResolvedValue(expectedCountries);

      const result = await countriesController.findAll();

      expect(result).toEqual(expectedCountries);
      expect(countriesService.findAll).toHaveBeenCalledWith();
    });
  });

  describe('findOne', () => {
    it('should return a country by ID', async () => {
      const countryId = '1';
      const expectedCountry: Country = {
        id: countryId,
        name: 'Country 1',
        tax: 0.1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      countriesService.findOne.mockResolvedValue(expectedCountry);

      const result = await countriesController.findOne(countryId);

      expect(result).toEqual(expectedCountry);
      expect(countriesService.findOne).toHaveBeenCalledWith(countryId);
    });
  });

  describe('update', () => {
    it('should update a country by ID', async () => {
      const countryId = '1';
      const updateCountryDto: UpdateCountryDto = { name: 'Updated Country', tax: 0.2 };
      const updatedCountry: Country = {
        id: countryId,
        name: 'Updated Country',
        tax: 0.2,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      countriesService.update.mockResolvedValue(updatedCountry);

      const result = await countriesController.update(countryId, updateCountryDto);

      expect(result).toEqual(updatedCountry);
      expect(countriesService.update).toHaveBeenCalledWith(countryId, updateCountryDto);
    });
  });

  describe('remove', () => {
    it('should remove a country by ID', async () => {
      const countryId = '1';
      const deletedCountry: Country = {
        id: countryId,
        name: 'Deleted Country',
        tax: 0.2,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      countriesService.remove.mockResolvedValue(deletedCountry);

      const result = await countriesController.remove(countryId);

      expect(result).toEqual(deletedCountry);
      expect(countriesService.remove).toHaveBeenCalledWith(countryId);
    });
  });
});
