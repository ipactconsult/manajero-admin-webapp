import { Contact } from "./document/Contact";
import { ResponsibilityCategory } from "./enum/ResponsibilityCategory";

export class ResponsibilityCustomer{
     id:string;
     item:string;
     responsibilityCategory:ResponsibilityCategory ;
     comment :string;
     contact: Contact ;
     projectCharter: {id: string};
    }