import { Level } from "./enum/Level";
import { Type } from "./enum/Type";

export class Risk {
  id: string;
  title: string;
  description: string;
  category: Type;
  probability: Level;
  impact: Level;
  severity: number;
  responseStrategy: string;
  project: string;
  archived: boolean;
 
}
