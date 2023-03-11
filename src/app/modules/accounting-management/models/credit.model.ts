export class Credit {
  id?: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  clientAddress?: string;
  interestRate: number;
  inflationRate: number;
  initialCapital: number;
  taxRate: number;
  v: number;
  periods: number;
  frequency:string;
  currency: string;
  createdAt: Date;
  archived?: boolean;
}
