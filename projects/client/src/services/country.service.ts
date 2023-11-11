import axios from 'axios';

import { Country, CreateCountryDto, UpdateCountryDto } from '@/models/country.model';

export const createCountry = async (data: CreateCountryDto): Promise<Country> => {
  const response = await axios.post('/api/countries', data);
  return response.data;
};

export const getAllCountries = async (): Promise<Country[]> => {
  const response = await axios.get('/api/countries');
  return response.data;
};

export const getCountryById = async (id: string): Promise<Country> => {
  const response = await axios.get(`/api/countries/${id}`);
  return response.data;
};

export const updateCountryById = async (id: string, data: UpdateCountryDto): Promise<Country> => {
  const response = await axios.patch(`/api/countries/${id}`, data);
  return response.data;
};

export const deleteCountryById = async (id: string): Promise<Country> => {
  const response = await axios.delete(`/api/countries/${id}`);
  return response.data;
};
