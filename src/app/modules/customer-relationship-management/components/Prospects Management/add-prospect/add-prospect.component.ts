import {Component, Input, OnInit} from '@angular/core';
import {Customer} from '../../../models/Customer';
import {FormControl, FormGroup} from '@angular/forms';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbWindowService
} from '@nebular/theme';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {CustomerService} from '../../../services/customers/customer.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import GoogleCountries from '../../../../humain-capital-management/services/googlecountries.json';
import {Employee} from '../../../../humain-capital-management/models/Employee';
import {EmployeeService} from '../../../../humain-capital-management/services/employeeServices/employee.service';
import {TokenStorageService} from '../../../../auth/service/token/token.service';

@Component({
  selector: 'ngx-add-prospect',
  templateUrl: './add-prospect.component.html',
  styleUrls: ['./add-prospect.component.scss']
})
export class AddProspectComponent implements OnInit {
  prefixPhoneSupp: String = '';

  cell1TelInput: any = {
    initialCountry: 'tn',
    autoPlaceholder: 'polite',
    nationalMode: true,
  };
  hasErr: boolean;
  @Input() c: Customer;
  pageSize = 10;
  customer: Customer = new Customer();
  customerGroup: FormGroup = new FormGroup({});
  employeeGroup: FormGroup = new FormGroup({});
  contact_form: FormGroup = new FormGroup({});
  addressForm: FormGroup = new FormGroup({});
  links_form: FormGroup = new FormGroup({});
  countries: any [] = [];
  selectedGender;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  titleFirebase = 'fire-base-angular';
  selectedFile: File = null;
  fb = '';

  downloadURL: Observable<string>;
  options = [
    {key: 1, value: 'Prospect'},
    {key: 2, value: 'Lead'},
    {key: 3, value: 'Client'},
  ];
  selectedOption = this.options['prospect'];
  list: Employee[] = [];
  selectedEmployee: string = '';
  employeeToStore: any;
  linearMode = true;
  loading: boolean;
  user: any;

  constructor(private router: Router, private cs: CustomerService, 
              private tokenStorageService: TokenStorageService,
              private toastrService: NbToastrService, private storage: AngularFireStorage,
              private windowService: NbWindowService, private es: EmployeeService) {

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
      addressForm: new FormGroup({

        city: new FormControl(''),
        country: new FormControl(''),
        address: new FormControl(''),

      }),

      contact_form: new FormGroup({
        phone: new FormControl(''),
        workEmail: new FormControl(''),
        secondEmail: new FormControl(''),
        secondPhone: new FormControl(''),

      }),

      employeeGroup: new FormGroup({
        assignee: new FormControl(''),

      }),

      links_form: new FormGroup({
        contactType: new FormControl(''),
        workWebsite: new FormControl(''),
        linkedinUrl: new FormControl(''),
      }),


    });
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

  toggleLinearMode() {
    this.linearMode = !this.linearMode;
  }

  onCountryChange(event): void {
    this.prefixPhoneSupp = event.dialCode;
  }

  onCustomerFormSubmit() {
    this.customerGroup.markAsDirty();
  }

  onAddressFormSubmit() {
    this.addressForm.markAsDirty();
  }

  onEmployeeFormSubmit() {
    this.employeeGroup.markAsDirty();
  }

  onContactFormSubmit() {
    this.contact_form.markAsDirty();
  }

  onLinksFormSubmit() {
    this.links_form.markAsDirty();
  }

  toggleLoadingAnimation(event) {
    this.loading = true;
    this.onFileSelected(event);
    setTimeout(() => this.loading = false, 3000);
  }

  ngOnInit(): void {
    //employees data
    this.es.findAllCommercialsEmployees().subscribe(
      (data: Employee[]) => {
        this.list = data;

      }, (err) => {
        console.log(err);
      },
    );
    this.user = this.tokenStorageService.getUser();
    this.countries = GoogleCountries;

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

            this.customer.image = this.fb;
          });
        })
      )
      .subscribe(url => {
        if (url) {

        }
      });
  }

  onMenuItemSelected(selectedOne) {
    this.selectedOption = selectedOne;
  }


  addCustomerFunction() {
    this.employeeToStore = this.selectedEmployee;
    this.customer.assignee = this.employeeToStore;
    this.customer.image = this.fb;
    this.customer.user=this.user.email; 
    this.cs.addCustomer(this.customer, this.selectedEmployee).subscribe(result => {
        this.showToast('success', 'Add ! ', 'Customer Added !!');
        this.router.navigateByUrl('/crm/prospects').then(() => {
          this.router.navigate(['/crm/prospects']);
        });
      },
      (err) => {
        this.showToast('danger', 'Add ! ', err);
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
