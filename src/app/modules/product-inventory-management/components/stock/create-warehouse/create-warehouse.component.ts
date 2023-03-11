import {Component, OnInit, TemplateRef} from '@angular/core';
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import moment from 'moment';
import {WarehouseService} from "../../../services/warehouse/warehouse.service";
import {Warehouse} from "../../../models/warehouse/warehouse";
import countries from '../../../countries.json';

@Component({
  selector: 'ngx-create-warehouse',
  templateUrl: './create-warehouse.component.html',
  styleUrls: ['./create-warehouse.component.scss']
})
export class CreateWarehouseComponent implements OnInit {

  positions = NbGlobalPhysicalPosition;
  selectedCountry;
  warehouseForm: FormGroup;
  newWarehouse;
  warehouses: Warehouse[] = [];
  moment: any = moment;
  countries;
  userConnected;

  constructor(private warehouseService: WarehouseService, private dialogService: NbDialogService, 
              private toastrService: NbToastrService, private formBuilder: FormBuilder, 
              private router: Router, private location: Location) {
    this.warehouseForm = formBuilder.group({
      warehouseName: ['', Validators.required],
      warehouseDesc: ['', Validators.required],
      warehouseCountry: ['', Validators.required],
      warehouseCity: ['', Validators.required],
      warehousePostalCode: ['', Validators.required],
      warehouseAddress: ['', Validators.required],
      warehousePhone: ['', Validators.required],
    });
  }
  
  open2Supp(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }
  
  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }
  
  goToPreviousRoute(): void {
    this.location.back();
  }
  
  selectCountry(selectedCountry): void {
    this.selectedCountry = selectedCountry
  }

  static getRandomNumber(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return "W"+result;
  }

  createNewWarehouse(): void {
    this.newWarehouse = {
      warehouseLocation: this.warehouseForm.value.warehouseName,
      warehouseDesc: this.warehouseForm.value.warehouseDesc,
      warehouseCountry: this.warehouseForm.value.warehouseCountry,
      warehouseCity: this.warehouseForm.value.warehouseCity,
      warehousePostalCode: this.warehouseForm.value.warehousePostalCode,
      warehouseAddress: this.warehouseForm.value.warehouseAddress,
      warehousePhone: this.warehouseForm.value.warehousePhone,
      warehouseCode: CreateWarehouseComponent.getRandomNumber(100000, 999999),
      addedBy: this.userConnected
    };

    this.warehouseService.addNewWarehouse(this.newWarehouse).subscribe(
         result => {
          if (result === null) {
            this.showToast('Warehouse Already Exists' , this.positions.TOP_RIGHT, 'danger');
          } else {
            this.warehouseForm.reset();
            this.showToast('Warehouse Created Successfully' , this.positions.TOP_RIGHT, 'success');
            this.router.navigateByUrl('/pim/stock/warehouses');
          }
      }, error => {
          this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
        },
    );
  }

  ngOnInit(): void {
    this.countries = countries;
    this.userConnected = JSON.parse(sessionStorage.getItem('auth-user'));
  }

}
