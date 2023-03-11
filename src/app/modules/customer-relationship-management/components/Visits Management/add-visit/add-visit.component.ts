import {Component, OnInit} from '@angular/core';
import {Visit} from '../../../models/visit';
import {VisitService} from '../../../services/visits/visit.service';
import {Router} from '@angular/router';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Customer} from '../../../models/Customer';
import {CustomerService} from '../../../services/customers/customer.service';
import {EmployeeService} from '../../../../humain-capital-management/services/employeeServices/employee.service';

@Component({
  selector: 'ngx-add-visit',
  templateUrl: './add-visit.component.html',
  styleUrls: ['./add-visit.component.scss']
})
export class AddVisitComponent implements OnInit {
  //initialization of data customers 
  dataCustomers: Customer [] = [];
  
  //initialization of properties list 
  properties;
  //instanciate visit 
  visit: Visit = new Visit();
  //declare group for visit form
  visitGroup: FormGroup;
  extra_form: FormGroup = new FormGroup({});

  //toast configuration
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
    
  //selected property variable for properties option
    selectedProperty: string = '';
  //property to store variable
  propertyToStore: any;
  
  //selected customer variable for menu option
  selectedCustomer;

  //menu select option for visit status
  options = [
    {key: 1, value: 'UPCOMING'},
    {key: 2, value: 'doing'},
    {key: 3, value: 'DONE'},
  ];

  //select variable change for status option menu
  selectedStatus = this.options['UPCOMING'];
  
  constructor(private vs: VisitService, private router: Router,
              private toastrService: NbToastrService
    , private cs: CustomerService, private es: EmployeeService) {

    
    //initialisation for visit group form with form controls
    this.visitGroup = new FormGroup({
      dateVisit: new FormControl(''),
      hourVisit: new FormControl(''),
      refVisit: new FormControl(''),
      availability: new FormControl(''),
      status: new FormControl(''),
      title: new FormControl(''),
            extra_form: new FormGroup({
      description: new FormControl(''),

              customer: new FormControl(''),
              property: new FormControl(''),
            })
    });

  }

  get property() {
    return this.visitGroup.get('property');
  }

  get customer() {
    return this.visitGroup.get('customer');
  }

  get title() {
    return this.visitGroup.get('title');
  }

  get status() {
    return this.visitGroup.get('status');
  }

  get availability() {
    return this.visitGroup.get('availability');
  }
  
  get description() {
    return this.visitGroup.get('description');
  }
  

  get refVisit() {
    return this.visitGroup.get('refVisit');
  }


  get hourVisit() {
    return this.visitGroup.get('hourVisit');
  }

  get dateVisit() {
    return this.visitGroup.get('dateVisit');
  }

  // select change for status option
  onMenuStatusSelected(selectedOne) {
    this.selectedStatus = selectedOne;
  }

//select customer 
  onMenuItemSelectedCustomer(selectedOne) {
    this.selectedCustomer = selectedOne;
  }


  //select property
  onMenuItemSelectedProperty(selectedOne) {
    console.log(selectedOne);
    this.selectedProperty = selectedOne;
  }
  
  //extra form submit
  onExtraFormSubmit() {
    this.extra_form.markAsDirty();
  }  
  //extra form submit
  onVisitFormSubmit() {
    this.visitGroup.markAsDirty();
  }

  ngOnInit(): void {
    //customers data
    this.cs.findNonArchivedCustomers().subscribe(
      (data: Customer[]) => {
        this.dataCustomers = data;

      }
    );

    //properties data
    this.vs.findAllProperties().subscribe(
      (data) => {
        this.properties = data;
     
      }, error => console.log(error)
    );
 

  }


//Add visit function
  addVisitFunction() {
    this.visit.customer = <Customer>{id: this.selectedCustomer};

    this.propertyToStore = this.selectedProperty;
    this.visit.property = this.propertyToStore;
    
    this.vs.addVisit(this.visit, this.selectedProperty, this.selectedCustomer).subscribe(result => {
        this.showToast('success', 'Add ! ', 'Visit Added Successfully!!');
        this.router.navigateByUrl('/crm/visits');
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      });
  }

//show toast
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
