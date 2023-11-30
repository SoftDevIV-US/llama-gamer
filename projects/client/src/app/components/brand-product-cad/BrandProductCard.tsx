import { Button } from '@mui/material';

import { PrismaCategoryProduct } from '@/models/product.model';

type Props = {
  product: PrismaCategoryProduct;
};

function BrandProductCard({ product }: Props) {
  return (
    <div>
      <p>{product.category.name}</p>
      <p>{product.name}</p>
      <picture>
        <img src={product.productImages[0].image} alt={product.name} />
      </picture>
      <div>
        <p>{product.price}</p>
        <Button>Buy</Button>
      </div>
    </div>
  );
}

export default BrandProductCard;
