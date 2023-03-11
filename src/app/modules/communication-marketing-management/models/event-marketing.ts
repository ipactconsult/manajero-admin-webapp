import { Parternership } from "./parternership";
import { Persona } from "./persona";

export class EventMarketing {

    id : String ;
    title  : String ;
    description  : String ;
    date  : Date;
    prix  : number ;
    adresse  : String;
    ville :  String ; 
    image : String ;
    time : String;
    country : String;
    nombre : number;
    archive : boolean ;

    personas :Persona[];
    partners : Parternership[];
}
