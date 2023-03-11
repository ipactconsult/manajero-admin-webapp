import { Level } from "../../enum/Level";
import { Contact } from "../Contact";

export class Stakeholder {
  id: string;
  name: string;
  role: string;
  businessUnit: string;
  engagementLevel: Level;
  note: string;
  //contact:Contact;
}
