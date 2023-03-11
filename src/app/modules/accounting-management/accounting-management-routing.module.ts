import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddTaxrateComponent} from './components/add-taxrate/add-taxrate.component';
import { JournalDetailsComponent } from './components/journal-details/journal-details.component';
import { JournalListComponent } from './components/journal-list/journal-list.component';
import {AddJournalComponent} from "./components/add-journal/add-journal.component";
import {AccountListComponent} from "./components/account-list/account-list.component";
import {AddAccountComponent} from "./components/add-account/add-account.component";
import {CreditListComponent} from "./components/credit-list/credit-list.component";
import {CreditPaymentListComponent} from "./components/credit-payment-list/credit-payment-list.component";
import {AddCreditComponent} from "./components/add-credit/add-credit.component";
import {OrderListComponent} from "./components/order-list/order-list.component";
import {InvoiceDetailComponent} from "./components/invoice-detail/invoice-detail.component";
import {InvoiceListComponent} from "./components/invoice-list/invoice-list.component";
import {AddInvoiceComponent} from "./components/add-invoice/add-invoice.component";
import {AddInvoiceItemsComponent} from "./components/add-invoice-items/add-invoice-items.component";
import {PdfViewerComponent} from "./components/pdf-viewer/pdf-viewer.component";
import {PdftronViewerComponent} from "./components/pdftron-viewer/pdftron-viewer.component";
import {InvoiceGridComponent} from "./components/invoice-grid/invoice-grid.component";
import {InvoiceDataListComponent} from "./components/invoice-data-list/invoice-data-list.component";
import {CreditDataListComponent} from "./components/credit-data-list/credit-data-list.component";
import {CreditGridComponent} from "./components/credit-grid/credit-grid.component";
import {JournalEditComponent} from "./components/journal-edit/journal-edit.component";
import {ArchivedJournalListComponent} from "./components/archived-journal-list/archived-journal-list.component";
import {InsightsComponent} from "./components/insights/insights.component";

const routes: Routes = [
  {
  path: 'addtaxrate',
  component: AddTaxrateComponent,
  },
  {
    path: 'journaldetail/:id',
    component: JournalDetailsComponent,
  },
  {
    path: 'journallist',
    component: JournalListComponent,
  },
  {
    path: 'addjournal',
    component: AddJournalComponent,
  },
  {
    path: 'accountlist',
    component: AccountListComponent,
  },
  {
    path: 'addaccount',
    component: AddAccountComponent,
  },
  {
    path: 'creditlist',
    component: CreditListComponent,
  },
  {
    path: 'creditdetail/:id',
    component: CreditPaymentListComponent,
  },
  {
    path: 'addcredit',
    component: AddCreditComponent,
  },
  {
    path: 'invoicelist',
    component: InvoiceListComponent,
  },
  {
    path:'invoicedetail/:id',
    component: InvoiceDetailComponent,
  },
  {
    path:'addinvoice',
    component: AddInvoiceComponent,
  },
  {
    path:'addinvoiceitems/:id',
    component: AddInvoiceItemsComponent,
  },
  {
    path: 'editjournal/:id',
    component: JournalEditComponent,
  },
  {
    path:'declarationviewer',
    component: PdfViewerComponent,
  },
  {
    path: 'pdftronviwer',
    component: PdftronViewerComponent,
  },
  {
    path: 'invoicegrid',
    component: InvoiceGridComponent,
  },
  {
    path: 'invoicedatalist',
    component: InvoiceDataListComponent,
  },
  {
    path: 'creditgrid',
    component: CreditGridComponent,
  },
  {
    path: 'creditdatalist',
    component: CreditDataListComponent,
  },
  {
    path: 'archivedjournal',
    component: ArchivedJournalListComponent,
  },
  {
    path: 'insights',
    component: InsightsComponent,
  }
  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountingManagementRoutingModule { }
