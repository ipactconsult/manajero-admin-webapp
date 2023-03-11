import { Level } from "./enum/Level";

export class Goal {
    id: string;
    title: string;
    disciption: string;
    priority: Level;
    dueDate: Date;
    archive: boolean;
    project:{id:string}
    kpi:string;
}
