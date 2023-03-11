import { Employee } from "../models/Employee";

export class Release {

    id: string;
    motifRelease: string;
    startTime: string;
    endTime : string;
    releaseStatus : string;
    commentsRelease : string;
    employee : Employee;
    validatedReleaseBy: Employee;
    rejectedReleaseBy : Employee;
    isArchive: string;
    createdAt: Date;
    user : string;
}