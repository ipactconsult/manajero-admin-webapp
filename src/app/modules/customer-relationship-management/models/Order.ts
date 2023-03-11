import {Deals} from './Deals';
import {Material} from '../../product-inventory-management/models/material/material';
import {Contract} from './Contract';

export class Order{
  id: string;
  orderCode:string;
  orderName: string;
  orderDate: string;
  status: string;
  otherInfosOrder: string;
  product: Material;
  archive: string;
  paymentMethod: string;
  paymentStatus: string;
  subTotal: string;
  notes: string;
  invoice: string;
  deals : Deals;
  user: string;
  orderPaid: number;
  orderType: string;
  particular: string;
  purchaseOrder:Object;
  quantity: number;
  currency: string;
  contract: Contract;
}