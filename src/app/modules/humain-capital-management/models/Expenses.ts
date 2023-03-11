import {Employee} from './Employee';

export class Expenses{
    id: string;
    project: Object;
    expenseName: string;
    expenseType:string;
    expenseDate: Date;
    totalTTCAmount: number;
    toBeInvoiced: string;
    status: string;
    comments: string;
    tvaAmount: number;
    htAmount: number;
    distanceDriven: number;
    startingCity: string;
    endingCity: string;
    fiscalPower: string;
    archive: boolean;
    employee: Employee;
}