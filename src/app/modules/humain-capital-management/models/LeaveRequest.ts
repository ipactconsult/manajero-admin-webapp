import { Employee } from './Employee';
export class LeaveRequest {
    id : string ;
    requestStatus : string; 
    motif : string;
    available_quantity : number ; 
    remainder_quantity : number ;
    startDate : Date;
    start : string;
    endDate : Date;
    end : string ;
    duration : number;
    unit : string;
    employee : Employee;
    comments : string;
    validatedBy: Employee;
    rejectedBy : Employee;
    user : string;
}