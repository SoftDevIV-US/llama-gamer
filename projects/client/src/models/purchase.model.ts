import PurchaseStatus from '@/enums/purchase-status.enum';

import PurchasesProducts from './purchases-products.model';

interface Purchase extends ApiRecord {
  totalCost: number;
  deliveryDay: Date;
  deadline: Date;
  status: PurchaseStatus;
  userId: string;
  purchaseProducts: PurchasesProducts[];
}

export default Purchase;
