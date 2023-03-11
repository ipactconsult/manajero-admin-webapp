import { CallRapport } from "./CallRapport";
import { Mail } from "./Mail";
import { SMS } from "./SMS";
import { Promise } from "./Promise";

export class Relance{
    id :string ;
    invoice:any ;
    premierrelance :Date ;
    email : Mail[] ;
    comment :Comment [] ;
    call :CallRapport[];
    sms :SMS[];
    promise:Promise;
    datecloture : Date;
    cloture : boolean;
    archive : string ;
    modifiedAt :Date;
    penalty :number;

}