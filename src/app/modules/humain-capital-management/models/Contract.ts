import {Employee} from "./Employee";

export class Contract {

    id: string;
    contractType: string;
    hiringDate : Date;
    endDate : Date;
    noticePeriod : number;
    status : string;
    officialSignature : Date;
    durationOfTrialPeriod : number;
    startTime : string;
    duration : number;
    nbOfHoursWorkedPerDay : number;
    nbOfWeeklyWorkingHours : number;
    hourlyWorkRate : number;
    dailyCost : number;
    hourlyDistribution : string;
    companyName : string;
    companyAddress : string;
    workAddress : string;
    job : string;
    bonusCoef : number;
    grossHourlyWage : number;
    minimumMonthlySalary : number;
    grossAnnualSalary : number;
    overallMonthlyCost : number ;
    employee : Employee;
    isArchived : string;
    user: string;
}