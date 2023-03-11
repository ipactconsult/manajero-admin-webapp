import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { CategorieDoc } from '../../../models/CategorieDoc';
import { Loi } from '../../../models/Loi';
import { CategorieService } from '../../../services/categorie/categorie.service';
import { LoiService } from '../../../services/lois/loi.service';
import { AngularFireStorage } from '@angular/fire/storage'
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'ngx-updateloi',
  templateUrl: './updateloi.component.html',
  styleUrls: ['./updateloi.component.scss']
})
export class UpdateloiComponent implements OnInit {

  createProjectCharterform: FormGroup;

  config : NbToastrConfig;
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  loi : Loi;
  id: string;
  updateloi ;
  cat: string;
  categorie;
  list_cat: CategorieDoc[] = [];
  filePath: String = "";
  selectedFile: File;

  cate: CategorieDoc = new CategorieDoc();
  selectedItem: string = "";


  constructor(private ds: LoiService,private cs : CategorieService, private toastrService : NbToastrService,  private fb: FormBuilder,
    private route: ActivatedRoute, private router : Router,private afStorage: AngularFireStorage
    ) { 

     


    }

  ngOnInit(): void {
    this.loadDataLaws();

    const formcontrols = {
      docName: new FormControl("", [Validators.pattern("^[a-zA-Z ]*")]),
      docType: new FormControl("", [Validators.pattern("^[a-zA-Z ]*")]),
      file: new FormControl("", [Validators.required]),
      cat: new FormControl("", [Validators.required]),

    };
    this.createProjectCharterform = this.fb.group(formcontrols);
    this.loi = new Loi();
    this.id = this.route.snapshot.params["id"];

    this.ds.getLoiByid(this.id).subscribe(data=>{
      this.loi = data;
    }, error => console.log(error)
    )
  }
  

  updateLoi(loid: string): void{
    this.cate.id=this.selectedItem
    this.loi.cat=this.cate 
    const filename = 'images' + Math.random()
    const filePath = `images/${filename}`;
    const storageRef = this.afStorage.ref(filePath);
    const uploadTask = this.afStorage.upload(filePath, this.filePath);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          this.filePath = downloadURL;
          this.updateloi = {

            docName: this.createProjectCharterform.value.docName,
            docType: this.createProjectCharterform.value.docType,
            file: this.filePath,
            cat: this.cate

          }
          this.ds.updateLoi(loid, this.updateloi).subscribe(
            () => {
              this.showToast('success', 'SUCCESS', 'Update Successfuly'); console.log(this.loi);
              ; this.router.navigate(['/litige/listloi'])
            },
            () => {
              this.showToast('danger', 'FAILURE', 'Could not update law');
              this.router.navigate(['/litige/listloi'])
            }
      
          )


        });
      })
    ).subscribe();/*
    const filename = 'images' + Math.random() + this.filePath

    this.afStorage.upload(`/${filename}`, this.filePath).then(() => {
    this.updateloi ={
      docName: this.createProjectCharterform.value.docName,
      docType: this.createProjectCharterform.value.docType,
      file: this.createProjectCharterform.value.file,
      cat: this.categorie
   
    };
    this.updateloi.file = filename;

    this.ds.updateLoi(loid, this.updateloi).subscribe(
      (res) => {  
        console.log(res);
        this.showToast('success','SUCESS','Data Updated Successfuly');
        this.loi = new Loi();
        this.router.navigate(['/litige/listloi']);
    }, (err) => {
        console.log(err);
        this.showToast('danger','FAILURE','Could not Update Law');
    }
    )
  });*/
}
 

  onClick(){
    this.updateLoi(this.loi.id);
  }
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
    };
    const titleContent = title ? `. ${title}` : '';
    this.toastrService.show(
      body,
      `Toast ${titleContent}`,
      config);
  }
  loadDataLaws() {
    this.cs.getAllCategories().subscribe(
      (data: CategorieDoc[]) => {
        this.list_cat = data;
        this.selectedItem = data[0].categoriename
      }, (err) => {
        console.log(err);
      },
    );
  }
  OnChange($event) {
    this.selectedFile = $event.target.files[0];

  }
  upload(event: any) {
    this.filePath = event.target.files[0]

  }
  getSelectedCategory(event): void {
    /*
    this.cat = event.target.value;
    this.cs.getCategorieByid(this.cat).subscribe((category) => {
      this.categorie = category;
      console.log(this.categorie);
    }, error => {
      console.log(error);
    });
  }
*/
this.selectedItem=event ;
console.log(this.selectedItem);
}
}
