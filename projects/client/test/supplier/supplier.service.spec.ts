import axios from 'axios';

import { CreateSupplierDto, Supplier, UpdateSupplierDto } from '@/models/supplier.model';
import {
  createSupplier,
  deleteSupplierById,
  getAllSuppliers,
  getSupplierById,
  updateSupplierById,
} from '@/services/supplier.service';

jest.mock('axios');

describe('SupplierService', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createSupplier', () => {
    it('should create a new supplier', async () => {
      const data: CreateSupplierDto = {
        email: 'test@test.com',
        deliveryTime: 2,
        countryId: '123',
      };
      const supplier: Supplier = {
        id: '456',
        email: 'test@test.com',
        deliveryTime: 2,
        countryId: '123',
        country: {
          id: '123',
          name: 'Test Country',
          tax: 10,
          createdAt: String(new Date()),
          updatedAt: String(new Date()),
        },
        createdAt: String(new Date()),
        updatedAt: String(new Date()),
      };
      const response = { data: supplier };
      (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue(response);

      const result = await createSupplier(data);

      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('/api/suppliers', data);
      expect(result).toEqual(supplier);
    });
  });

  describe('getAllSuppliers', () => {
    it('should get all suppliers', async () => {
      const suppliers: Supplier[] = [
        {
          id: '456',
          email: 'test@test.com',
          deliveryTime: 2,
          countryId: '123',
          country: {
            id: '123',
            name: 'Test Country',
            tax: 10,
            createdAt: String(new Date()),
            updatedAt: String(new Date()),
          },
          createdAt: String(new Date()),
          updatedAt: String(new Date()),
        },
      ];
      const response = { data: suppliers };
      (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(response);

      const result = await getAllSuppliers();

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('/api/suppliers');
      expect(result).toEqual(suppliers);
    });
  });

  describe('getSupplierById', () => {
    it('should get a supplier by id', async () => {
      const supplier: Supplier = {
        id: '456',
        email: 'test@test.com',
        deliveryTime: 2,
        countryId: '123',
        country: {
          id: '123',
          name: 'Test Country',
          tax: 10,
          createdAt: String(new Date()),
          updatedAt: String(new Date()),
        },
        createdAt: String(new Date()),
        updatedAt: String(new Date()),
      };
      const response = { data: supplier };
      (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(response);

      const result = await getSupplierById('456');

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('/api/suppliers/456');
      expect(result).toEqual(supplier);
    });
  });

  describe('updateSupplierById', () => {
    it('should update a supplier by id', async () => {
      const data: UpdateSupplierDto = {
        email: 'test@test.com',
        deliveryTime: 2,
        countryId: '123',
      };
      const supplier: Supplier = {
        id: '456',
        email: 'test@test.com',
        deliveryTime: 2,
        countryId: '123',
        country: {
          id: '123',
          name: 'Test Country',
          tax: 10,
          createdAt: String(new Date()),
          updatedAt: String(new Date()),
        },
        createdAt: String(new Date()),
        updatedAt: String(new Date()),
      };
      const response = { data: supplier };
      (axios.patch as jest.MockedFunction<typeof axios.patch>).mockResolvedValue(response);

      const result = await updateSupplierById('456', data);

      expect(axios.patch).toHaveBeenCalledTimes(1);
      expect(axios.patch).toHaveBeenCalledWith('/api/suppliers/456', data);
      expect(result).toEqual(supplier);
    });
  });

  describe('deleteSupplierById', () => {
    it('should delete a supplier by id', async () => {
      const supplier: Supplier = {
        id: '456',
        email: 'test@test.com',
        deliveryTime: 2,
        countryId: '123',
        country: {
          id: '123',
          name: 'Test Country',
          tax: 10,
          createdAt: String(new Date()),
          updatedAt: String(new Date()),
        },
        createdAt: String(new Date()),
        updatedAt: String(new Date()),
      };
      const response = { data: supplier };
      (axios.delete as jest.MockedFunction<typeof axios.delete>).mockResolvedValue(response);

      const result = await deleteSupplierById('456');

      expect(axios.delete).toHaveBeenCalledTimes(1);
      expect(axios.delete).toHaveBeenCalledWith('/api/suppliers/456');
      expect(result).toEqual(supplier);
    });
  });
});
