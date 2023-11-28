import MockAdapter from 'axios-mock-adapter';

import instance from '@/config/axios.config';
import { Country, CreateCountryDto, UpdateCountryDto } from '@/models/country.model';
import {
  createCountry,
  deleteCountryById,
  getAllCountries,
  getCountryById,
  updateCountryById,
} from '@/services/country.service';

const mockCountry: Country = {
  id: '1',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  name: 'Test Country',
  tax: 10,
};

const mockCreateCountryDto: CreateCountryDto = {
  name: 'Test Country',
  tax: 10,
};

const mockUpdateCountryDto: UpdateCountryDto = {
  name: 'Updated Test Country',
  tax: 15,
};

describe('Country Service', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(instance);
  });

  afterEach(() => {
    mock.reset();
  });

  describe('createCountry', () => {
    it('should create a new country', async () => {
      mock.onPost('/countries').reply(200, mockCountry);

      const result = await createCountry(mockCreateCountryDto);

      expect(result).toEqual(mockCountry);
    });
  });

  describe('getAllCountries', () => {
    it('should get all countries', async () => {
      mock.onGet('/countries').reply(200, [mockCountry]);

      const result = await getAllCountries();

      expect(result).toEqual([mockCountry]);
    });
  });

  describe('getCountryById', () => {
    it('should get a country by id', async () => {
      const countryId = '1';
      mock.onGet(`/countries/${countryId}`).reply(200, mockCountry);

      const result = await getCountryById(countryId);

      expect(result).toEqual(mockCountry);
    });
  });

  describe('updateCountryById', () => {
    it('should update a country by id', async () => {
      const countryId = '1';
      mock.onPatch(`/countries/${countryId}`).reply(200, { ...mockCountry, ...mockUpdateCountryDto });

      const result = await updateCountryById(countryId, mockUpdateCountryDto);

      expect(result).toEqual({ ...mockCountry, ...mockUpdateCountryDto });
    });
  });

  describe('deleteCountryById', () => {
    it('should delete a country by id', async () => {
      const countryId = '1';
      mock.onDelete(`/countries/${countryId}`).reply(200, mockCountry);

      const result = await deleteCountryById(countryId);

      expect(result).toEqual(mockCountry);
    });
  });
});
