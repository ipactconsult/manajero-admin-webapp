import { ResponsibilityCategory } from "../../enum/ResponsibilityCategory";
import { Contact } from "../Contact";

export class ResponsibilityCustomer{
     id:string;
     item:string;
     responsibilityCategory:ResponsibilityCategory ;
     comment :string;
     contact: Contact ;
     projectCharter: {id: string};
     
    }