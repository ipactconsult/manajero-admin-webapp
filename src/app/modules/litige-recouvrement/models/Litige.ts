import { Statut } from "./Statut";

export class Litige{
    id: string;
	 typelitige : string
	 description : string
	 date:Date
	 datederesoution : Date
	statut : Statut
    nouvelledatechance :Date
    archive: string;

    constructor (
        id? : string,
        typelitige? : string,
        description? :string,
        date? :Date,
        datederesoution? : string,
        statut? : Statut,
        nouvelledatechance? : Date,

    ){}
}