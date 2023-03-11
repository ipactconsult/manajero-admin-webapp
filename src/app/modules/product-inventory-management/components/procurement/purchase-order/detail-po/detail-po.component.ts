import {Component, OnInit, TemplateRef} from '@angular/core';
import {PurchaseOrderService} from "../../../../services/purchaseOrder/purchase-order.service";
import {PurchaseOrder} from "../../../../models/purchaseOrder/purchase-order";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import moment from "moment";
import {MaterialService} from "../../../../services/material/material.service";
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WarehouseService} from "../../../../services/warehouse/warehouse.service";
import {Warehouse} from "../../../../models/warehouse/warehouse";
import {StockMovementService} from "../../../../services/stockMovement/stock-movement.service";

@Component({
  selector: 'ngx-detail-po',
  templateUrl: './detail-po.component.html',
  styleUrls: ['./detail-po.component.scss']
})
export class DetailPoComponent implements OnInit {
  
  existedPO: PurchaseOrder = new PurchaseOrder();
  poCreationDate;
  completedState1 = true;
  moment: any = moment;
  positions = NbGlobalPhysicalPosition;
  materialForm: FormGroup;
  warehouseForm: FormGroup;
  warehouses: Warehouse[] = [];
  material;
  sm;
  existedPOMaterialsLength;

  constructor(private poService: PurchaseOrderService, private toastrService: NbToastrService,
              private materialService: MaterialService, private dialogService: NbDialogService,
              private warehouseService: WarehouseService, private smService: StockMovementService,
              private formBuilder: FormBuilder, private location: Location, private router: Router) { 
    this.materialForm = formBuilder.group({
      warehouse: ['', Validators.required],
    });
    this.warehouseForm = formBuilder.group({
      warehouseLocation: ['', Validators.required],
      warehouseDesc: ['', Validators.required],
      warehouseAddress: ['', Validators.required],
      warehousePostalCode: ['', Validators.required],
      warehouseCity: ['', Validators.required],
      warehouseCountry: ['', Validators.required],
      warehousePhone: ['', Validators.required],
    })
  }
  
  open2Supp(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }
  
  goToPreviousRoute(): void {
    this.location.back();
  }
  
  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  ngOnInit(): void {
    this.poService.getOnePO(this.router.url
      .replace('/pim/procurement/purchase-order/detail/', '')).subscribe((po) => {
        this.existedPO = po;
        this.existedPOMaterialsLength = this.existedPO.materials.length;
        this.poCreationDate = moment(this.existedPO.poCreationDate).format('DD MMM YYYY')
    });
    this.warehouseService.getAllWarehouses().subscribe(warehouses => {
      this.warehouses = warehouses;
    }, error => {
      this.showToast(error.error , this.positions.TOP_RIGHT, 'danger');
    })
  }

}
