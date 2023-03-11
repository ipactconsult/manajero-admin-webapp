import { Employee } from "./Employee";
import { Level } from "./Level";

export class Department {
    id : string;
    departmentReference: string;
    departmentName: string;
    employee : Employee;
    level : Level;
    isArchived: string;
    user : string;
}
