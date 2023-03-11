import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Department } from '../../../models/Department';
import { Employee } from '../../../models/Employee';
import { DepartmentService } from '../../../services/departmentservices/department.service';
import { EmployeeService } from '../../../services/employeeServices/employee.service';
import GoogleCountries from "../../../services/googlecountries.json";
import Nationalities from "../../../services/nationalities.json";
import {Router} from "@angular/router";
import { TokenStorageService } from '../../../../auth/service/token/token.service';

@Component({
  selector: 'ngx-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})

export class CreateEmployeeComponent implements OnInit{


  __id; //for employee

  selectedFile: File = null;
  __fireBase;
  downloadURL: Observable<string>;
  
  cell1TelInput: any = {
    initialCountry: 'tn',
    autoPlaceholder: 'polite',
    nationalMode : true,
  };
  hasErr: boolean;
  prefixPhoneSupp: String = '';
  countries : any [] = [];
  nationalities : any []=[];

  listDepts : Department [] = [];
  employee : Employee = new Employee();
  personal_form: FormGroup = new FormGroup({});
  contact_form: FormGroup =  new FormGroup({});
  department_form: FormGroup = new FormGroup({});
  social_security_form: FormGroup = new FormGroup({});
  health_problem_form: FormGroup = new FormGroup({});
  contract_form : FormGroup = new FormGroup({});
  config : NbToastrConfig;
  title = 'Create Department';
  content = 'Operation achieved, reload your page';
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;

  dep: Department= new Department();

  selectedItem: string= "";
  selectRole : string="";

  loading = false;
  
  user : any;


  roles : any[]=[];
  
  constructor(private tokenStorageService: TokenStorageService,private router:Router, private storage: AngularFireStorage, private ds :   DepartmentService,
              private es: EmployeeService, private toastrService: NbToastrService) {
    this.personal_form = new FormGroup({
      employeeReference :  new FormControl('',/*[Validators.pattern("^[0-9]*$")]*/),
      employeeName :  new FormControl('',/*[Validators.pattern("^[a-zA-Z ]*")]*/),
      employeeProfileImage : new FormControl(''),
      employeePasseport : new FormControl('',/* [Validators.pattern("^[0-9]*$")] */),
      employeeGender : new FormControl(''),
      employeeEducation : new FormControl(''),
      employeeDateOfBirth : new FormControl(''),
      employeeDrivingLicence :  new FormControl(''),
      employeeCity :  new FormControl('',/*[Validators.pattern("^[a-zA-Z ]*")]*/),
      employeeCountry : new FormControl(''),
      employeeNationality :  new FormControl('',/*[Validators.pattern("^[a-zA-Z ]*")]*/),
      roleEmployee : new FormControl(''),

      contact_form : new FormGroup({
        employeeEmail : new FormControl('',/*[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]*/),
        employeeCellPhone : new FormControl (''),
      }),

      department_form : new FormGroup({
        department :  new FormControl(''),
      }),

      social_security_form :new FormGroup({
        employeeSocialSecurity :  new FormControl('',/*[Validators.pattern("^[a-zA-Z ]*")]*/),
        employeeMaritalStatus :  new FormControl('',[Validators.pattern("^[a-zA-Z ]*")]),
        employeeNbKids : new FormControl('',/*[Validators.pattern("^[0-9]*$")]*/),
      }),
      health_problem_form : new FormGroup({
        employeeBloodType:  new FormControl(''),
        employeeHealthProblem: new FormControl('',/*[Validators.pattern("^[a-zA-Z ]*")]*/),

      }),
      contract_form : new FormGroup({
        employeeContractInfo:  new FormControl('',/*[Validators.pattern("^[a-zA-Z ]*")]*/),
        employeeTerminationDate: new FormControl(''),
        employeeTerminationReason: new FormControl('',/*[Validators.pattern("^[a-zA-Z ]*")]*/),
      }),

    });
  }


  getRoles()
  {
    this.es.getAllRoles().subscribe(
      (data: any[]) => {
        this.roles = data;
        this.selectRole= data[0].name;
      } , (err) => {
        console.log(err);
      },
    );
  }

  ngOnInit(): void {
    this.countries = GoogleCountries;
    this.nationalities= Nationalities;

    this.loadDepartment();
    this.user = this.tokenStorageService.getUser();
   // this.matriculate = this.tokenStorageService.

    this.getRoles();



  }

  onCountryChange(event): void {
    this.prefixPhoneSupp = event.dialCode;
  }

  get employeeReference() { //done
    return this.personal_form.get('employeeReference');
  }

  get employeeName() { //done
    return this.personal_form.get('employeeName');
  }

  get employeeProfileImage() { //done
    return this.personal_form.get('employeeProfileImage');
  }

  get employeePasseport() { //done
    return this.personal_form.get('employeePasseport');
  }


  get employeeEducation() { //done
    return this.personal_form.get('employeeEducation');
  }
  
  get employeeGender() { //done
    return this.personal_form.get('employeeGender');
  }

  get employeeDateOfBirth() { //done
    return this.personal_form.get('employeeDateOfBirth');
  }

  get employeeCountry() { //done
    return this.personal_form.get('employeeCountry');
  }

  get employeeCity() { //done
    return this.personal_form.get('employeeCity');
  }

  get employeeNationality() { //done
    return this.personal_form.get('employeeNationality');
  }

  get roleEmployee() { //done
    return this.personal_form.get('roleEmployee');
  }

  get employeeDrivingLicence() { //done
    return this.personal_form.get('employeeDrivingLicence');
  }

  get employeeEmail() { //done
    return this.personal_form.get('contact_form').get('employeeEmail');
  }

  get employeeCellPhone() { //done
    return this.personal_form.get('contact_form').get('employeeCellPhone');
  }

  get department() { //done

    return this.personal_form.get('department_form').get('department');
  }


  get employeeSocialSecurity() { //done
    return this.personal_form.get('social_security_form').get('employeeSocialSecurity');
  }


  get employeeMaritalStatus() { //done
    return this.personal_form.get('social_security_form').get('employeeMaritalStatus');
  }


  get employeeNbKids() { //done
    return this.personal_form.get('social_security_form').get('employeeNbKids');
  }

  get employeeBloodType() { //done
    return this.personal_form.get('health_problem_form').get('employeeBloodType');
  }

  get employeeHealthProblem() { //done
    return this.personal_form.get('health_problem_form').get('employeeHealthProblem');
  }

  get employeeContractInfo() { //done
    return this.personal_form.get('contract_form').get('employeeContractInfo');
  }


  get employeeTerminationDate() { //done
    return this.personal_form.get('contract_form').get('employeeTerminationDate');
  }


  get employeeTerminationReason() { //done
    return this.personal_form.get('contract_form').get('employeeTerminationReason');
  }

  onPersonalFormSubmit() {

    this.personal_form.markAsDirty();
  }

  onContactFormSubmit() {
    this.personal_form.markAsDirty();
  }

  getDepartmentSelected(event){
    this.selectedItem=event;

  }
  onDepartmentFormSubmit() {
    this.personal_form.markAsDirty();
  }

  onSocialFormSubmit() {
    this.personal_form.markAsDirty();
  }

  onHealthFormSubmit() {
    this.personal_form.markAsDirty();
  }

  onContractFormSubmit() {
    this.personal_form.markAsDirty();
  }


  loadDepartment(){
    this.ds.findAllDepts().subscribe(
      (data: Department[]) => {
        this.listDepts = data;
        this.selectedItem= data[0].departmentName ;
      } , (err) => {
        console.log(err);
      },
    );
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
      `Employee ${titleContent}`,
      config);
  }
  
  storeEmployee(){
    this.dep.id=this.selectedItem;
    this.employee.department= this.dep;
    this.employee.employeeProfileImage = this.__fireBase;
    this.employee.user =  this.user.email;
    this.es.addEmployee(this.employee).subscribe(
      (res) => {

        this.showToast('success','SUCESS','Created Successfuly');
       this.__id =  res.id;
      }, (err) => {

        this.showToast('danger','FAILURE','Could not create employee');
      }
    )
  }

  toggleLoadingAnimation(event) {
    this.loading = true;
    this.onFileSelected(event);
    setTimeout(() => this.loading = false, 3000);
  }

  onFileSelected(event)
  { const n = Date.now();
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
            this.employee.employeeProfileImage=this.__fireBase;
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log('url',url);
        }
      });
  }

inviteEmployee(){
 const currentUser= this.tokenStorageService.getUser();

  this.es.invite(this.employee.employeeEmail,currentUser.matriculate,this.employee.roleEmployee).subscribe({
    error:(error)=>{
    console.log(error);

    }
  })
}
 
  
}
