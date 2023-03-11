import {Order} from './Order';

export class Delivery{
  id: string;
  shipCode: string;
  shipMode: string;
  shipDate: string;
  shipInfos: string;
  billingAddress: string;
  phone: string;
  notesShipping: string;
  shippingPrice: number;
  shippingStatus: string;
  order: Order;
  user: string;
  archive: string;
  
}