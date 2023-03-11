import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { UcWidgetModule } from 'ngx-uploadcare-widget';
import {
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbButtonModule,
  NbProgressBarModule,
  NbStepperModule,
  NbCheckboxModule,
  NbToastrModule,
  NbDialogModule,
  NbTooltipModule,
  NbIconModule,
  NbAlertModule,
  NbUserModule,
  NbAccordionModule,
  NbTagModule,
  NbFormFieldModule, NbDatepickerModule, NbChatModule, NbSpinnerModule, NbListModule
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ProductInventoryManagementRoutingModule } from './product-inventory-management-routing.module';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {NgxPaginationModule} from "ngx-pagination";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { NgxEchartsModule } from 'ngx-echarts';
import {ConnectionServiceModule} from 'ng-connection-service';
import { ProcessComponent } from './components/procurement/process/process.component';
import { CreateMaterialComponent } from './components/procurement/materials/create-material/create-material.component';
import { ShowMaterialComponent } from './components/procurement/materials/show-material/show-material.component';
import { CreatePrComponent } from './components/procurement/purchase-requisitions/create-pr/create-pr.component';
import { ShowPrComponent } from './components/procurement/purchase-requisitions/show-pr/show-pr.component';
import { CreateRfqComponent } from './components/procurement/rfqs/create-rfq/create-rfq.component';
import { ShowRfqComponent } from './components/procurement/rfqs/show-rfq/show-rfq.component';
import { MaintainQuotationComponent } from './components/procurement/quotations/maintain-quotation/maintain-quotation.component';
import { DecideVendorComponent } from './components/procurement/quotations/decide-vendor/decide-vendor.component';
import { CreatePoComponent } from './components/procurement/purchase-order/create-po/create-po.component';
import { ShowPoComponent } from './components/procurement/purchase-order/show-po/show-po.component';
import { GoodsReceiptComponent } from './components/procurement/purchase-order/goods-receipt/goods-receipt.component';
import { ListMaterialsComponent } from './components/procurement/materials/list-materials/list-materials.component';
import { GridMaterialsComponent } from './components/procurement/materials/grid-materials/grid-materials.component';
import { MaterialsComponent } from './components/procurement/materials/materials/materials.component';
import { BuyMaterialComponent } from './components/procurement/materials/buy-material/buy-material.component';
import { ListPoComponent } from './components/procurement/purchase-order/list-po/list-po.component';
import { DetailPoComponent } from './components/procurement/purchase-order/detail-po/detail-po.component';
import { StockMovementsComponent } from './components/stock/stock-movements/stock-movements.component';
import { ListSuppliersComponent } from './components/suppliers/list-suppliers/list-suppliers.component';
import { ShowSupplierComponent } from './components/suppliers/show-supplier/show-supplier.component';
import { CreateSupplierComponent } from './components/suppliers/create-supplier/create-supplier.component';
import { SuppliersComponent } from './components/suppliers/suppliers/suppliers.component';
import { GridSuppliersComponent } from './components/suppliers/grid-suppliers/grid-suppliers.component';
import { ListPrsComponent } from './components/procurement/purchase-requisitions/list-prs/list-prs.component';
import {NgxPrintElementModule} from "ngx-print-element";
import { GridPrsComponent } from './components/procurement/purchase-requisitions/grid-prs/grid-prs.component';
import { ListRfqsComponent } from './components/procurement/rfqs/list-rfqs/list-rfqs.component';
import { RfqsComponent } from './components/procurement/rfqs/rfqs/rfqs.component';
import { ListQuotationsComponent } from './components/procurement/quotations/list-quotations/list-quotations.component';
import { QuotationsComponent } from './components/procurement/quotations/quotations/quotations.component';
import { PurchaseOrdersComponent } from './components/procurement/purchase-order/purchase-orders/purchase-orders.component';
import { ListCategoriesComponent } from './components/categories/list-categories/list-categories.component';
import { GridCategoriesComponent } from './components/categories/grid-categories/grid-categories.component';
import { CategoriesComponent } from './components/categories/categories/categories.component';
import { CreateCategoryComponent } from './components/categories/create-category/create-category.component';
import { ListReceivedMaterialsComponent } from './components/reception/list-received-materials/list-received-materials.component';
import { InStockComponent } from './components/stock/in-stock/in-stock.component';
import { InStockListComponent } from './components/stock/in-stock-list/in-stock-list.component';
import { InStockGridComponent } from './components/stock/in-stock-grid/in-stock-grid.component';
import { GridReceivedMaterialsComponent } from './components/reception/grid-received-materials/grid-received-materials.component';
import { ReceivedMaterialsComponent } from './components/reception/received-materials/received-materials.component';
import { StockMovementsGridComponent } from './components/stock/stock-movements-grid/stock-movements-grid.component';
import { StockMovementsThreeViewComponent } from './components/stock/stock-movements-three-view/stock-movements-three-view.component';
import { PurchaseOrdersThreeViewComponent } from './components/procurement/purchase-order/purchase-orders-three-view/purchase-orders-three-view.component';
import { WarehousesComponent } from './components/stock/warehouses/warehouses.component';
import { GridWarehousesComponent } from './components/stock/grid-warehouses/grid-warehouses.component';
import { ListWarehousesComponent } from './components/stock/list-warehouses/list-warehouses.component';
import { CreateWarehouseComponent } from './components/stock/create-warehouse/create-warehouse.component';
import { ArchivedMaterialsListComponent } from './components/archive/archived-materials-list/archived-materials-list.component';
import { ArchivedCategoriesListComponent } from './components/archive/archived-categories-list/archived-categories-list.component';
import { ArchivedSuppliersListComponent } from './components/archive/archived-suppliers-list/archived-suppliers-list.component';
import { ArchivedWarehousesListComponent } from './components/archive/archived-warehouses-list/archived-warehouses-list.component';
import { ArchivedPrsListComponent } from './components/archive/archived-prs-list/archived-prs-list.component';
import { ArchivedRfqsListComponent } from './components/archive/archived-rfqs-list/archived-rfqs-list.component';
import { ArchivedQuotationsListComponent } from './components/archive/archived-quotations-list/archived-quotations-list.component';
import { StockExitsComponent } from './components/stock/stock-exits/stock-exits.component';
import { CreateStockExitComponent } from './components/stock/create-stock-exit/create-stock-exit.component';
import { StockExitsGridComponent } from './components/stock/stock-exits-grid/stock-exits-grid.component';
import { StockExitsListComponent } from './components/stock/stock-exits-list/stock-exits-list.component';
import { StockEntriesComponent } from './components/stock/stock-entries/stock-entries.component';
import { StockEntriesGridComponent } from './components/stock/stock-entries-grid/stock-entries-grid.component';
import { StockEntriesListComponent } from './components/stock/stock-entries-list/stock-entries-list.component';
import { PrsComponent } from './components/procurement/purchase-requisitions/prs/prs.component';
import { PurchaseReturnsListComponent } from './components/purchase-returns/purchase-returns-list/purchase-returns-list.component';
import { PurchaseReturnsGridComponent } from './components/purchase-returns/purchase-returns-grid/purchase-returns-grid.component';
import { PurchaseReturnsComponent } from './components/purchase-returns/purchase-returns/purchase-returns.component';
import { DetailPurchaseReturnComponent } from './components/purchase-returns/detail-purchase-return/detail-purchase-return.component';
import { ArchivedPurchaseReturnsListComponent } from './components/archive/archived-purchase-returns-list/archived-purchase-returns-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialsEchartsPieComponent } from './components/dashboard/materials-echarts-pie.component';
import { StockChartjsPieComponent } from './components/dashboard/stock-chartjs-pie.component';
import { CreatePurchaseReturnComponent } from "./components/purchase-returns/create-purchase-return/create-purchase-return.component";
import { ListReceiptsComponent } from './components/receipt/list-receipts/list-receipts.component';
import { CreateReceiptComponent } from './components/receipt/create-receipt/create-receipt.component';
import { ReceiptsComponent } from './components/receipt/receipts/receipts.component';
import { GridReceiptsComponent } from './components/receipt/grid-receipts/grid-receipts.component';
import { ReceiptDetailsComponent } from './components/receipt/receipt-details/receipt-details.component';
import { ArchivedReceiptsListComponent } from './components/archive/archived-receipts-list/archived-receipts-list.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { ContinuePurchaseComponent } from './components/procurement/continue-purchase/continue-purchase.component';
import { StockMaterialComponent } from './components/reception/stock-material/stock-material.component';
import { ReplenishMaterialComponent } from './components/stock/replenish-material/replenish-material.component';
import { ReplenishmentComponent } from './components/stock/replenishment/replenishment.component';
import { CreateInventoryComponent } from './components/stock/create-inventory/create-inventory.component';
import { InventoriesListComponent } from './components/stock/inventories-list/inventories-list.component';
import { InventoriesComponent } from './components/stock/inventories/inventories.component';
import { InventoriesGridComponent } from './components/stock/inventories-grid/inventories-grid.component';
import { InventoryDetailsComponent } from './components/stock/inventory-details/inventory-details.component';
import { FixStockComponent } from './components/stock/fix-stock/fix-stock.component';
import { InventoryMovementsListComponent } from './components/stock/inventory-movements-list/inventory-movements-list.component';
import { InventoryMovementsComponent } from './components/stock/inventory-movements/inventory-movements.component';
import { InventoryMovementsGridComponent } from './components/stock/inventory-movements-grid/inventory-movements-grid.component';
import { InventoryMovementDetailsComponent } from './components/stock/inventory-movement-details/inventory-movement-details.component';
import { DetailsWarehouseComponent } from './components/stock/details-warehouse/details-warehouse.component';
import { GridRfqsComponent } from './components/procurement/rfqs/grid-rfqs/grid-rfqs.component';
import { GridQuotationsComponent } from './components/procurement/quotations/grid-quotations/grid-quotations.component';
import { MeetComponent } from './components/meet/meet.component';
import { ShowCategoryComponent } from './components/categories/show-category/show-category.component';
import { DetailsPrComponent } from './components/procurement/purchase-requisitions/details-pr/details-pr.component';
import { DetailsRfqComponent } from './components/procurement/rfqs/details-rfq/details-rfq.component';
import { DetailsQuotationComponent } from './components/procurement/quotations/details-quotation/details-quotation.component';
import { ArchivedPurchaseOrdersListComponent } from './components/archive/archived-purchase-orders-list/archived-purchase-orders-list.component';
import { ArchivedStockMovementsListComponent } from './components/archive/archived-stock-movements-list/archived-stock-movements-list.component';
import { ArchivedStockEntriesListComponent } from './components/archive/archived-stock-entries-list/archived-stock-entries-list.component';
import { ArchivedStockExitsListComponent } from './components/archive/archived-stock-exits-list/archived-stock-exits-list.component';
import { ArchivedInventoriesListComponent } from './components/archive/archived-inventories-list/archived-inventories-list.component';
import { ArchivedInventoryMovementsListComponent } from './components/archive/archived-inventory-movements-list/archived-inventory-movements-list.component';
import {ChartModule} from "angular2-chartjs";
import { NgxBarcodeModule } from 'ngx-barcode';
import {PurchasesChartjsLineComponent} from "./components/dashboard/purchases-chartjs-line.component";
import {ChartjsBarHorizontalComponent} from "./components/dashboard/inventory-movements-chartjs-bar-horizonal.component";
import { AllPurchasesComponent } from './components/procurement/all-purchases/all-purchases.component';

@NgModule({
  declarations: [
    ProcessComponent,
    CreateMaterialComponent,
    ShowMaterialComponent,
    CreatePrComponent,
    ShowPrComponent,
    CreateRfqComponent,
    ShowRfqComponent,
    MaintainQuotationComponent,
    DecideVendorComponent,
    CreatePoComponent,
    ShowPoComponent,
    GoodsReceiptComponent,
    ListMaterialsComponent,
    GridMaterialsComponent,
    MaterialsComponent,
    BuyMaterialComponent,
    ListPoComponent,
    DetailPoComponent,
    StockMovementsComponent,
    ListSuppliersComponent,
    ShowSupplierComponent,
    CreateSupplierComponent,
    SuppliersComponent,
    GridSuppliersComponent,
    ListPrsComponent,
    GridPrsComponent,
    ListRfqsComponent,
    RfqsComponent,
    ListQuotationsComponent,
    QuotationsComponent,
    PurchaseOrdersComponent,
    ListCategoriesComponent,
    GridCategoriesComponent,
    CategoriesComponent,
    CreateCategoryComponent,
    ListReceivedMaterialsComponent,
    InStockComponent,
    InStockListComponent,
    InStockGridComponent,
    GridReceivedMaterialsComponent,
    ReceivedMaterialsComponent,
    StockMovementsGridComponent,
    StockMovementsThreeViewComponent,
    PurchaseOrdersThreeViewComponent,
    WarehousesComponent,
    GridWarehousesComponent,
    ListWarehousesComponent,
    CreateWarehouseComponent,
    ArchivedMaterialsListComponent,
    ArchivedCategoriesListComponent,
    ArchivedSuppliersListComponent,
    ArchivedWarehousesListComponent,
    ArchivedPrsListComponent,
    ArchivedRfqsListComponent,
    ArchivedQuotationsListComponent,
    StockExitsComponent,
    CreateStockExitComponent,
    StockExitsGridComponent,
    StockExitsListComponent,
    StockEntriesComponent,
    StockEntriesGridComponent,
    StockEntriesListComponent,
    PrsComponent,
    PurchaseReturnsListComponent,
    PurchaseReturnsGridComponent,
    PurchaseReturnsComponent,
    DetailPurchaseReturnComponent,
    ArchivedPurchaseReturnsListComponent,
    DashboardComponent,
    MaterialsEchartsPieComponent,
    StockChartjsPieComponent,
    PurchasesChartjsLineComponent,
    CreatePurchaseReturnComponent,
    ListReceiptsComponent,
    CreateReceiptComponent,
    ReceiptsComponent,
    GridReceiptsComponent,
    ReceiptDetailsComponent,
    ArchivedReceiptsListComponent,
    DocumentationComponent,
    ContinuePurchaseComponent,
    StockMaterialComponent,
    ReplenishMaterialComponent,
    ReplenishmentComponent,
    CreateInventoryComponent,
    InventoriesListComponent,
    InventoriesComponent,
    InventoriesGridComponent,
    InventoryDetailsComponent,
    FixStockComponent,
    InventoryMovementsListComponent,
    InventoryMovementsComponent,
    InventoryMovementsGridComponent,
    InventoryMovementDetailsComponent,
    DetailsWarehouseComponent,
    GridRfqsComponent,
    GridQuotationsComponent,
    MeetComponent,
    ShowCategoryComponent,
    DetailsPrComponent,
    DetailsRfqComponent,
    DetailsQuotationComponent,
    ArchivedPurchaseOrdersListComponent,
    ArchivedStockMovementsListComponent,
    ArchivedStockEntriesListComponent,
    ArchivedStockExitsListComponent,
    ArchivedInventoriesListComponent,
    ArchivedInventoryMovementsListComponent,
    PurchasesChartjsLineComponent,
    ChartjsBarHorizontalComponent,
    AllPurchasesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
    UcWidgetModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbButtonModule,
    Ng2SmartTableModule,
    Ng2SearchPipeModule,
    NbStepperModule,
    NbCheckboxModule,
    NbUserModule,
    NgbDropdownModule,
    NbProgressBarModule,
    NbToastrModule,
    NbDialogModule,
    ProductInventoryManagementRoutingModule,
    NbTooltipModule,
    NbIconModule,
    NbAlertModule,
    NgxPaginationModule,
    MatMenuModule,
    MatIconModule,
    NgxEchartsModule,
    MatButtonModule,
    NbAccordionModule,
    NbTagModule,
    NbFormFieldModule,
    NgxPrintElementModule,
    NbDatepickerModule,
    NgbModule,
    ConnectionServiceModule,
    NbChatModule,
    NbSpinnerModule,
    ChartModule,
    NgxBarcodeModule,
    NbListModule
  ],
  exports: [RouterModule, ChartjsBarHorizontalComponent],
})
export class ProductInventoryManagementModule { }