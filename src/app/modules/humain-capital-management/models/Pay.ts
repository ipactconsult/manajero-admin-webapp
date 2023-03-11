import {Contract} from "./Contract";
export class Pay{
  
  id : string;
  baseSalary : number;
  primeConventionnelle : number;
  primeNonConventionnelle : number;
  tfp : number;
  foprolos : number;
  salaryAnnual : number;
  taux: number;
  cnam : number;
  salaryCost: number;
  irpp : number;
  cnss : number;
  cnssAnnuel : number;
  netSalaryImposed : number;
  brutSalaryImposed : number;
  gain: number;
  css : number;
  netSalary : number;
  contract : Contract;
}