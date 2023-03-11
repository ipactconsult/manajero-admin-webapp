import { Level } from "../../humain-capital-management/models/Level";
import { ResourceRequestStatus } from "./enum/ResourceRequestStatus";

export class ResourceRequest{
    id: string;
    resourceName:string;
    description: string;
    importance:Level;
    preferredDate:Date;
    status:ResourceRequestStatus;   
    submittedDate:Date;
    project:string;
}