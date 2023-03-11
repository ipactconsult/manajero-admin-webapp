import {Component, OnInit} from '@angular/core';
import {Customer} from '../../../models/Customer';
import {FormControl, FormGroup} from '@angular/forms';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../../services/customers/customer.service';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {Employee} from '../../../../humain-capital-management/models/Employee';
import {EmployeeService} from '../../../../humain-capital-management/services/employeeServices/employee.service';
import GoogleCountries from '../../../../humain-capital-management/services/googlecountries.json';

@Component({
  selector: 'ngx-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  countries: any [] = [];
  customer: Customer = new Customer();
  customerGroup: FormGroup;
  idUri = '';
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  list: Employee[] = [];
  selectedEmployee: string = '';
  employeeToStore: any;
  titleFirebase = 'fire-base-angular';
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  options = [
    {key: 1, value: 'Prospect'},
    {key: 2, value: 'Lead'},
    {key: 3, value: 'Client'},
  ];
  selectedOption = this.options['prospect'];

  constructor(private router: Router, private cs: CustomerService, private storage: AngularFireStorage,
              private toastrService: NbToastrService, private activatedroute: ActivatedRoute
              , private es: EmployeeService) {
    this.customerGroup = new FormGroup({
     matriculateFiscal: new FormControl(''),
      title: new FormControl(''),
      name: new FormControl(''),
      image: new FormControl(''),
      gender: new FormControl(''),
      otherGender: new FormControl(''),
      dateOfBirth: new FormControl(''),
      status: new FormControl(''),
      description: new FormControl(''),
      active: new FormControl(''),
        city: new FormControl(''),

        country: new FormControl(''),
        address: new FormControl(''),


        phone: new FormControl(''),
        workEmail: new FormControl(''),
        secondEmail: new FormControl(''),
        secondPhone: new FormControl(''),


        assignee: new FormControl(''),


  
        contactType: new FormControl(''),
        workWebsite: new FormControl(''),
        linkedinUrl: new FormControl(''),
  })
  }

 get matriculateFiscal() {
    return this.customerGroup.get('matriculateFiscal');
  }

  get image() {
    return this.customerGroup.get('image');
  }

  get name() {
    return this.customerGroup.get('name');
  }

  get contactType() {
    return this.customerGroup.get('contactType');
  }

  get dateOfBirth() {
    return this.customerGroup.get('dateOfBirth');
  }

  get title() {
    return this.customerGroup.get('title');
  }

  get phone() {
    return this.customerGroup.get('phone');
  }

  get workEmail() {
    return this.customerGroup.get('workEmail');
  }

  get gender() {
    return this.customerGroup.get('gender');
  }
  get otherGender() {
    return this.customerGroup.get('otherGender');
  }

  get secondEmail() {
    return this.customerGroup.get('secondEmail');
  }

  get secondPhone() {
    return this.customerGroup.get('secondPhone');
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
    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });

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

  onMenuItemSelected(selectedOne) {

    this.selectedOption = selectedOne;
  }

//select employee
  onMenuItemSelectedEmployee(selectedOne) {
    this.selectedEmployee = selectedOne;
  }

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

          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log('url', url);
        }
      });
  }

  updateCustomerFunction() {
    this.employeeToStore = this.selectedEmployee;
    this.customer.assignee = this.employeeToStore;
    this.cs.updateCustomer(this.customer, this.selectedEmployee).subscribe(result => {
        this.showToast('success', 'Update ! ', 'Customer Updated !!');
        this.router.navigateByUrl('/crm/customer-details/' + this.idUri, {skipLocationChange: true});
      },
      (err) => {
            this.showToast('danger', 'Update ! ', err.toString());


      },
    );
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
    const titleContent = title ? ` ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }


}
