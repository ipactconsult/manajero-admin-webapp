import {Employee} from '../../humain-capital-management/models/Employee';

export class Customer {
    id: string;
    matriculateFiscal: string;
    title: string;
    name: string;
    image: string;
    gender: string;
    otherGender: string;
    dateOfBirth: Date;
    status: string;
    description: string;
    active: boolean;
    address: string;
    city: string;
    country: string;
    phone: string;
    secondPhone: string;
    secondEmail: string;
    workEmail: string;
    fax: string;
    workWebsite: string;
    assignee: Employee;
    contactType: string;
    linkedinUrl: string;
    archive: string;
    user: string;

}
