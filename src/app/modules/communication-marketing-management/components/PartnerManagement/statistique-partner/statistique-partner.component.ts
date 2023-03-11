import { Component, OnInit } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Parternership } from 'app/modules/communication-marketing-management/models/parternership';
import { ParternershipService } from 'app/modules/communication-marketing-management/services/parternership.service';

@Component({
  selector: 'ngx-statistique-partner',
  templateUrl: './statistique-partner.component.html',
  styleUrls: ['./statistique-partner.component.scss']
})
export class StatistiquePartnerComponent {
/*



  chartType = 'pie';

  chartDatasets = [
    { data: [300, 50, 100, 40, 120], label: 'My First dataset' }
  ];

  chartLabels = ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'];

  chartColors = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];

  chartOptions: any = {
    responsive: true
  };

  chartClicked(event: any): void {
    console.log(event);
  }

  chartHovered(event: any): void {
    console.log(event);
  }*/

/*


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
                  if (data[m].materialState === true && data[m].stockState === true) {
                    this.materialsInStock.push(data[m]);
                  }
                  if (data[m].materialType === 'Finished Product') {
                    this.numberOfFinishedProducts = this.numberOfFinishedProducts + 1;
                  }
                  if (data[m].materialType === 'Raw Material') {
                    this.numberOfRawMaterials = this.numberOfRawMaterials + 1;
                  }
                  if (data[m].stockAlert >= data[m].quantityStock && data[m].stockState === true) {
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
                  if (data[m].materialState === true && data[m].materialType === "Service") {
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
                  if (data[m].categoryState === true) {
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
                  if (data[m].stockExitState === true) {
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
            this.stockMovements = data;
          },(err)=> {
              return err;
          }
    );
  }
  
  getAllPurchaseReturns() {
     this.purchaseReturnService.getAllPurchaseReturns().subscribe(
      (data: PurchaseReturn[]) => {
                for (let m = 0; m < data.length; m++) {
                  if (data[m].purchaseReturnState === true) {
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
                  if (data[m].warehouseState === true) {
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
                  if (data[m].supplierState === true) {
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
                  if (data[m].poState === true) {
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
*/

materialsInStock: Parternership [] = [];
services: Parternership [] = [];
//categories: Category [] = [];
//stockExists: StockExit [] = [];
//stockMovements: StockMovement [] = [];
//purchaseReturns: PurchaseReturn [] = [];
//warehouses: Warehouse [] = [];
//suppliers: Supplier [] = [];
//purchaseOrders: PurchaseOrder [] = [];
numberOfFinishedProducts: number = 0;
numberOfRawMaterials: number = 0;
numberOfStockAlerts: number = 0;
positions = NbGlobalPhysicalPosition;

constructor( private parternershipService : ParternershipService ,private toastrService: NbToastrService) { }

showToast(message, duration, position, status) {
  this.toastrService.show(status || 'Success', message, { duration, position, status });
}

getAllPartners() {
   this.parternershipService.getParternerships().subscribe(
    (data: Parternership[]) => {
              for (let m = 0; m < data.length; m++) {
              /*  if (data[m].materialState === true && data[m].stockState === true) {
                  this.materialsInStock.push(data[m]);
                }*/
                if (data[m].country === 'Tunisia') {
                  this.numberOfFinishedProducts = this.numberOfFinishedProducts + 1;
                }
                if (data[m].country === 'Algeria') {
                  this.numberOfRawMaterials = this.numberOfRawMaterials + 1;
                }
             /*   if (data[m].stockAlert >= data[m].quantityStock && data[m].stockState === true) {
                  this.numberOfStockAlerts = this.numberOfStockAlerts + 1;
                }*/
              }
            /*  if (this.numberOfStockAlerts > 0) {
                if (this.numberOfStockAlerts === 1) {
                  this.showToast(`You have 1 Material in STOCK ALERT!!!`,
                  7000, this.positions.TOP_RIGHT, 'danger');
                }
                if (this.numberOfStockAlerts > 1) {
                  this.showToast(`You have ${this.numberOfStockAlerts} Materials in STOCK ALERT!!!`,
                  7000, this.positions.TOP_RIGHT, 'danger');
                }
              }*/
          },(err)=> {
              return err;
          }
  );
}

getAllServices() {
 /*  this.parternershipService.getParternerships().subscribe(
    (data: Parternership[]) => {
              for (let m = 0; m < data.length; m++) {
                if (data[m].country === true && data[m].country === "Service") {
                  this.services.push(data[m]);
                }
              }
        },(err)=> {
            return err;
        }
  );*/
}

getAllCategories() {
  /* this.categoryService.getAllCategories().subscribe(
    (data: Category[]) => {
              for (let m = 0; m < data.length; m++) {
                if (data[m].categoryState === true) {
                  this.categories.push(data[m]);
                }
              }
        },(err)=> {
            return err;
        }
  );*/
}

getAllStockExits() {
   /*this.stockExitService.getAllStockExits().subscribe(
    (data: StockExit[]) => {
              for (let m = 0; m < data.length; m++) {
                if (data[m].stockExitState === true) {
                  this.stockExists.push(data[m]);
                }
              }
        },(err)=> {
            return err;
        }
  );*/
}

getAllSMs() {
 /*  this.smService.getAllSMs().subscribe(
    (data: StockMovement[]) => {
          this.stockMovements = data;
        },(err)=> {
            return err;
        }
  );*/
}

getAllPurchaseReturns() {
  /* this.purchaseReturnService.getAllPurchaseReturns().subscribe(
    (data: PurchaseReturn[]) => {
              for (let m = 0; m < data.length; m++) {
                if (data[m].purchaseReturnState === true) {
                  this.purchaseReturns.push(data[m]);
                }
              }
        },(err)=> {
            return err;
        }
  );*/
}

getAllWarehouses() {
 /*  this.warehouseService.getAllWarehouses().subscribe(
    (data: Warehouse[]) => {
              for (let m = 0; m < data.length; m++) {
                if (data[m].warehouseState === true) {
                  this.warehouses.push(data[m]);
                }
              }
        },(err)=> {
            return err;
        }
  );*/
}

getAllSuppliers() {
  /* this.supplierService.getAllSuppliers().subscribe(
    (data: Supplier[]) => {
              for (let m = 0; m < data.length; m++) {
                if (data[m].supplierState === true) {
                  this.suppliers.push(data[m]);
                }
              }
        },(err)=> {
            return err;
        }
  );*/
}

getAllPurchaseOrders() {
  /* this.purchaseOrderService.getAllPOs().subscribe(
    (data: PurchaseOrder[]) => {
              for (let m = 0; m < data.length; m++) {
                if (data[m].poState === true) {
                  this.purchaseOrders.push(data[m]);
                }
              }
        },(err)=> {
            return err;
        }
  );*/
}

ngOnInit(): void {
  this.getAllPartners();
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
