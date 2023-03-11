import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrConfig, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Department } from '../../../../models/Department';
import { SubDepartment } from '../../../../models/SubDepartment';
import { DepartmentService } from '../../../../services/departmentservices/department.service';
import { SubDepartmentService } from '../../../../services/departmentservices/subDepartmentService/sub-department.service';

@Component({
  selector: 'ngx-edit-sub-department',
  templateUrl: './edit-sub-department.component.html',
  styleUrls: ['./edit-sub-department.component.scss']
})
export class EditSubDepartmentComponent implements OnInit {

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
  dept : Department = new Department();
  selectedItem: string="" ;
  searchbyfields : string;

  id: string="";

  subForm : FormGroup = new FormGroup({}) ;
  constructor(private route: ActivatedRoute,private router:Router,private toastrService: NbToastrService, private ds: DepartmentService, private sds: SubDepartmentService) { 
    this.subForm = new FormGroup({
      subDepartmentName: new FormControl('',[Validators.required]),
      department : new FormControl('',[Validators.required])
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
    this.subDept = new SubDepartment();
    this.id = this.route.snapshot.params["id"];

    this.sds.getSubDepartment(this.id).subscribe(data=>{
      console.log(data)
      this.subDept = data;
    }, error => console.log(error)
    )
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
  console.log(this.selectedItem);

}

updateSubDepartment(){
  this.dept.id = this.selectedItem;
  this.subDept.department = this.dept;
  this.sds.updateSubDepartment(this.id,this.subDept).subscribe(
    ()=>{this.showToast('success','SUCCESS','Updated Successfuly');
    ;
    //this.router.navigate(['/hr/department/list'])
  },
    ()=>{this.showToast('danger','FAILURE','Could not edit Sub department');}
  )
}


}
