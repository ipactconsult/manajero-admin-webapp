import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService, NbWindowService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { ThreeColumnsLayoutComponent } from '../../../../../@theme/layouts';
import { CategorieDoc } from '../../../models/CategorieDoc';
import { Loi } from '../../../models/Loi';
import { CategorieService } from '../../../services/categorie/categorie.service';
import { LoiService } from '../../../services/lois/loi.service';

@Component({
  selector: 'ngx-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {
  CategorieList: CategorieDoc[];
  categorie: CategorieDoc = new CategorieDoc();
  config: NbToastrConfig;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  search: string="";
  names : any [] = [];
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  @Output() addCategoryOutputEvent = new EventEmitter<CategorieDoc>();
  current : number = 1;
  preventDuplicates = false;
  status: NbComponentStatus= 'primary';
  LoiCaList:Loi[];
  title = 'HI there!';
  content = `I'm cool toaster!`;

  constructor(private cs: CategorieService ,private ds: LoiService, private dialogService: NbDialogService,
    private router: Router, private windowService: NbWindowService,
    private toastrService: NbToastrService) { }


  ngOnInit(): void {
    this.cs.getAllCategories().subscribe((response:CategorieDoc[])  =>
    
      this.CategorieList=  response

      );

  }
  filtre(e,x) {
    this.cs.getAllCategories().subscribe(
      (data: CategorieDoc[]) => {
        this.CategorieList = []
        console.log(e);
        this.CategorieList = data.filter(
          (cat =>
              x == 'categoriename' ? cat.categoriename === e : null
          )

        )
      }, (err) => {
        return err;
      })

  }

  getCategoryByTitle(e,x) {
    this.filtre(e,x);
}

  async GetbyCategory(name:string){
    console.log(name);
     this.ds.GetLoibyCategory(name).subscribe((res) => {
    this.LoiCaList = res;
  }); 
  /* let loiCaList = this.ds.GetLoibyCategory(name); */
   console.log(this.LoiCaList); 




  }  
  add_categorie(c: CategorieDoc) {
    this.addCategoryOutputEvent.emit(c);
  }
 
  openWindow2(contentTemplate) {
    this.windowService.open(
      contentTemplate,
      {
        title: 'Update New Category',
      },
    );
  }
  getAll() {
    this.cs.getAllCategories().subscribe(
      (data: CategorieDoc[]) => { this.CategorieList = data;  }, (err) => {
        console.log(err);
      },
    );
  }
  getCategorieDesc(){
    this.cs.findAllCategorieDesc().subscribe(
      (data: CategorieDoc[]) => { this.CategorieList = data;  }, (err) => {
        console.log(err);
      },
    );
  
  }
getCategorieAsc(){

  this.cs.findAllCategorieAsc().subscribe(
    (data: CategorieDoc[]) => { this.CategorieList = data;  }, (err) => {
      console.log(err);
    },
  );

}

  openWindow(contentTemplate) {
    this.windowService.open(
      contentTemplate,
      {
        title: 'Add New Category',
      },
    );
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {context: 'Are you sure to delete this Category ?'});
  }

  
  onDeleteConfirm(cate :CategorieDoc) {
    console.log("hello")

    this.cs.deleteCategorie(cate).subscribe(
      (result) => {
        this.showToast('success','SUCESS','Deleted Successfuly');
        window.location.reload();
      }, (err)=> {
        this.showToast('danger','FAILURE','Could not delete category');
        console.log(err);
      }
    )

  }



  addAvocat(event) {
    this.cs.addCategorie(event.newData).subscribe(result => {
        this.showToast("success", "Add !!", "Category Added successffully  !!");
        event.confirm.resolve(event.newData);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.showToast("danger", "Add !!", err.error.message);

        } else {
          this.showToast("danger", "Add !!", err.error.message);

        }
      });
  }

 

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `Toast ${this.index}${titleContent}`,
      config);
  }


}
