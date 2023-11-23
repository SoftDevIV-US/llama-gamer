import instance from '@/config/axios.config';
import { Country, CreateCountryDto, UpdateCountryDto } from '@/models/country.model';

export const createCountry = async (data: CreateCountryDto): Promise<Country> => {
  const response = await instance.post('/countries', data);
  return response.data;
};

export const getAllCountries = async (): Promise<Country[]> => {
  const response = await instance.get('/countries');
  return response.data;
};

export const getCountryById = async (id: string): Promise<Country> => {
  const response = await instance.get(`/countries/${id}`);
  return response.data;
};

export const updateCountryById = async (id: string, data: UpdateCountryDto): Promise<Country> => {
  const response = await instance.patch(`/countries/${id}`, data);
  return response.data;
};

export const deleteCountryById = async (id: string): Promise<Country> => {
  const response = await instance.delete(`/countries/${id}`);
  return response.data;
};
