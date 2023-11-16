import axios from 'axios';

import { CreateSupplierDto, Supplier, UpdateSupplierDto } from '@/models/supplier.model';

export const createSupplier = async (data: CreateSupplierDto): Promise<Supplier> => {
  const response = await axios.post('/api/suppliers', data);
  return response.data;
};

export const getAllSuppliers = async (): Promise<Supplier[]> => {
  const response = await axios.get('/api/suppliers');
  return response.data;
};

export const getSupplierById = async (id: string): Promise<Supplier> => {
  const response = await axios.get(`/api/suppliers/${id}`);
  return response.data;
};

export const updateSupplierById = async (id: string, data: UpdateSupplierDto): Promise<Supplier> => {
  const response = await axios.patch(`/api/suppliers/${id}`, data);
  return response.data;
};

export const deleteSupplierById = async (id: string): Promise<Supplier> => {
  const response = await axios.delete(`/api/suppliers/${id}`);
  return response.data;
};
