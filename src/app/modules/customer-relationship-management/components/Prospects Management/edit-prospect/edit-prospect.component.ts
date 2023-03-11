import { Component, OnInit } from '@angular/core';
import {Customer} from '../../../models/Customer';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../../services/customers/customer.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Employee} from '../../../../humain-capital-management/models/Employee';
import {EmployeeService} from '../../../../humain-capital-management/services/employeeServices/employee.service';
import GoogleCountries from '../../../../humain-capital-management/services/googlecountries.json';

@Component({
  selector: 'ngx-edit-prospect',
  templateUrl: './edit-prospect.component.html',
  styleUrls: ['./edit-prospect.component.scss']
})
export class EditProspectComponent implements OnInit {

  //countries declaration list
 countries: any [] = [];
 
 //instanciate customer 
  customer: Customer = new Customer();
  
  //customer form group declaration
  customerGroup: FormGroup;
  
  //id to get for routing
  idUri = '';
  
  //toast config variables
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  
  //variable declaration for employees data
  list: Employee[] = [];
  selectedEmployee: string = '';
  employeeToStore: any;
  
  //file selection variable for firebase
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  
  //menu select status options for customer
  options = [
    {key: 1, value: 'Prospect'},
    {key: 2, value: 'Lead'},
    {key: 3, value: 'Client'},
  ];
  selectedOption = this.options['prospect'];

  constructor(private router: Router, private cs: CustomerService, private storage: AngularFireStorage,
              private toastrService: NbToastrService, private activatedroute: ActivatedRoute,
             private es: EmployeeService) {
    
    //initializing form group with controls 
    this.customerGroup = new FormGroup({
      image: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      secondPhone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      workEmail: new FormControl('', [Validators.required, Validators.email]),
      contactType: new FormControl(''),
      fax: new FormControl(''),
      workWebsite: new FormControl(''),
      description: new FormControl(''),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      assignee: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      linkedinUrl: new FormControl(''),
      active: new FormControl(''),
      status: new FormControl('', [Validators.required]),

    });
  }

  get image() {
    return this.customerGroup.get('image');
  }

  get name() {
    return this.customerGroup.get('name');
  }

  get title() {
    return this.customerGroup.get('title');
  }

  get phone() {
    return this.customerGroup.get('phone');
  }
  get secondPhone() {
    return this.customerGroup.get('secondPhone');
  }

  get workEmail() {
    return this.customerGroup.get('workEmail');
  }

  get contactType() {
    return this.customerGroup.get('contactType');
  }

  get fax() {
    return this.customerGroup.get('fax');
  }

  get workWebsite() {
    return this.customerGroup.get('workWebsite');
  }

  get description() {
    return this.customerGroup.get('description');
  }

  get address() {
    return this.customerGroup.get('address');
  }

  get city() {
    return this.customerGroup.get('city');
  }

  get assignee() {
    return this.customerGroup.get('assignee');
  }

  get country() {
    return this.customerGroup.get('country');
  }

  get linkedinUrl() {
    return this.customerGroup.get('linkedinUrl');
  }

  get active() {
    return this.customerGroup.get('active');
  }

  get status() {
    return this.customerGroup.get('status');
  }

  ngOnInit(): void {
    
    //getting id for uri routing
    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });

    //getting customer by id
    this.cs.getCustomerById(this.idUri).subscribe(data => {
      this.customer = data;
      // @ts-ignore
      this.selectedEmployee=data?.assignee?.id;
      error => console.log(error);
    });
    
        this.countries = GoogleCountries;

    //employees data
    this.es.findAllCommercialsEmployees().subscribe(
      (data: Employee[]) => {
        this.list = data;
       
      }, (err) => {
        console.log(err);
      },
    );
  }
//select status for customer
  onMenuItemSelected(selectedOne) {
    this.selectedOption = selectedOne;
  }

//Image select function for firebase storage
  onFileSelected(event) {
    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `customers/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`customers/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log('fb', this.fb);
            this.customer.image = this.fb;
            // console.log(this.customer.)
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log('url', url);
        }
      });
  }

  //select employee
  onMenuItemSelectedEmployee(selectedOne) {
    this.selectedEmployee = selectedOne;
  }
  
  
  //update prospect function with id employee args
  updateCustomerFunction() {
    this.employeeToStore = this.selectedEmployee;
    this.customer.assignee = this.employeeToStore;
    this.cs.updateCustomer(this.customer, this.selectedEmployee).subscribe(result => {
        this.showToast('success', 'Update ! ', 'Prospect Updated !!');

        this.router.navigateByUrl('/crm/prospect-detail/'+this.idUri, {skipLocationChange:true});
      },
      (err) => {


      },
    );
  }

  
  //toast notification alert
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? ` ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }



}
