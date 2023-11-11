import axios from 'axios';

import {
  createCountry,
  deleteCountryById,
  getAllCountries,
  getCountryById,
  updateCountryById,
} from '@/services/country.service';

jest.mock('axios');

describe('CountryService', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createCountry', () => {
    it('should create a new country', async () => {
      const data = { name: 'Test Country', tax: 0.1 };
      const response = { data: { id: '1', ...data } };
      (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(response);

      const result = await createCountry(data);

      expect(axios.post).toHaveBeenCalledWith('/api/countries', data);
      expect(result).toEqual(response.data);
    });
  });

  describe('getAllCountries', () => {
    it('should get all countries', async () => {
      const response = { data: [{ id: '1', name: 'Test Country' }] };
      (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(response);

      const result = await getAllCountries();

      expect(axios.get).toHaveBeenCalledWith('/api/countries');
      expect(result).toEqual(response.data);
    });
  });

  describe('getCountryById', () => {
    it('should get a country by id', async () => {
      const id = '1';
      const response = { data: { id, name: 'Test Country' } };
      (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(response);

      const result = await getCountryById(id);

      expect(axios.get).toHaveBeenCalledWith(`/api/countries/${id}`);
      expect(result).toEqual(response.data);
    });
  });

  describe('updateCountryById', () => {
    it('should update a country by id', async () => {
      const id = '1';
      const data = { name: 'Updated Test Country' };
      const response = { data: { id, ...data } };
      (axios.patch as jest.MockedFunction<typeof axios.patch>).mockResolvedValueOnce(response);

      const result = await updateCountryById(id, data);

      expect(axios.patch).toHaveBeenCalledWith(`/api/countries/${id}`, data);
      expect(result).toEqual(response.data);
    });
  });

  describe('deleteCountryById', () => {
    it('should delete a country by id', async () => {
      const id = '1';
      const response = { data: { id, name: 'Test Country' } };
      (axios.delete as jest.MockedFunction<typeof axios.delete>).mockResolvedValueOnce(response);

      const result = await deleteCountryById(id);

      expect(axios.delete).toHaveBeenCalledWith(`/api/countries/${id}`);
      expect(result).toEqual(response.data);
    });
  });
});
