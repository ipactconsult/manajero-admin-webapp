import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { TokenStorageService } from '../../../../auth/service/token/token.service';
import { Department } from '../../../models/Department';
import { Employee } from '../../../models/Employee';
import { Level } from '../../../models/Level';
import { DepartmentService } from '../../../services/departmentservices/department.service';
import { EmployeeService } from '../../../services/employeeServices/employee.service';
import { LevelService } from '../../../services/levelServices/level.service';

@Component({
  selector: 'ngx-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.scss'],
})
export class CreateDepartmentComponent implements OnInit {

  config : NbToastrConfig;
  title = 'Create Department';
  content = 'Operation achieved, reload your page';
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;

   
  @Input() d: Department;
  @Output() addDep = new EventEmitter<Department>();
  
  dept : Department= new Department();
  listDepts : Department [] = [];
  listEmps:Employee[]= [];
  listLvls: Level []=[];
  selectedItem :any [] = [];
  employeeSelected: string ="";
  emp: Employee = new Employee();
  levelSelected: string="";
  level_: Level = new Level();
  department_form: FormGroup;
  user : any;



  constructor( private tokenStorageService: TokenStorageService,
    private ls:LevelService, private fb : FormBuilder,private es:EmployeeService, private ds: DepartmentService, private router: Router,private toastrService: NbToastrService) { 
    this.department_form = this.fb.group({
      departmentReference : [''],
      departmentName :  [''],   
     // employee:[''],
      level:['']   
    })
  }

  onDepartmentFormSubmit() {
    this.department_form.markAsDirty();
  }

  ngOnInit(): void {
    this.loadDataDepts();
    this.loadDataEmps();  
    this.loadDataLvls();  

    this.user = this.tokenStorageService.getUser();
  }

  getEmployeeSelected(event){
    this.employeeSelected = event;
  }
  getLevelSelected(event){
    this.levelSelected = event;
  }
  storeDept(){
  //  this.emp.id = this.employeeSelected;
 //   this.dept.employee = this.emp;
    this.level_.id = this.levelSelected;
    this.dept.level = this.level_;

    this.dept.user =  this.user.email;
    this.ds.addDepartment(this.dept).subscribe(
      (res) => {  
      
        this.showToast('success','SUCESS','Created Successfuly');
        this.department_form.reset();
        this.router.navigate(["/hr/department/list"]);
    }, (err) => {
        console.log(err);
        this.showToast('danger','FAILURE','Could not create department');
    }
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

  loadDataDepts(){
    this.ds.findAllDepts().subscribe(
      (data: Department[]) => { 
        this.listDepts = data;       
      } , (err) => {
          console.log(err);
      },
    );
  }

  loadDataLvls(){
    this.ls.findAll().subscribe(
      (data: Level[]) => { 
        this.listLvls = data;       
      } , (err) => {
          console.log(err);
      },
    );
  }

  loadDataEmps(){
    this.es.findAllEmployeesAsc().subscribe(
      (data: Employee[]) => { 
        this.listEmps = data.filter((e)=>e.roleEmployee === 'Manager');       
      } , (err) => {
          console.log(err);
      },
    );
  }
  get departmentReference(){
    return this.department_form.get('departmentReference');
  }
  get departmentName(){
    return this.department_form.get('departmentName');
  }
  get subdepartments(){
    return this.department_form.get('subdepartments');
  }

  get employee(){
    return this.department_form.get('employee');
  }

  get level(){
    return this.department_form.get('level');
  }

  toggle(event){
    this.selectedItem.push(event);
  }


  

}
