import { Employee } from "./Employee";

export class Training{
    id : string;
    object : string;
    category : string;
    nbHours : number;
    startDate : Date;
    endDate : Date;
    description : string;
    program : string;
    status : string;
    score : number;
    budget : number;
    cost : number;
    isArchived : string;
    employee : Employee;
    user : string;
}