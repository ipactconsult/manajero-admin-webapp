import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaxrateComponent } from './components/add-taxrate/add-taxrate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    NbAlertModule,
    NbButtonModule,
    NbCardModule, NbDatepickerModule,
    NbDialogModule, NbFormFieldModule,
    NbIconModule,
    NbInputModule,
    NbSelectModule, NbStepperModule, NbTagModule, NbTooltipModule,
    NbTreeGridModule,
    NbWindowModule,
} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import { JournalListComponent } from './components/journal-list/journal-list.component';
import { JournalDetailsComponent } from './components/journal-details/journal-details.component';
import {MatMenuModule} from '@angular/material/menu';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {RouterModule} from "@angular/router";
import {AddJournalComponent} from "./components/add-journal/add-journal.component";
import { TypeTypeComponent } from './utils/type-type/type-type.component';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AddAccountComponent } from './components/add-account/add-account.component';
import { CreditListComponent } from './components/credit-list/credit-list.component';
import { AddCreditComponent } from './components/add-credit/add-credit.component';
import { CreditPaymentListComponent } from './components/credit-payment-list/credit-payment-list.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderGridComponent } from './components/order-grid/order-grid.component';
import { InvoiceDetailComponent } from './components/invoice-detail/invoice-detail.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { AddInvoiceComponent } from './components/add-invoice/add-invoice.component';
import { AddInvoiceItemsComponent } from './components/add-invoice-items/add-invoice-items.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { PdftronViewerComponent } from './components/pdftron-viewer/pdftron-viewer.component';
import { InvoiceGridComponent } from './components/invoice-grid/invoice-grid.component';
import { InvoiceDataListComponent } from './components/invoice-data-list/invoice-data-list.component';
import { CreditGridComponent } from './components/credit-grid/credit-grid.component';
import { CreditDataListComponent } from './components/credit-data-list/credit-data-list.component';
import { ArchivedJournalListComponent } from './components/archived-journal-list/archived-journal-list.component';
import { JournalEditComponent } from './components/journal-edit/journal-edit.component';
import { InsightsComponent } from './components/insights/insights.component';
import {ChartModule} from "angular2-chartjs";
import {AccountingManagementRoutingModule} from "./accounting-management-routing.module";
import {ProductInventoryManagementModule} from "../product-inventory-management/product-inventory-management.module";




@NgModule({
  declarations: [
    AddTaxrateComponent,
    JournalListComponent,
    JournalDetailsComponent,
    AddJournalComponent,
    TypeTypeComponent,
    AccountListComponent,
    AddAccountComponent,
    CreditListComponent,
    AddCreditComponent,
    CreditPaymentListComponent,
    OrderListComponent,
    OrderGridComponent,
    InvoiceDetailComponent,
    InvoiceListComponent,
    AddInvoiceComponent,
    AddInvoiceItemsComponent,
    PdfViewerComponent,
    PdftronViewerComponent,
    InvoiceGridComponent,
    InvoiceDataListComponent,
    CreditGridComponent,
    CreditDataListComponent,
    ArchivedJournalListComponent,
    JournalEditComponent,
    InsightsComponent,
  ],
  imports: [
    CommonModule,
    NbIconModule,
    NbTreeGridModule,
    Ng2SearchPipeModule,
    NbDialogModule,
    MatMenuModule,
    NbSelectModule,
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NbSelectModule,
    NgxPaginationModule,
    NbWindowModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    NbDatepickerModule,
    NbEvaIconsModule,
    NbAlertModule,
    RouterModule,
    NbIconModule,
    NbEvaIconsModule,
    NbTagModule,
    NbTooltipModule,
    NbFormFieldModule,
    NbStepperModule,
    ChartModule,
    AccountingManagementRoutingModule,
    ProductInventoryManagementModule
  ]
})
export class AccountingManagementModule { }
