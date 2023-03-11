import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../../../auth/service/token/token.service';
import { Employee } from '../../../models/Employee';
import { Evaluation } from '../../../models/Evaluation';
import { EmployeeService } from '../../../services/employeeServices/employee.service';
import {EvaluationService} from '../../../services/EvaluationService/evaluation.service';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'ngx-add-evaluation',
  templateUrl: './add-evaluation.component.html',
  styleUrls: ['./add-evaluation.component.scss']
})
export class AddEvaluationComponent implements OnInit {

  config : NbToastrConfig;
  title = 'Create New Evaluation';
  content = 'Operation achieved';
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;

  selectedFile: File = null;
  __fireBase;
  downloadURL: Observable<string>;
  
  evaluation : Evaluation = new Evaluation();
  emp : Employee = new Employee();
  employees : Employee[]=[];
  user : any;
  evaluationForm : FormGroup;
  selectedItem : string = "";

  loading : boolean = false;

  constructor(private storage: AngularFireStorage,private router : Router, private toastrService : NbToastrService, private es : EmployeeService, private tokenStorageService: TokenStorageService,private evaluationService : EvaluationService) { }

  ngOnInit(): void {
    this.evaluationForm = new FormGroup
    ({
      employee : new FormControl(''),
      evaluationType : new FormControl(''),
      limitDate : new FormControl(''),
      attachmentEvaluation : new FormControl(''),
      status : new FormControl('')
    });

    this.getAllEmps();
    this.user = this.tokenStorageService.getUser();
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
    };
    const titleContent = title ? ` ${title}` : '';
    this.toastrService.show(
      body,
      ` ${titleContent}`,
      config);
  }

  getAllEmps() {
    this.es.findAll().subscribe(
      (data: Employee[]) => { this.employees = data  }, (err) => {
        console.log(err);
      },
    );
  }

  get evaluationType(){return this.evaluationForm.get('evaluationType');}
  get limitDate(){return this.evaluationForm.get('evaluationType');}
  get attachmentEvaluation(){return this.evaluationForm.get('evaluationType');}


  getEmployeeSelected(event){
    this.showToast('success','SUCESS','Employee Selected');
    this.selectedItem=event;
    console.log(this.selectedItem);

    
    
  }

  addNew()
  {
   
    this.evaluation.user =  this.user.email;
    this.evaluationService.add(this.evaluation, this.selectedItem).subscribe(()=>{
      this.showToast('success','SUCESS','Created Successfuly');
      this.router.navigate(["/hr/evaluation/grid"]).then(()=>{
          
      })
    },(err)=>{console.log(err);})
  }

  toggleLoadingAnimation(event) {
    this.loading = true;
    this.onFileSelected(event);
    this.showToast('success','SUCESS','Uploaded Successfuly');
    setTimeout(() => this.loading = false, 3000);
  }

  onFileSelected(event)
  { 
    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `employees/${n}`;
    const fileRef = this.storage.ref(filePath); const task=this.storage.upload(`employees/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {if (url) {
            this.__fireBase = url;
          }
            this.evaluation.attachmentEvaluation=this.__fireBase;
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log('url',url);
        }
      });
  }

}
