import { CategorieDoc } from '../../../modules/litige-recouvrement/models/CategorieDoc';
import { CategorieService } from '../services/categorie/categorie.service';

export function removeElementFromArray(arr: any[], id:any){
    return arr.filter(function(element){ 
        return element.id != id; 
    });   
}

export function truncate_with_ellipsis(s) {
  if (s.length > 20) {
     return s.substring(0, 30) + '...';
  }
  return s;
};



export function filtre(e : any,x : any,cs:CategorieService) {
  let CategorieList:CategorieDoc[]=[]
    cs.getAllCategories().subscribe(
      (data: CategorieDoc[]) => {
      CategorieList = []
        console.log(e);
       CategorieList = data.filter(
          (cat =>
              x == 'categoriename' ? cat.categoriename === e : null
          )

        )
      }, (err) => {
        return err;
      })

  }