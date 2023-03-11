import { Priority } from "./enum/Piority";
import { ProjectStatus } from "./enum/ProjectStatus";
import { RequirementCategory } from "./enum/RequirementCategory";
import { Type } from "./enum/Type";
import { Stakeholder } from "./document/project/Stakeholder";

export class Requirement {
  id: string;
  requestedBy: Stakeholder;
  project: {id:""}
  priority:Priority;
  description: string;
  category: RequirementCategory;
  acceptedCriteria: string;
  archived: boolean;
}
