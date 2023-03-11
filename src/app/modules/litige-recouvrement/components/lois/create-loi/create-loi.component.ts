import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loi } from '../../../models/Loi';
import { LoiService } from '../../../services/lois/loi.service';
import { AngularFireStorage } from '@angular/fire/storage'


import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { CategorieDoc } from '../../../models/CategorieDoc';
import { CategorieService } from '../../../services/categorie/categorie.service';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'ngx-create-loi',
  templateUrl: './create-loi.component.html',
  styleUrls: ['./create-loi.component.scss']
})
export class CreateLoiComponent implements OnInit {
  createProjectCharterform: FormGroup;
  config: NbToastrConfig;
  title = 'fire-base-angular';
  filePath: String = "";

  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;


  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : "";

    this.index += 1;
    this.toastrService.show(body, `Toast ${this.index}${titleContent}`, config);
  }
  selectedFile: File;

  @Input() l: Loi;
  list_cat: CategorieDoc[] = [];
  list_loi: Loi[] = [];
  newLoi = null;
  cat: string;
  categorie;


  cate: CategorieDoc = new CategorieDoc();
  selectedItem: string = "";
  loi: Loi = new Loi();
  constructor(private router: Router, private cs: LoiService,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private ds: CategorieService,
    private afStorage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
    this.loadDataLaws();



    const formcontrols = {
      docName: new FormControl("", [Validators.pattern("^[a-zA-Z ]*")]),
      docType: new FormControl("", [Validators.pattern("^[a-zA-Z ]*")]),
      file: new FormControl("", [Validators.required]),
      cat: new FormControl("", [Validators.required]),

    };
    this.createProjectCharterform = this.fb.group(formcontrols);
  }
  OnChange($event) {
    this.selectedFile = $event.target.files[0];

  }
  upload(event: any) {
    this.filePath = event.target.files[0]

  }
  onFileChanged(event) {


  }


  loadDataLaws() {
    this.ds.getAllCategories().subscribe(
      (data: CategorieDoc[]) => {
        this.list_cat = data;
        this.selectedItem = data[0].categoriename
      }, (err) => {
        console.log(err);
      },
    );
  }

  getSelectedCategory(event) {
   /* this.cat = event.target.value;
    this.ds.getCategorieByid(this.cat).subscribe((category) => {
      this.categorie = category;
      console.log(this.categorie);
    }, error => {

      console.log(error);
    });*/
    this.selectedItem=event ;
    console.log(this.selectedItem);

  }


  storeLoi() {
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
          this.newLoi = {

            docName: this.createProjectCharterform.value.docName,
            docType: this.createProjectCharterform.value.docType,
            file: this.filePath,
            cat: this.cate

          }
          this.cs.addLoi(this.newLoi).subscribe(
            () => {
              this.showToast('success', 'SUCCESS', 'Created Successfuly'); console.log(this.loi);
              ; this.router.navigate(['/litige/listloi'])
            },
            () => {
              this.showToast('danger', 'FAILURE', 'Could not create law');
              this.router.navigate(['/litige/listloi'])
            }
      
          )


        });
      })
    ).subscribe();

 

  }

}




