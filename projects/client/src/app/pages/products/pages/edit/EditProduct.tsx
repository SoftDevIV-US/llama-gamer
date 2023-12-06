import EditIcon from '@mui/icons-material/Edit';
import { Form as FormFormik, Formik, FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '@/app/components/button/Button';
import Form from '@/app/components/form/Form';
import InputFieldDropdownMultiSelect from '@/app/components/input-field-drop-down-multi-select/InputFieldDropDownMultiSelect';
import InputFieldDropdown from '@/app/components/input-field-drop-down/InputFieldDropDown';
import InputField from '@/app/components/input-field/InputField';
import Loading from '@/app/components/loading/Loading';
import NotFound from '@/app/components/not-found/NotFound';
import InnerLayout from '@/app/layouts/InnerLayout';
import { OnlySuppliers, UpdateProductDto } from '@/models/product.model';
import { getAllBrands } from '@/services/brand.service';
import { getAllCategories } from '@/services/category.service';
import { getAllSuppliers } from '@/services/supplier.service';

import useEditProduct from './hooks/useEditProduct';

type DropdownOption = { id: string; name: string };

function EditCountry() {
  const [isNameCorrect, setIsNameCorrect] = useState<boolean>(true);
  const [isDescriptionCorrect, setIsDescriptionCorrect] = useState<boolean>(true);
  const [isStockCorrect, setIsStockCorrect] = useState<boolean>(true);
  const [isPriceCorrect, setIsPriceCorrect] = useState<boolean>(true);
  const [isCategoryCorrect, setIsCategoryCorrect] = useState<boolean>(true);
  const [isBrandCorrect, setIsBrandCorrect] = useState<boolean>(true);
  const [isAvailableCorrect, setIsAvailableCorrect] = useState<boolean>(true);
  const [isSupplierCorrect] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [found, setFound] = useState<boolean>(true);
  const [categoryList, setCategoryList] = useState<DropdownOption[]>([]);
  const [brandList, setBrandList] = useState<DropdownOption[]>([]);
  const [supplierList, setSupplierList] = useState<DropdownOption[]>([]);
  const [, setProductSupplierList] = useState<OnlySuppliers[]>([]);
  const [availableList, setAvailableList] = useState<DropdownOption[]>([]);
  const { id } = useParams<{ id: string }>();

  const { editProduct, product } = useEditProduct({
    id: String(id),
    setIsNameCorrect,
    setIsDescriptionCorrect,
    setIsStockCorrect,
    setIsPriceCorrect,
    setIsAvailableCorrect,
    setIsCategoryCorrect,
    setIsBrandCorrect,
    setIsLoading,
    setFound,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getAllCategories();
        setCategoryList([{ id: '', name: 'Select a category...' }, ...categories]);
      } catch (error) {
        throw new Error('Error while loading categories');
      }
    };

    const fetchBrands = async () => {
      try {
        const brands = await getAllBrands();
        setBrandList([{ id: '', name: 'Select a brand...' }, ...brands]);
      } catch (error) {
        throw new Error('Error while loading brands');
      }
    };

    const fetchAvailability = async () => {
      try {
        const availability = {
          available: true,
          notAvailable: false,
        };

        const availabilityArray = Object.values(availability).map((value) => ({
          id: String(value),
          name: value ? 'Available' : 'Not Available',
        }));

        setAvailableList([{ id: '', name: 'Select availability...' }, ...availabilityArray]);
      } catch (error) {
        throw new Error('Error while loading availabilities');
      }
    };

    const fetchSuppliers = async () => {
      try {
        const suppliers = await getAllSuppliers();

        const suppliersArray = Object.entries(suppliers).map(([, value]) => ({
          id: value.id,
          name: value.email,
        }));

        setSupplierList([{ id: '', name: 'Select a supplier...' }, ...suppliersArray]);
      } catch (error) {
        throw new Error('Error while loading supplier');
      }
    };

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const productSuppliers = product.productsSuppliers;
        setProductSupplierList(productSuppliers);
        await fetchCategories();
        await fetchBrands();
        await fetchAvailability();
        await fetchSuppliers();
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [product.productsSuppliers]);

  return (
    <InnerLayout>
      <Form title='Product'>
        <div className='h-full overflow-y-scroll'>
          {isLoading ? (
            <div className='grid h-full place-content-center py-5'>
              <Loading />
            </div>
          ) : found ? (
            <Formik
              initialValues={
                {
                  name: product.name,
                  description: product.description,
                  stock: product.stock,
                  price: product.price,
                  isAvailable: product.isAvailable,
                  categoryId: product.categoryId,
                  brandId: product.brandId,
                } as UpdateProductDto
              }
              onSubmit={(values) => {
                if (
                  !values.name ||
                  !values.description ||
                  !values.stock ||
                  !values.price ||
                  !values.categoryId ||
                  !values.brandId
                )
                  return;
                editProduct(values);
              }}
              enableReinitialize
            >
              {(
                formikProps: FormikProps<{
                  name: string;
                  description: string;
                  stock: number;
                  price: number;
                  isAvailable: boolean;
                  categoryId: string;
                  brandId: string;
                }>
              ) => (
                <FormFormik className='flex h-full flex-col px-0 py-12 lg:px-16 landscape:gap-4 landscape:py-4 landscape:md:gap-20 landscape:md:py-20'>
                  <div className='flex grow flex-col gap-10 font-normal lg:gap-20'>
                    <InputField
                      id='name'
                      value='name'
                      placeholder='Name of the product...'
                      isCorrect={isNameCorrect}
                      showRequired={false}
                    >
                      Name
                    </InputField>

                    <InputField
                      id='description'
                      value='description'
                      placeholder='Description of the product...'
                      isCorrect={isDescriptionCorrect}
                      showRequired={false}
                    >
                      Description
                    </InputField>

                    <InputField
                      id='stock'
                      value='stock'
                      type='number'
                      placeholder='Stock of the product...'
                      isCorrect={isStockCorrect}
                      showRequired={false}
                      allowDecimals={false}
                    >
                      Stock
                    </InputField>

                    <InputField
                      id='price'
                      value='price'
                      type='number'
                      placeholder='Price of the product...'
                      isCorrect={isPriceCorrect}
                      showRequired={false}
                    >
                      Price
                    </InputField>

                    <InputFieldDropdown
                      id='select-availability'
                      name='availability'
                      value={`${product.isAvailable}`}
                      options={availableList.map((option) => ({ id: option.id as string, name: option.name }))}
                      isCorrect={isAvailableCorrect}
                      onChange={(e) => {
                        formikProps.setFieldValue('isAvailable', e.target.value === 'true');
                        setIsAvailableCorrect(true);
                      }}
                    >
                      Availability
                    </InputFieldDropdown>

                    <InputFieldDropdown
                      id='select-category'
                      name='category'
                      value={product.categoryId}
                      options={categoryList.map((option) => ({ id: option.id as string, name: option.name }))}
                      isCorrect={isCategoryCorrect}
                      onChange={(e) => {
                        formikProps.setFieldValue('categoryId', e.target.value);
                        setIsCategoryCorrect(true);
                      }}
                    >
                      Category
                    </InputFieldDropdown>

                    <InputFieldDropdown
                      id='select-brand'
                      name='brand'
                      value={product.brandId}
                      options={brandList.map((option) => ({ id: option.id as string, name: option.name }))}
                      isCorrect={isBrandCorrect}
                      onChange={(e) => {
                        formikProps.setFieldValue('brandId', e.target.value);
                        setIsBrandCorrect(true);
                      }}
                    >
                      Brand
                    </InputFieldDropdown>

                    <InputFieldDropdownMultiSelect
                      id='select-supplier'
                      name='supplier'
                      value=''
                      // value={productSupplierList.map((supplier) => supplier.supplier.email).join(',')}
                      options={supplierList.map((option) => ({ id: option.id as string, name: option.name }))}
                      isCorrect={isSupplierCorrect}
                      onChange={(e) => {
                        formikProps.setFieldValue('productsSuppliers', e.target.value);
                        setIsBrandCorrect(true);
                      }}
                    >
                      Supplier
                    </InputFieldDropdownMultiSelect>
                  </div>
                  <div className='flex justify-center py-6'>
                    <Button
                      className='flex place-items-center gap-2 rounded-xl bg-[#223343] px-6 py-2 text-white'
                      isSubmit
                    >
                      <EditIcon />
                      <p className='text-xl'>Save</p>
                    </Button>
                  </div>
                </FormFormik>
              )}
            </Formik>
          ) : (
            <NotFound>Country</NotFound>
          )}
        </div>
      </Form>
    </InnerLayout>
  );
}

export default EditCountry;
