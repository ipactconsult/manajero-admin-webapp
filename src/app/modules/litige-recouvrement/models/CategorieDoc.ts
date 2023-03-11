import { Loi } from "./Loi";

export class CategorieDoc{
    id: string;
    categoriename: string;
    lois: Array<Loi>;
    description : string ;
    archive: string;

    
    constructor (
        id? : string,
        categoriename? : string,
        lois? :Array<Loi>,
        description? :string, 


    ){}
}