export class Invoice {
  id?: string;
  createdAt?: Date;
  title?: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  clientAddress?: string;
  code?: number;
  dueDate?: Date;
  invoiceNumber?: number;
  currency?: string;
  subTotal?: number;
  totalTax?: number;
  total?: number;
  paidStatus?: boolean;
  pastDueDate?: boolean;
  archived?: boolean;
}
