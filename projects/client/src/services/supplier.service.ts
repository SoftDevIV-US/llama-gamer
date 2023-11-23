import instance from '@/config/axios.config';
import { CreateSupplierDto, Supplier, UpdateSupplierDto } from '@/models/supplier.model';

export const createSupplier = async (data: CreateSupplierDto): Promise<Supplier> => {
  const response = await instance.post('/suppliers', data);
  return response.data;
};

export const getAllSuppliers = async (): Promise<Supplier[]> => {
  const response = await instance.get('/suppliers');
  return response.data;
};

export const getSupplierById = async (id: string): Promise<Supplier> => {
  const response = await instance.get(`/suppliers/${id}`);
  return response.data;
};

export const updateSupplierById = async (id: string, data: UpdateSupplierDto): Promise<Supplier> => {
  const response = await instance.patch(`/suppliers/${id}`, data);
  return response.data;
};

export const deleteSupplierById = async (id: string): Promise<Supplier> => {
  const response = await instance.delete(`/suppliers/${id}`);
  return response.data;
};
