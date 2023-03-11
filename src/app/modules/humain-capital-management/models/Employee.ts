import { Department } from "./Department";
import { Skills } from "./Skills";

export class Employee {
    id : string ; 

    employeeReference : string ;
    
    employeeName : string ; 
    employeeProfileImage : string;
    employeeProfile : string;
    employeePasseport : string ;
    employeeGender : string ;
    employeeEducation : string ;
    employeeDateOfBirth : Date ; 
    employeeNationality : string ; 
    employeeDrivingLicence : string ; 
    employeeCity : string ; 
    employeeCountry : string ; 

    employeeEmail : string ; 
    employeeCellPhone : string ;

    department : Department;

    employeeSocialSecurity : string ; 
    employeeMaritalStatus : string ; 
    employeeNbKids : number ;

    employeeContractInfo : string ;
    employeeTerminationDate : string ;
    employeeTerminationReason : string ;

    employeeBloodType : string ;
    employeeHealthProblem : string ;

    roleEmployee: string ;

    active : string ;

    isArchived : string;

    user : string;
}