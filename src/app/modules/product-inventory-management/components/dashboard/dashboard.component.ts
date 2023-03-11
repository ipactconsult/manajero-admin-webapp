import {Component, OnInit} from '@angular/core';
import {MaterialService} from "../../services/material/material.service";
import {Material} from "../../models/material/material";
import {CategoryService} from "../../services/category/category.service";
import {Category} from "../../models/category/category";
import {StockExit} from "../../models/stockExit/stock-exit";
import {StockExitService} from "../../services/stockExit/stock-exit.service";
import {StockMovement} from "../../models/stockMovement/stock-movement";
import {StockMovementService} from "../../services/stockMovement/stock-movement.service";
import {PurchaseReturn} from "../../models/purchaseReturn/purchase-return";
import {PurchaseReturnService} from "../../services/purchaseReturn/purchase-return.service";
import {Warehouse} from "../../models/warehouse/warehouse";
import {WarehouseService} from "../../services/warehouse/warehouse.service";
import {Supplier} from "../../models/supplier/supplier";
import {SupplierService} from "../../services/supplier/supplier.service";
import {PurchaseOrder} from "../../models/purchaseOrder/purchase-order";
import {PurchaseOrderService} from "../../services/purchaseOrder/purchase-order.service";
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import moment from "moment";

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  materialsInStock: Material [] = [];
  services: Material [] = [];
  categories: Category [] = [];
  stockExists: StockExit [] = [];
  stockMovements: StockMovement [] = [];
  purchaseReturns: PurchaseReturn [] = [];
  warehouses: Warehouse [] = [];
  suppliers: Supplier [] = [];
  purchaseOrders: PurchaseOrder [] = [];
  numberOfFinishedProducts: number = 0;
  numberOfRawMaterials: number = 0;
  numberOfStockAlerts: number = 0;
  positions = NbGlobalPhysicalPosition;
  moment: any = moment;
  userConnected = JSON.parse(sessionStorage.getItem('auth-user'));

  constructor(private materialService: MaterialService, private categoryService: CategoryService,
              private stockExitService: StockExitService, private smService: StockMovementService,
              private purchaseReturnService: PurchaseReturnService, private warehouseService: WarehouseService,
              private supplierService: SupplierService, private purchaseOrderService: PurchaseOrderService,
              private toastrService: NbToastrService) { }
  
  showToast(message, duration, position, status) {
    this.toastrService.show(status || 'Success', message, { duration, position, status });
  }
  
  getAllMaterials() {
     this.materialService.getAllMaterials().subscribe(
      (data: Material[]) => {
                for (let m = 0; m < data.length; m++) {
                  if (data[m].materialState === true && data[m].stockState === true
                  && data[m].addedBy?.company === this.userConnected.company) {
                    this.materialsInStock.push(data[m]);
                  }
                  if (data[m].materialType === 'Finished Product' && data[m].addedBy?.company === this.userConnected.company) {
                    this.numberOfFinishedProducts = this.numberOfFinishedProducts + 1;
                  }
                  if (data[m].materialType === 'Raw Material' && data[m].addedBy?.company === this.userConnected.company) {
                    this.numberOfRawMaterials = this.numberOfRawMaterials + 1;
                  }
                  if (data[m].stockAlert >= data[m].quantityStock && data[m].stockState === true
                    && data[m].addedBy?.company === this.userConnected.company) {
                    this.numberOfStockAlerts = this.numberOfStockAlerts + 1;
                  }
                }
                if (this.numberOfStockAlerts > 0) {
                  if (this.numberOfStockAlerts === 1) {
                    this.showToast(`You have 1 Material in STOCK ALERT!!!`,
                    7000, this.positions.TOP_RIGHT, 'danger');
                  }
                  if (this.numberOfStockAlerts > 1) {
                    this.showToast(`You have ${this.numberOfStockAlerts} Materials in STOCK ALERT!!!`,
                    7000, this.positions.TOP_RIGHT, 'danger');
                  }
                }
            },(err)=> {
                return err;
            }
    );
  }
  
  getAllServices() {
     this.materialService.getAllMaterials().subscribe(
      (data: Material[]) => {
                for (let m = 0; m < data.length; m++) {
                  if (data[m].materialState === true && data[m].materialType === "Service"
                    && data[m].addedBy?.company === this.userConnected.company) {
                    this.services.push(data[m]);
                  }
                }
          },(err)=> {
              return err;
          }
    );
  }
  
  getAllCategories() {
     this.categoryService.getAllCategories().subscribe(
      (data: Category[]) => {
                for (let m = 0; m < data.length; m++) {
                  if (data[m].categoryState === true
                    && data[m].addedBy?.company === this.userConnected.company) {
                    this.categories.push(data[m]);
                  }
                }
          },(err)=> {
              return err;
          }
    );
  }
  
  getAllStockExits() {
     this.stockExitService.getAllStockExits().subscribe(
      (data: StockExit[]) => {
                for (let m = 0; m < data.length; m++) {
                  if (data[m].stockExitState === true
                    && data[m].material?.addedBy?.company === this.userConnected.company) {
                    this.stockExists.push(data[m]);
                  }
                }
          },(err)=> {
              return err;
          }
    );
  }
  
  getAllSMs() {
     this.smService.getAllSMs().subscribe(
      (data: StockMovement[]) => {
            for (let s = 0; s < data.length; s++) {
              if (data[s].activeState === true && 
                data[s].material?.addedBy?.company === this.userConnected.company) {
                this.stockMovements.push(data[s]);
              }
            }
          },(err)=> {
              return err;
          }
    );
  }
  
  getAllPurchaseReturns() {
     this.purchaseReturnService.getAllPurchaseReturns().subscribe(
      (data: PurchaseReturn[]) => {
                for (let m = 0; m < data.length; m++) {
                  if (data[m].purchaseReturnState === true
                    && data[m].material?.addedBy?.company === this.userConnected.company) {
                    this.purchaseReturns.push(data[m]);
                  }
                }
          },(err)=> {
              return err;
          }
    );
  }
  
  getAllWarehouses() {
     this.warehouseService.getAllWarehouses().subscribe(
      (data: Warehouse[]) => {
                for (let m = 0; m < data.length; m++) {
                  if (data[m].warehouseState === true
                    && data[m].addedBy?.company === this.userConnected.company) {
                    this.warehouses.push(data[m]);
                  }
                }
          },(err)=> {
              return err;
          }
    );
  }
  
  getAllSuppliers() {
     this.supplierService.getAllSuppliers().subscribe(
      (data: Supplier[]) => {
                for (let m = 0; m < data.length; m++) {
                  if (data[m].supplierState === true
                    && data[m].addedBy?.company === this.userConnected.company) {
                    this.suppliers.push(data[m]);
                  }
                }
          },(err)=> {
              return err;
          }
    );
  }
  
  getAllPurchaseOrders() {
     this.purchaseOrderService.getAllPOs().subscribe(
      (data: PurchaseOrder[]) => {
                for (let m = 0; m < data.length; m++) {
                  if (data[m].poState === true
                    && data[m].addedBy?.company === this.userConnected.company) {
                    this.purchaseOrders.push(data[m]);
                  }
                }
          },(err)=> {
              return err;
          }
    );
  }

  ngOnInit(): void {
    this.getAllMaterials();
    this.getAllServices();
    this.getAllCategories();
    this.getAllStockExits();
    this.getAllSMs();
    this.getAllPurchaseReturns();
    this.getAllWarehouses();
    this.getAllSuppliers();
    this.getAllPurchaseOrders();
  }

}
