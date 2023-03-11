import {Invoice} from "./invoice.model";

export class InvoiceItem {
  id?: string;
  description: string;
  quantity: number;
  unitPrice?: number;
  total?: number;
  invoice?: Invoice;
}
