import {Visit} from './visit';

export class Deals{
  id: string;
  dealName: string;
  dealValue: number;
  forecastDate: Date;
  customerBudget: number;
  winChance: number;
  budgetStage: string;
  quoteValue: number;
  quoteDate: Date;
  quoteVsBudget: string;
  dealStatus :string;
  source : string;
  comment: string;
  dealType: string;
  negotiation : string;
  visit: Visit;
  dealDate: string;
  archive:string;
  leftDays: number;

}