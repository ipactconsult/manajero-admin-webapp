import {Component, OnInit} from '@angular/core';
import {Customer} from '../../../models/Customer';
import {Visit} from '../../../models/visit';
import {FormControl, FormGroup} from '@angular/forms';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import {VisitService} from '../../../services/visits/visit.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../../services/customers/customer.service';
import {HttpErrorResponse} from '@angular/common/http';
import {EmployeeService} from '../../../../humain-capital-management/services/employeeServices/employee.service';

@Component({
  selector: 'ngx-edit-visit',
  templateUrl: './edit-visit.component.html',
  styleUrls: ['./edit-visit.component.scss']
})
export class EditVisitComponent implements OnInit {
 //declaration customer list variable
  dataCustomers: Customer [] = [];
  //instanciate visit 
  visit: Visit = new Visit();
  
  //declaration visit form group
  visitGroup: FormGroup;
  //toast config 
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  
  //initialize id variable
  idUri = '';
    
  //initializattion selected property variable 
  selectedProperty: string = '';
  
  //initialization of property to store variable
   propertyToStore: any;
   
  //initialization for selected Item for visit customer
  selectedCustomer: string = '';
  
  
 //options menu select 
  options = [
    {key: 1, value: 'UPCOMING'},
    {key: 2, value: 'doing'},
    {key: 3, value: 'DONE'},
  ];

  
  //declaration of properties list
    properties;

    
  selectedStatus = this.options['UPCOMING'];
  
  



  constructor(private vs: VisitService, private activatedroute: ActivatedRoute,
              private router: Router, private toastrService: NbToastrService,
              private cs: CustomerService, private es: EmployeeService) {

    //Visit form group with form controls
    this.visitGroup = new FormGroup({
      dateVisit: new FormControl(''),
      hourVisit: new FormControl(''),
      refVisit: new FormControl(''),
      description: new FormControl(''),
      availability: new FormControl(''),
      status: new FormControl(''),
      title: new FormControl(''),
      customer: new FormControl(''),
      property: new FormControl(''),
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

  //Select change for visit status
  onMenuStatusSelected(selectedOne) {
    this.selectedStatus = selectedOne;
  }


  //select change for getting customer item
  onMenuItemSelectedCustomer(selectedOne) {
    this.selectedCustomer = selectedOne;
  }


    //select property
  onMenuItemSelectedProperty(selectedOne) {
    this.selectedProperty = selectedOne;
  }
  
  ngOnInit(): void {
    //getting all customers data function
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
            
  //getting id from uri param 
    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');
    });

    //getting visit by id
    this.vs.getVisitById(this.idUri).subscribe(data => {
      this.visit = data;
      
      // @ts-ignore
      this.selectedEmployee=data?.employee?.id;
      
     // @ts-ignore
      this.selectedProperty= data?.property?.propertyId;
      
      this.selectedCustomer= data?.customer?.id;
      error => console.log(error);
    });
  }

  //update visit function 
  UpdateVisitFunction() {
    this.visit.customer = <Customer>{id: this.selectedCustomer};
    this.propertyToStore = this.selectedProperty;
    this.visit.property = this.propertyToStore;
    this.vs.updateVisit( this.visit,  this.selectedProperty).subscribe(result => {
        this.showToast('success', 'Update ! ', 'Visit Updated Successfully!!');
        this.router.navigateByUrl('/crm/visits');
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.showToast('danger', 'Update !!', err.error.message);

        } else {
          this.showToast('danger', 'Update !!', err.error.message);
        }
      });
  }

  //show toast notification
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
