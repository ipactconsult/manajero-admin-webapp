import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomersComponent} from './components/Customers Management/customers/customers.component';
import {DealsComponent} from './components/Deals Management/deals/deals.component';
import {AddDealComponent} from './components/Deals Management/add-deal/add-deal.component';
import {EditDealComponent} from './components/Deals Management/edit-deal/edit-deal.component';
import {VisitsComponent} from './components/Visits Management/visits/visits.component';
import {AddVisitComponent} from './components/Visits Management/add-visit/add-visit.component';
import {EditVisitComponent} from './components/Visits Management/edit-visit/edit-visit.component';
import {VisitDetailsComponent} from './components/Visits Management/visit-details/visit-details.component';
import {EditCustomerComponent} from './components/Customers Management/edit-customer/edit-customer.component';
import {CustomerDetailsComponent} from './components/Customers Management/customer-details/customer-details.component';
import {DealsDetailsComponent} from './components/Deals Management/deals-details/deals-details.component';
import {GridCustomersComponent} from './components/Customers Management/grid-customers/grid-customers.component';
import {ListCustomersComponent} from './components/Customers Management/list-customers/list-customers.component';
import {ListDealsComponent} from './components/Deals Management/list-deals/list-deals.component';
import {ListVisitsComponent} from './components/Visits Management/list-visits/list-visits.component';
import {ProspectsManagementComponent} from './components/Prospects Management/prospects-management/prospects-management.component';
import {ProspectDetailComponent} from './components/Prospects Management/prospect-detail/prospect-detail.component';
import {EditProspectComponent} from './components/Prospects Management/edit-prospect/edit-prospect.component';
import {ProspectsComponent} from './components/Prospects Management/prospects/prospects.component';
import {CreateCustomerComponent} from './components/Customers Management/create-customer/create-customer.component';
import {AddProspectComponent} from './components/Prospects Management/add-prospect/add-prospect.component';
import {ContractsComponent} from './components/Contracts Management/contracts/contracts.component';
import {ContractsDetailsComponent} from './components/Contracts Management/contracts-details/contracts-details.component';
import {AddContractComponent} from './components/Contracts Management/add-contract/add-contract.component';
import {EditContractComponent} from './components/Contracts Management/edit-contract/edit-contract.component';
import {CustomerHistoryComponent} from './components/Customers Management/customer-history/customer-history.component';
import {ListContractsComponent} from './components/Contracts Management/list-contracts/list-contracts.component';
import {CalendarVisitsComponent} from './components/Visits Management/calendar-visits/calendar-visits.component';
import {ClaimsComponent} from './components/Claims Managements/claims/claims.component';
import {AddClaimComponent} from './components/Claims Managements/add-claim/add-claim.component';
import {GridContractsComponent} from './components/Contracts Management/grid-contracts/grid-contracts.component';
import {EditClaimComponent} from './components/Claims Managements/edit-claim/edit-claim.component';
import {ListClaimsComponent} from './components/Claims Managements/list-claims/list-claims.component';
import {GridDealsComponent} from './components/Deals Management/grid-deals/grid-deals.component';
import {GridVisitsComponent} from './components/Visits Management/grid-visits/grid-visits.component';
import {GridClaimsComponent} from './components/Claims Managements/grid-claims/grid-claims.component';
import {ClaimDetailComponent} from './components/Claims Managements/claim-detail/claim-detail.component';
import {QuotationsComponent} from './components/Quotation Management/quotations/quotations.component';
import {AddQuotationComponent} from './components/Quotation Management/add-quotation/add-quotation.component';
import {ProspectsHistoryComponent} from './components/Prospects Management/prospects-history/prospects-history.component';
import {VisitsHistoryComponent} from './components/Visits Management/visits-history/visits-history.component';
import {DealsHistoryComponent} from './components/Deals Management/deals-history/deals-history.component';
import {ContractsHistoryComponent} from './components/Contracts Management/contracts-history/contracts-history.component';
import {ClaimsHistoryComponent} from './components/Claims Managements/claims-history/claims-history.component';
import {OrdersComponent} from './components/Orders Management/orders/orders.component';
import {ContractModelComponent} from './components/Contracts Management/contract-model/contract-model.component';
import {JitsiComponent} from './components/meet/jitsi/jitsi.component';
import {ThankYouComponent} from './components/meet/thank-you/thank-you.component';
import {AddOrderComponent} from './components/Orders Management/add-order/add-order.component';
import {RespondClaimComponent} from './components/Claims Managements/respond-claim/respond-claim.component';
import {GridOrdersComponent} from './components/Orders Management/grid-orders/grid-orders.component';
import {ListOrdersComponent} from './components/Orders Management/list-orders/list-orders.component';
import {TrackingOrderComponent} from './components/Orders Management/tracking-order/tracking-order.component';
import {OrderDetailsComponent} from './components/Orders Management/order-details/order-details.component';
import {GridQuotationsComponent} from './components/Quotation Management/grid-quotations/grid-quotations.component';
import {TableQuotationsComponent} from './components/Quotation Management/table-quotations/table-quotations.component';
import {EditOrderComponent} from './components/Orders Management/edit-order/edit-order.component';
import {DeliverOrderComponent} from './components/Delivery Management/deliver-order/deliver-order.component';
import {OrdersHistoryComponent} from './components/Orders Management/orders-history/orders-history.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

const routes: Routes = [
  {

    path: 'customers',
    component: CustomersComponent,
  },
  {
    path: 'create-customer',
    component: CreateCustomerComponent,
  },
  {
    path: 'grid-customers',
    component: GridCustomersComponent,
  },
  {
    path: 'list-customers',
    component: ListCustomersComponent,
  },
  {
    path: 'deletecustomer/:id',
    component: CustomersComponent
  },
  {
    path: 'edit-customer/:id',
    component: EditCustomerComponent
  },
  {
    path: 'customer-details/:id',
    component: CustomerDetailsComponent
  },
  {
    path: 'history/customer-history',
    component: CustomerHistoryComponent
  },
  {
    path: 'deals',
    component: DealsComponent
  },
  {
    path: 'list-deals',
    component: ListDealsComponent
  },
  {
    path: 'grid-deals',
    component: GridDealsComponent
  },
  {
    path: 'history/deals-history',
    component: DealsHistoryComponent
  },
  {
    path: 'addDeal',
    component: AddDealComponent
  },
  {
    path: 'update-deal/:id',
    component: EditDealComponent
  },
  {
    path: 'deal-detail/:id',
    component: DealsDetailsComponent
  },
  {
    path: 'delete/:id',
    component: DealsComponent
  },
  {
    path: 'visits',
    component: VisitsComponent
  },
  {
    path: 'grid-visits',
    component: GridVisitsComponent
  },
  {
    path: 'list-visits',
    component: ListVisitsComponent
  },
  {
    path: 'calendar-visits',
    component: CalendarVisitsComponent
  },
  {
    path: 'history/visits-history',
    component: VisitsHistoryComponent
  },
  {
    path: 'add-visit',
    component: AddVisitComponent
  },
  {
    path: 'delete-visit/:id',
    component: VisitsComponent
  },
  {
    path: 'edit-visit/:id',
    component: EditVisitComponent
  },
  {
    path: 'details-visit/:id',
    component: VisitDetailsComponent
  },
  {
    path: 'list-prospects',
    component: ProspectsManagementComponent
  },
  {
    path: 'create-prospect',
    component: AddProspectComponent
  },
  {
    path: 'history/history-prospects',
    component: ProspectsHistoryComponent
  },

  {
    path: 'prospects',
    component: ProspectsComponent
  },
  {
    path: 'prospect-detail/:id',
    component: ProspectDetailComponent
  },
  {
    path: 'edit-prospect/:id',
    component: EditProspectComponent
  },
  {
    path: 'contracts',
    component: ContractsComponent
  },
  {
    path: 'list-contracts',
    component: ListContractsComponent
  },
  {
    path: 'grid-contracts',
    component: GridContractsComponent
  },
  {
    path: 'contract-details/:id',
    component: ContractsDetailsComponent
  },
  {
    path: 'history/contracts-history',
    component: ContractsHistoryComponent
  }, 
  {
    path: 'contract-model',
    component: ContractModelComponent
  },
  {
    path: 'add-contract/:id',
    component: AddContractComponent
  },
  {
    path: 'edit-contract/:id',
    component: EditContractComponent
  },
  {
    path: 'claims',
    component: ClaimsComponent
  },
  {
    path: 'history/claims-history',
    component: ClaimsHistoryComponent
  },
  {
    path: 'list-claims',
    component: ListClaimsComponent
  },
  {
    path: 'grid-claims',
    component: GridClaimsComponent
  },
  {
    path: 'add-claim',
    component: AddClaimComponent
  },
  {
    path: 'edit-claim/:id',
    component: EditClaimComponent
  },
  {
    path: 'claim-detail/:id',
    component: ClaimDetailComponent
  },
  {
    path: 'respond-claim/:id',
    component: RespondClaimComponent
  },
  {
    path: 'quotations',
    component: QuotationsComponent
  },
  {
    path: 'grid-quotations',
    component: GridQuotationsComponent
  },
  {
    path: 'table-quotations',
    component: TableQuotationsComponent
  },
  {
    path: 'demand-quotation',
    component: AddQuotationComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'grid-orders',
    component: GridOrdersComponent
  }, 
  {
    path: 'history/orders-history',
    component: OrdersHistoryComponent
  },
  {
    path: 'list-orders',
    component: ListOrdersComponent
  },
  {
    path: 'add-order',
    component: AddOrderComponent
  }, 
  {
    path: 'edit-order/:id',
    component: EditOrderComponent
  },
  {
    path: 'tracking-order/:id',
    component: TrackingOrderComponent
  },
  {
    path: 'order-details/:id',
    component: OrderDetailsComponent
  },
  {
    path: 'meet',
    component: JitsiComponent
  },
  {
    path: 'thanks',
    component: ThankYouComponent
  }
,
  {
    path: 'deliver-order/:id',
    component: DeliverOrderComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRelationshipManagementRoutingModule {
}
