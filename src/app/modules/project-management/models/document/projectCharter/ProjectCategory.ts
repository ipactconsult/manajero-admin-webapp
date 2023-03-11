import { Level } from "../../enum/Level";

export class ProjectCategory {
  id: string;
  complexity: Level;
  impact: Level;
  strategicImportance: Level;
  duration: string;
  memberNb: number;
}
