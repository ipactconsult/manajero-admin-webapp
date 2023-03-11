import { Stakeholder } from "./document/project/Stakeholder";
import { Member } from "./document/project/Member";
import { ProjectStatus } from "./enum/ProjectStatus";
import { Type } from "./enum/Type";

export class Project {
  id: string;
  title: string;
  startDate: string;
  projectManager: string;
  endDate: string;
  status: ProjectStatus;
  description: string;
  organization: string;
  closingDate: string;
  type: Type;
  archived: boolean;
  stakholders: Stakeholder[];
  charter:string;
  memberList:string[];
}
