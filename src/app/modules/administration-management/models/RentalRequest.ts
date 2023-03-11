import { Status } from "./enum/Status";

export class RentalRequest {
    id: string;
    firstName:string;
    lastName:string;
    email:string;
    secondEmail:string;
    phone:string;
    secondPhone:string;
    address:string;
    matriculateFiscal: string;
    company:string;
    country:string;
    city:string;
    postalCode:string;
    webSiteLink:string;
    linkedinUrl:string;
    status:Status;
}