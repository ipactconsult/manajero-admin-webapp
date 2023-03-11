import { ChangeRequestCategory } from "./enum/ChangeRequestCategory";
import { StatusRequest } from "./enum/StatusRequest";

export class ChangeRequest{
    id: string;
    changeType:ChangeRequestCategory;
    description:string;
    requestor:{name:string,email:string,role:string}
    submittedDate:Date;
    approvedDate:Date;
    status:StatusRequest;
    comment:string;
    archived: boolean;
}
