import { Avocat } from "./Avocat";
import { Penalty } from "./Penalty";
import { Relance } from "./Relance";

export class Dossier{
    id: string;
    relance: Relance;
    avocat : Avocat ;
    statut: boolean ;
    penalty:Penalty;
    date:Date ;
 
}