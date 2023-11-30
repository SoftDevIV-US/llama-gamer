import instance from '@/config/axios.config';
import { CreateProductDto, Product, UpdateProductDto } from '@/models/product.model';

export const createProduct = async (data: CreateProductDto): Promise<Product> => {
  const response = await instance.post('/product', data);
  return response.data;
};

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await instance.get('/product');
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await instance.get(`/product/${id}`);
  return response.data;
};

export const updateProductById = async (id: string, data: UpdateProductDto): Promise<Product> => {
  const response = await instance.patch(`/product/${id}`, data);
  return response.data;
};

export const deleteProductById = async (id: string): Promise<Product> => {
  const response = await instance.delete(`/product/${id}`);
  return response.data;
};
