import instance from '@/config/axios.config';
import {
  createSupplier,
  deleteSupplierById,
  getAllSuppliers,
  getSupplierById,
  updateSupplierById,
} from '@/services/supplier.service';

jest.mock('@/config/axios.config');

describe('Supplier Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a supplier', async () => {
    const mockData = {
      email: 'test@example.com',
      deliveryTime: 3,
      countryId: '123',
    };

    const mockResponse = {
      id: '1',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T12:00:00.000Z',
      email: 'test@example.com',
      deliveryTime: 3,
      countryId: '123',
      country: {
        id: '123',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T12:00:00.000Z',
        name: 'Mocked Country',
        tax: 10,
      },
      productsSuppliers: [],
    };

    (instance.post as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    const result = await createSupplier(mockData);

    expect(instance.post).toHaveBeenCalledWith('/suppliers', mockData);
    expect(result).toEqual(mockResponse);
  });

  it('should get all suppliers', async () => {
    const mockResponse = {
      data: [
        {
          id: '1',
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T12:00:00.000Z',
          email: 'test1@example.com',
          deliveryTime: 3,
          countryId: '123',
          country: {
            id: '123',
            createdAt: '2023-01-01T00:00:00.000Z',
            updatedAt: '2023-01-01T12:00:00.000Z',
            name: 'Mocked Country 1',
            tax: 10,
          },
          productsSuppliers: [],
        },
        {
          id: '2',
          createdAt: '2023-01-02T00:00:00.000Z',
          updatedAt: '2023-01-02T12:00:00.000Z',
          email: 'test2@example.com',
          deliveryTime: 4,
          countryId: '456',
          country: {
            id: '456',
            createdAt: '2023-01-02T00:00:00.000Z',
            updatedAt: '2023-01-02T12:00:00.000Z',
            name: 'Mocked Country 2',
            tax: 15,
          },
          productsSuppliers: [],
        },
      ],
    };

    (instance.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await getAllSuppliers();

    expect(instance.get).toHaveBeenCalledWith('/suppliers');
    expect(result).toEqual(mockResponse.data);
  });

  it('should get a supplier by ID', async () => {
    const supplierId = '1';

    const mockResponse = {
      data: {
        id: '1',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T12:00:00.000Z',
        email: 'test@example.com',
        deliveryTime: 3,
        countryId: '123',
        country: {
          id: '123',
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T12:00:00.000Z',
          name: 'Mocked Country',
          tax: 10,
        },
        productsSuppliers: [],
      },
    };

    (instance.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await getSupplierById(supplierId);

    expect(instance.get).toHaveBeenCalledWith(`/suppliers/${supplierId}`);
    expect(result).toEqual(mockResponse.data);
  });

  it('should update a supplier by ID', async () => {
    const supplierId = '1';
    const mockData = {
      email: 'updated@example.com',
    };

    const mockResponse = {
      data: {
        id: '1',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-02T12:00:00.000Z',
        email: 'updated@example.com',
        deliveryTime: 3,
        countryId: '123',
        country: {
          id: '123',
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T12:00:00.000Z',
          name: 'Mocked Country',
          tax: 10,
        },
        productsSuppliers: [],
      },
    };

    (instance.patch as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    const result = await updateSupplierById(supplierId, mockData);

    expect(instance.patch).toHaveBeenCalledWith(`/suppliers/${supplierId}`, mockData);
    expect(result).toEqual(mockResponse);
  });

  it('should delete a supplier by ID', async () => {
    const supplierId = '1';

    const mockResponse = {
      data: {
        id: '1',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T12:00:00.000Z',
        email: 'test@example.com',
        deliveryTime: 3,
        countryId: '123',
        country: {
          id: '123',
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T12:00:00.000Z',
          name: 'Mocked Country',
          tax: 10,
        },
        productsSuppliers: [],
      },
    };

    (instance.delete as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    const result = await deleteSupplierById(supplierId);

    expect(instance.delete).toHaveBeenCalledWith(`/suppliers/${supplierId}`);
    expect(result).toEqual(mockResponse);
  });
});
