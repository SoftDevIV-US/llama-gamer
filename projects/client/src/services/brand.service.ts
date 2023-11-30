import instance from '@/config/axios.config';
import { Brand, CreateBrandDto, UpdateBrandDto } from '@/models/product.model';

export const createBrand = async (data: CreateBrandDto): Promise<Brand> => {
  const response = await instance.post('/brands', data);
  return response.data;
};

export const getAllBrands = async (): Promise<Brand[]> => {
  const response = await instance.get('/brands');
  return response.data;
};

export const getBrandById = async (id: string): Promise<Brand> => {
  const response = await instance.get(`/brands/${id}`);
  return response.data;
};

export const updateBrandById = async (id: string, data: UpdateBrandDto): Promise<Brand> => {
  const response = await instance.patch(`/brands/${id}`, data);
  return response.data;
};

export const deleteBrandById = async (id: string): Promise<Brand> => {
  const response = await instance.delete(`/brands/${id}`);
  return response.data;
};
