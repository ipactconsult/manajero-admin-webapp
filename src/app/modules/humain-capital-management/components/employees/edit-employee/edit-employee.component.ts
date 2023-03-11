import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { NbToastrConfig, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { Department } from '../../../models/Department';
import { Employee } from '../../../models/Employee';
import { DepartmentService } from '../../../services/departmentservices/department.service';
import { EmployeeService } from '../../../services/employeeServices/employee.service';
import GoogleCountries from "../../../services/googlecountries.json";
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'ngx-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  //titleFirebase = 'fire-base-angular';
  selectedFile: File = null;
  downloadURL: Observable<string>;
  loading = false;
  
  countries : any [] = [];
  listDepts : Department [] = [];
  employee : Employee = new Employee();
  personal_form: FormGroup = new FormGroup({});

  config : NbToastrConfig;
  title = 'Update Employee';
  content = 'Operation achieved, reload your page';
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
 
  dep: Department= new Department();
  id : string="";
  selectedItem: string= "";
  constructor(private storage: AngularFireStorage,private route : ActivatedRoute, private fb: FormBuilder, private ds :   DepartmentService, 
    private es: EmployeeService, private toastrService: NbToastrService) { 
      this.personal_form = new FormGroup({
        employeeReference :  new FormControl('',[Validators.pattern("^[0-9]*$")]),
        employeeName :  new FormControl('',[Validators.pattern("^[a-zA-Z ]*")]),
        employeeProfileImage : new FormControl(''),
        employeePasseport : new FormControl('',[Validators.pattern("^[0-9]*$")]),
        employeeGender : new FormControl('',[Validators.required]),
        employeeEducation : new FormControl('',[Validators.required]),
        employeeDateOfBirth : new FormControl('',[Validators.required]),
        employeeDrivingLicence :  new FormControl(''),
        employeeCity :  new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z ]*")]),
        employeeCountry : new FormControl('',[Validators.required]),
        employeeNationality :  new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z ]*")]),
        roleEmployee : new FormControl('',[Validators.required]),

        employeeEmail : new FormControl('',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        employeeCellPhone : new FormControl (''),
        
        department :  new FormControl(''),


        employeeSocialSecurity :  new FormControl('',[Validators.pattern("^[a-zA-Z ]*")]),
        employeeMaritalStatus :  new FormControl('',[Validators.pattern("^[a-zA-Z ]*")]),
        employeeNbKids : new FormControl('',[Validators.pattern("^[0-9]*$")]),

        employeeBloodType:  new FormControl(''),
        employeeHealthProblem: new FormControl('',[Validators.pattern("^[a-zA-Z ]*")]),


        employeeContractInfo:  new FormControl('',[Validators.pattern("^[a-zA-Z ]*")]),
        employeeTerminationDate: new FormControl(''),
        employeeTerminationReason: new FormControl('',[Validators.pattern("^[a-zA-Z ]*")]),
      
  });
     
    }

  ngOnInit(): void {
    this.countries = GoogleCountries;
    this.loadDepartment(); 
    this.employee = new Employee();
    this.id = this.route.snapshot.params["id"];

    this.selectedItem= this.employee?.department?.id;
    this.es.getEmployee(this.id).subscribe(data=>{
      this.employee = data;
    }, error => console.log(error)
    )
   
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
  return this.personal_form.get('employeeEmail');
}

get employeeCellPhone() { //done
  return this.personal_form.get('employeeCellPhone');
}

get department() { //done

  return this.personal_form.get('department');
}


get employeeSocialSecurity() { //done
  return this.personal_form.get('employeeSocialSecurity');
}


get employeeMaritalStatus() { //done
  return this.personal_form.get('employeeMaritalStatus');
}


get employeeNbKids() { //done
  return this.personal_form.get('employeeNbKids');
}

get employeeBloodType() { //done
  return this.personal_form.get('employeeBloodType');
}

get employeeHealthProblem() { //done
  return this.personal_form.get('employeeHealthProblem');
}

get employeeContractInfo() { //done
  return this.personal_form.get('employeeContractInfo');
}


get employeeTerminationDate() { //done
  return this.personal_form.get('employeeTerminationDate');
}


get employeeTerminationReason() { //done
  return this.personal_form.get('employeeTerminationReason');
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
  updateEmployee(){  
    
     this.dep.id=this.selectedItem;
     this.employee.department= <Department>{id:this.selectedItem};
  //  this.employee.employeeProfileImage = this.__fireBase;
    
    this.es.updateEmployee(this.id,this.employee).subscribe(
      (res) => {  
       
        this.showToast('success','SUCCESS','Update Successfuly');
    }, (err) => {
       
        this.showToast('danger','FAILURE','Could not update employee');
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
              this.employee.employeeProfileImage = url;
}
         //   this.employee.employeeProfileImage=this.__fireBase;
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
