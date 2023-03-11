import {Customer} from './Customer';
import {Employee} from '../../humain-capital-management/models/Employee';

export class Claim{
  id: string;
  claimCode: string;
  claimMotif:string;
  otherInfos:string;
  responseClaim:string;
  evaluationClaim:string;
  closingDate:string;
  claimTitle:string;
  claimDate:Date;
  claimType: string;
  urgencyType: string;
  descriptionClaim: string;
  status: string;
  customer: Customer;
  employee: Employee;
  user: string;
}