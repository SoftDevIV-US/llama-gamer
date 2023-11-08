import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import CountriesService from '@/countries/countries.service';
import CreateCountryDto from '@/countries/dto/create-country.dto';
import UpdateCountryDto from '@/countries/dto/update-country.dto';
import Country from '@/countries/entities/country.entity';
import PrismaService from '@/prisma/prisma.service';

describe('CountriesService', () => {
  let countriesService: CountriesService;

  const prismaService = {
    country: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountriesService,
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
    }).compile();

    countriesService = module.get<CountriesService>(CountriesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(countriesService).toBeDefined();
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

      prismaService.country.create.mockResolvedValue(createdCountry);

      const result = await countriesService.create(createCountryDto);

      expect(result).toEqual(createdCountry);
      expect(prismaService.country.create).toHaveBeenCalledWith({
        data: createCountryDto,
      });
    });

    it('should handle a duplicate country name', async () => {
      const createCountryDto: CreateCountryDto = { name: 'Test Country', tax: 0.1 };

      prismaService.country.create.mockRejectedValue({ meta: { target: ['name'] } });
      let error;
      try {
        await countriesService.create(createCountryDto);
      } catch (err) {
        error = err;
      }
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Country name already exists');
      expect(prismaService.country.create).toHaveBeenCalledWith({
        data: createCountryDto,
      });
    });

    it('should handle unexpected errors', async () => {
      const createCountryDto: CreateCountryDto = { name: 'Test Country', tax: 0.1 };

      prismaService.country.create.mockRejectedValue(new Error('Some unexpected error'));
      let error;
      try {
        await countriesService.create(createCountryDto);
      } catch (err) {
        error = err;
      }
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Something went wrong');
      expect(prismaService.country.create).toHaveBeenCalledWith({
        data: createCountryDto,
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

        prismaService.country.findMany.mockResolvedValue(expectedCountries);

        const result = await countriesService.findAll();

        expect(result).toEqual(expectedCountries);
        expect(prismaService.country.findMany).toHaveBeenCalledWith({
          orderBy: {
            createdAt: 'asc',
          },
        });
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

        prismaService.country.findUnique.mockResolvedValue(expectedCountry);

        const result = await countriesService.findOne(countryId);

        expect(result).toEqual(expectedCountry);
        expect(prismaService.country.findUnique).toHaveBeenCalledWith({
          where: {
            id: countryId,
          },
        });
      });

      it('should handle not found scenario', async () => {
        const countryId = '99';

        prismaService.country.findUnique.mockResolvedValue(null);

        let error;

        try {
          await countriesService.findOne(countryId);
        } catch (err) {
          error = err;
        }

        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(`Country with ID ${countryId} not found`);
        expect(prismaService.country.findUnique).toHaveBeenCalledWith({
          where: {
            id: countryId,
          },
        });
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

        prismaService.country.update.mockResolvedValue(updatedCountry);

        const result = await countriesService.update(countryId, updateCountryDto);

        expect(result).toEqual(updatedCountry);
        expect(prismaService.country.update).toHaveBeenCalledWith({
          where: {
            id: countryId,
          },
          data: updateCountryDto,
        });
      });

      it('should handle a duplicate country name during update', async () => {
        const countryId = '1';
        const updateCountryDto: UpdateCountryDto = { name: 'Country 2', tax: 0.2 };

        prismaService.country.update.mockRejectedValue({ meta: { target: ['name'] } });

        let error;

        try {
          await countriesService.update(countryId, updateCountryDto);
        } catch (err) {
          error = err;
        }

        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Country name already exists');
        expect(prismaService.country.update).toHaveBeenCalledWith({
          where: {
            id: countryId,
          },
          data: updateCountryDto,
        });
      });

      it('should handle unexpected errors during update', async () => {
        const countryId = '1';
        const updateCountryDto: UpdateCountryDto = { name: 'Updated Country', tax: 0.2 };

        prismaService.country.update.mockRejectedValue(new Error('Some unexpected error'));

        let error;

        try {
          await countriesService.update(countryId, updateCountryDto);
        } catch (err) {
          error = err;
        }

        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Country with ID 1 not found');
        expect(prismaService.country.update).toHaveBeenCalledWith({
          where: {
            id: countryId,
          },
          data: updateCountryDto,
        });
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

        prismaService.country.delete.mockResolvedValue(deletedCountry);

        const result = await countriesService.remove(countryId);

        expect(result).toEqual(deletedCountry);
        expect(prismaService.country.delete).toHaveBeenCalledWith({
          where: {
            id: countryId,
          },
        });
      });

      it('should handle unexpected errors during removal', async () => {
        const countryId = '1';

        prismaService.country.delete.mockRejectedValue(new Error('Some unexpected error'));

        let error;

        try {
          await countriesService.remove(countryId);
        } catch (err) {
          error = err;
        }

        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Country with ID 1 not found');
        expect(prismaService.country.delete).toHaveBeenCalledWith({
          where: {
            id: countryId,
          },
        });
      });
    });
  });
});
