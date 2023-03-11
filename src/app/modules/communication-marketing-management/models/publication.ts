import { GraphicalCharter } from "./graphical-charter";
import { Persona } from "./persona";

export class Publication {
    id : String ;
    title : String ;
    description  : String ; 
    hastag : String ;
    content  : String ;
    briefingType  : String ;
    tags  : String ;
    socialMedia  : String ;
    dateFin  : Date; 
    dateDebut  : Date;
    type : String  ;
    personas :Persona[];
    graphicalCharter :   GraphicalCharter ;
   archive : boolean ;




}
