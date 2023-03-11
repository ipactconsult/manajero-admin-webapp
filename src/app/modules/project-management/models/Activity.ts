import { Employee } from "./Employee";
import { Level } from "./enum/Level";
import { Goal } from "./Goal";
import { Product } from "./Product";

export class Activity{
    id: string;
    title: string;
    description: string;
    startDate:Date;
    dueDate:Date;
    goal:Goal;
    priority:Level;
    team:string[];
    retard:boolean;
    validated:boolean;
    resource:Product[];
    skills:string[];

}