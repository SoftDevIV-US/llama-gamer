import axios from 'axios';

import { Brand, CreateBrandDto, UpdateBrandDto } from '@/models/brand.model';

export const createBrand = async (data: CreateBrandDto): Promise<Brand> => {
  const response = await axios.post('/api/brands', data);
  return response.data;
};

export const getAllBrands = async (): Promise<Brand[]> => {
  const response = await axios.get('/api/brands');
  return response.data;
};

export const getBrandById = async (id: string): Promise<Brand> => {
  const response = await axios.get(`/api/brands/${id}`);
  return response.data;
};

export const updateBrandById = async (id: string, data: UpdateBrandDto): Promise<Brand> => {
  const response = await axios.patch(`/api/brands/${id}`, data);
  return response.data;
};

export const deleteBrandById = async (id: string): Promise<Brand> => {
  const response = await axios.delete(`/api/brands/${id}`);
  return response.data;
};
