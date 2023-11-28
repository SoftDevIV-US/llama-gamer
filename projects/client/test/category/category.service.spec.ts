import instance from '@/config/axios.config';
import { Category, CreateCategoryDto, UpdateCategoryDto } from '@/models/category.model';
import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
} from '@/services/category.service';

jest.mock('@/config/axios.config');

describe('Category Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a category', async () => {
    const mockData: CreateCategoryDto = {
      name: 'Test Category',
      image: 'test-image.png',
    };

    const mockResponse: Category = {
      id: '1',
      createdAt: '2022-01-01',
      updatedAt: '2022-01-01',
      name: 'Test Category',
      image: 'test-image.png',
    };

    (instance.post as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    const result = await createCategory(mockData);

    expect(instance.post).toHaveBeenCalledWith('/categories', mockData);
    expect(result).toEqual(mockResponse);
  });

  it('should get all categories', async () => {
    const mockResponse: Category[] = [
      {
        id: '1',
        createdAt: '2022-01-01',
        updatedAt: '2022-01-01',
        name: 'Category 1',
        image: 'image1.png',
      },
      {
        id: '2',
        createdAt: '2022-01-02',
        updatedAt: '2022-01-02',
        name: 'Category 2',
        image: 'image2.png',
      },
    ];

    (instance.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    const result = await getAllCategories();

    expect(instance.get).toHaveBeenCalledWith('/categories');
    expect(result).toEqual(mockResponse);
  });

  it('should get a category by ID', async () => {
    const categoryId = '1';

    const mockResponse: Category = {
      id: '1',
      createdAt: '2022-01-01',
      updatedAt: '2022-01-01',
      name: 'Test Category',
      image: 'test-image.png',
    };

    (instance.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    const result = await getCategoryById(categoryId);

    expect(instance.get).toHaveBeenCalledWith(`/categories/${categoryId}`);
    expect(result).toEqual(mockResponse);
  });

  it('should update a category by ID', async () => {
    const categoryId = '1';
    const mockData: UpdateCategoryDto = {
      name: 'Updated Category',
    };

    const mockResponse: Category = {
      id: '1',
      createdAt: '2022-01-01',
      updatedAt: '2022-01-02',
      name: 'Updated Category',
      image: 'test-image.png',
    };

    (instance.patch as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    const result = await updateCategoryById(categoryId, mockData);

    expect(instance.patch).toHaveBeenCalledWith(`/categories/${categoryId}`, mockData);
    expect(result).toEqual(mockResponse);
  });

  it('should delete a category by ID', async () => {
    const categoryId = '1';

    const mockResponse: Category = {
      id: '1',
      createdAt: '2022-01-01',
      updatedAt: '2022-01-01',
      name: 'Test Category',
      image: 'test-image.png',
    };

    (instance.delete as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    const result = await deleteCategoryById(categoryId);

    expect(instance.delete).toHaveBeenCalledWith(`/categories/${categoryId}`);
    expect(result).toEqual(mockResponse);
  });
});
