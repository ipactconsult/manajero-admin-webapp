import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ngxRatingModule } from "ngx-rating-star";
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {
  NbAccordionModule,
  NbAlertModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule, NbCheckboxModule,
  NbDatepickerModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbProgressBarModule, NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbStepperModule,
  NbTabsetModule,
  NbTagModule,
  NbToggleModule,
  NbTooltipModule,
  NbTreeGridModule,
  NbUserModule,
  NbWindowModule
} from '@nebular/theme';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {CustomersComponent} from './components/Customers Management/customers/customers.component';
import {CreateCustomerComponent} from './components/Customers Management/create-customer/create-customer.component';
import {CustomerRelationshipManagementRoutingModule} from './customer-relationship-management-routing.module';
import {DealsComponent} from './components/Deals Management/deals/deals.component';
import {ThemeModule} from '../../@theme/theme.module';
import {DealsDetailsComponent} from './components/Deals Management/deals-details/deals-details.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {MatMenuModule} from '@angular/material/menu';
import {AddDealComponent} from './components/Deals Management/add-deal/add-deal.component';
import {EditDealComponent} from './components/Deals Management/edit-deal/edit-deal.component';
import {VisitsComponent} from './components/Visits Management/visits/visits.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {AddVisitComponent} from './components/Visits Management/add-visit/add-visit.component';
import {EditVisitComponent} from './components/Visits Management/edit-visit/edit-visit.component';
import {VisitDetailsComponent} from './components/Visits Management/visit-details/visit-details.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {EditCustomerComponent} from './components/Customers Management/edit-customer/edit-customer.component';
import {CustomerDetailsComponent} from './components/Customers Management/customer-details/customer-details.component';
import {GridCustomersComponent} from './components/Customers Management/grid-customers/grid-customers.component';
import {ListCustomersComponent} from './components/Customers Management/list-customers/list-customers.component';
import {ListDealsComponent} from './components/Deals Management/list-deals/list-deals.component';
import {ListVisitsComponent} from './components/Visits Management/list-visits/list-visits.component';
import {ProspectsManagementComponent} from './components/Prospects Management/prospects-management/prospects-management.component';
import {ProspectDetailComponent} from './components/Prospects Management/prospect-detail/prospect-detail.component';
import {EditProspectComponent} from './components/Prospects Management/edit-prospect/edit-prospect.component';
import {ProspectsComponent} from './components/Prospects Management/prospects/prospects.component';
import {AddProspectComponent} from './components/Prospects Management/add-prospect/add-prospect.component';
import {ContractsComponent} from './components/Contracts Management/contracts/contracts.component';
import {ContractsDetailsComponent} from './components/Contracts Management/contracts-details/contracts-details.component';
import {EditContractComponent} from './components/Contracts Management/edit-contract/edit-contract.component';
import {AddContractComponent} from './components/Contracts Management/add-contract/add-contract.component';
import {CustomerHistoryComponent} from './components/Customers Management/customer-history/customer-history.component';
import {ListContractsComponent} from './components/Contracts Management/list-contracts/list-contracts.component';
import {CalendarVisitsComponent} from './components/Visits Management/calendar-visits/calendar-visits.component';
import {Ng2TelInputModule} from 'ng2-tel-input';
import {ClaimsComponent} from './components/Claims Managements/claims/claims.component';
import {ListClaimsComponent} from './components/Claims Managements/list-claims/list-claims.component';
import {AddClaimComponent} from './components/Claims Managements/add-claim/add-claim.component';
import {EditClaimComponent} from './components/Claims Managements/edit-claim/edit-claim.component';
import {GridContractsComponent} from './components/Contracts Management/grid-contracts/grid-contracts.component';
import {ContractsHistoryComponent} from './components/Contracts Management/contracts-history/contracts-history.component';
import {ClaimsHistoryComponent} from './components/Claims Managements/claims-history/claims-history.component';
import {DealsHistoryComponent} from './components/Deals Management/deals-history/deals-history.component';
import {ProspectsHistoryComponent} from './components/Prospects Management/prospects-history/prospects-history.component';
import {VisitsHistoryComponent} from './components/Visits Management/visits-history/visits-history.component';
import {GridDealsComponent} from './components/Deals Management/grid-deals/grid-deals.component';
import {GridVisitsComponent} from './components/Visits Management/grid-visits/grid-visits.component';
import {GridClaimsComponent} from './components/Claims Managements/grid-claims/grid-claims.component';
import {ClaimDetailComponent} from './components/Claims Managements/claim-detail/claim-detail.component';
import {QuotationsComponent} from './components/Quotation Management/quotations/quotations.component';
import {AddQuotationComponent} from './components/Quotation Management/add-quotation/add-quotation.component';
import {OrdersComponent} from './components/Orders Management/orders/orders.component';
import {RespondClaimComponent} from './components/Claims Managements/respond-claim/respond-claim.component';
import {ListQuotationsComponent} from './components/Quotation Management/list-quotations/list-quotations.component';
import {GridQuotationsComponent} from './components/Quotation Management/grid-quotations/grid-quotations.component';
import { AddOrderComponent } from './components/Orders Management/add-order/add-order.component';
import { ContractModelComponent } from './components/Contracts Management/contract-model/contract-model.component';
import {CKEditorModule} from 'ng2-ckeditor';
import {JitsiComponent} from './components/meet/jitsi/jitsi.component';
import { ThankYouComponent } from './components/meet/thank-you/thank-you.component';
import {NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
import { GridOrdersComponent } from './components/Orders Management/grid-orders/grid-orders.component';
import { ListOrdersComponent } from './components/Orders Management/list-orders/list-orders.component';
import { TrackingOrderComponent } from './components/Orders Management/tracking-order/tracking-order.component';
import { OrderDetailsComponent } from './components/Orders Management/order-details/order-details.component';
import { TableQuotationsComponent } from './components/Quotation Management/table-quotations/table-quotations.component';
import { DealsCustomerComponent } from './components/Customers Management/deals-customer/deals-customer.component';
import { EditOrderComponent } from './components/Orders Management/edit-order/edit-order.component';
import { DeliverOrderComponent } from './components/Delivery Management/deliver-order/deliver-order.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OnlyClientsComponent } from './components/Customers Management/only-clients/only-clients.component';
import {NgxCopyPasteModule} from 'ngx-copypaste';
import { OrdersHistoryComponent } from './components/Orders Management/orders-history/orders-history.component';


@NgModule({
  declarations: [
    CustomersComponent,
    CreateCustomerComponent,
    DealsComponent,
    DealsDetailsComponent,
    AddDealComponent,
    EditDealComponent,
    VisitsComponent,
    AddVisitComponent,
    EditVisitComponent,
    VisitDetailsComponent,
    EditCustomerComponent,
    CustomerDetailsComponent,
    GridCustomersComponent,
    ListCustomersComponent,
    ListDealsComponent,
    ListVisitsComponent,
    ProspectsManagementComponent,
    ProspectDetailComponent,
    EditProspectComponent,
    ProspectsComponent,
    AddProspectComponent,
    ContractsComponent,
    ContractsDetailsComponent,
    EditContractComponent,
    AddContractComponent,
    CustomerHistoryComponent,
    ListContractsComponent,
    CalendarVisitsComponent,
    ClaimsComponent,
    ListClaimsComponent,
    AddClaimComponent,
    EditClaimComponent,
    GridContractsComponent,
    ContractsHistoryComponent,
    ClaimsHistoryComponent,
    DealsHistoryComponent,
    ProspectsHistoryComponent,
    VisitsHistoryComponent,
    GridDealsComponent,
    GridVisitsComponent,
    GridClaimsComponent,
    ClaimDetailComponent,
    QuotationsComponent,
    AddQuotationComponent,
    OrdersComponent,
    RespondClaimComponent,
    ListQuotationsComponent,
    GridQuotationsComponent,
    AddOrderComponent,
    ContractModelComponent,
    JitsiComponent,
    ThankYouComponent,
    GridOrdersComponent,
    ListOrdersComponent,
    TrackingOrderComponent,
    OrderDetailsComponent,
    TableQuotationsComponent,
    DealsCustomerComponent,
    EditOrderComponent,
    DeliverOrderComponent,
    DashboardComponent,
    OnlyClientsComponent,
    OrdersHistoryComponent,
  ],
  imports: [
    CommonModule,
    NbIconModule,
    ThemeModule,
    NbDialogModule,
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NbSelectModule,
    ngxRatingModule,
    NgbRatingModule,
    FormsModule,
    NbCheckboxModule,
    NbRadioModule,
    ReactiveFormsModule,
    NgxCopyPasteModule,
    Ng2SmartTableModule,
    NbEvaIconsModule,
    NbTreeGridModule,
    NbUserModule,
    CustomerRelationshipManagementRoutingModule,
    NbListModule,
    Ng2SearchPipeModule,
    Ng2TelInputModule,
    NbSpinnerModule,
    NbProgressBarModule,
    MatMenuModule,
    DragDropModule,
    NbAlertModule,
    NbProgressBarModule,
    NbDatepickerModule,
    NbWindowModule,
    NbBadgeModule,
    NgxPaginationModule,
    NbAccordionModule,
    NbTagModule,
    NbTooltipModule,
    NbTabsetModule,
    NbStepperModule,

    CKEditorModule,
    NbToggleModule,
    NbFormFieldModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),


  ],

  exports: [
    VisitDetailsComponent
  ]
})
export class CustomerRelationshipManagementModule {
}
