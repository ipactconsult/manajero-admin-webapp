import { Activity } from "./Activity";

export class ActivityStatus {
    id: string;
    title: string;
    project: string;
    position: number;
    activityList: Activity[];
}