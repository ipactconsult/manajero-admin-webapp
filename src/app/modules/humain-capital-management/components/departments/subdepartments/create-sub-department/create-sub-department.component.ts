import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { TokenStorageService } from '../../../../../auth/service/token/token.service';
import { Department } from '../../../../models/Department';
import { SubDepartment } from '../../../../models/SubDepartment';
import { DepartmentService } from '../../../../services/departmentservices/department.service';
import { SubDepartmentService } from '../../../../services/departmentservices/subDepartmentService/sub-department.service';

@Component({
  selector: 'ngx-create-sub-department',
  templateUrl: './create-sub-department.component.html',
  styleUrls: ['./create-sub-department.component.scss']
})
export class CreateSubDepartmentComponent implements OnInit {

  config : NbToastrConfig;
  title = 'Create Department';
  content = 'Operation achieved, reload your page';
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;

  @Input() sub : SubDepartment;
  subDept : SubDepartment = new SubDepartment();
  list_dept : Department [] = [];
  list_sub_dept : SubDepartment [] = [];
   dept : Department = new Department();
  selectedItem: string="" ;
  searchbyfields : string;

  subForm : FormGroup = new FormGroup({}) ;

  user : any;
  constructor( private tokenStorageService: TokenStorageService,private router:Router,private toastrService: NbToastrService, private ds: DepartmentService, private sds: SubDepartmentService) { 
    this.subForm = new FormGroup({
      subDepartmentName: new FormControl(''),
      department : new FormControl(''),
    })
  }

  onSubDepartmentFormSubmit(){
    this.subForm.markAsDirty();
  }

  loadDataDepts(){
    this.ds.findAllDepts().subscribe(
      (data: Department[]) => { 
        this.list_dept = data;
        this.selectedItem = data[0].departmentName  
      } , (err) => {
          console.log(err);
      },
    );
  }

 

  ngOnInit(): void {
    this.loadDataDepts();
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

  get subDepartmentName(){
    return this.subForm.get('subDepartmentName');
  }


get department() { 

  return this.subForm.get('department');
}

getDepartmentSelected(event){
  this.selectedItem=event;
}

storeSubDepartment(){
  this.dept.id = this.selectedItem;
  this.subDept.department = this.dept;
  this.subDept.user =  this.user.email;

  this.sds.addSubDepartment(this.subDept).subscribe(
    ()=>{this.showToast('success','SUCCESS','Created Successfuly');
    ;
    //this.router.navigate(['/hr/department/list'])
  },
    ()=>{this.showToast('danger','FAILURE','Could not create Sub department');}
  )
}

  

}
