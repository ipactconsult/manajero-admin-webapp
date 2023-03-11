import {JobsCategory} from './JobsCategory'
export class JobOffer{
    id: string;
    hiringDate: string;
    hiringSource: string;
    jobTitle: string;
    jobOffice: string;
    jobStatus: string;
    place: string;
    nb_people_positions: number;
    nb_people_hired: number;
    jobDescription: string;
    profile_needed: string;
    jobsCategory : JobsCategory;
    isArchived : string;
    user : string;
}