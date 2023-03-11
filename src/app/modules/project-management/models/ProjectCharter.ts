import { Budget } from "./document/Budget";
import { ProjectCharterDocument } from "./document/ProjectCharterDocument";
import { StatusRequest } from "./enum/StatusRequest";
import { ProjectCategory } from "./document/projectCharter/ProjectCategory";
import { Are } from "./document/projectCharter/Are";
import { ResponsibilityCustomer } from "./document/projectCharter/ResponsibilityCustomer";
import { Employee } from "./Employee";

export class ProjectCharter {
    id: string;
    title: string;
    statementWork: string; 
    problematic :ProjectCharterDocument[];
    goal:ProjectCharterDocument[];
    mileStones:ProjectCharterDocument[];
    highRisk:ProjectCharterDocument[];
    keyStakeholder:ProjectCharterDocument[];
    deliveryUnits:ProjectCharterDocument[];
    successCriteria:string[];
    responsibilityCustomer:ResponsibilityCustomer[];
    are:Are[];
    budget:Budget[];
    status:StatusRequest;
    notes:string;
    projectCategory:ProjectCategory;
    dateSubmited:Date;
    projectDescription:string;
    file:string[];
    archived:boolean;
    projectManagerInfo:Employee;

    
}