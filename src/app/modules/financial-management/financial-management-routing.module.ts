import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DailyCashflowComponent } from './components/Transactions/annual-cashflow/daily-cashflow.component';

import {TransactionsHistoryComponent} from "./components/Transactions/transactions-history/transactions-history.component";
import {SalesProcessComponent} from "./components/Sales/sales-process/sales-process.component";
import {AllMonthsComponent} from "./components/Transactions/annual-cashflow/months/all-months/all-months.component";
import {SecondStepComponent} from "./components/Sales/sales-process/steps/second-step/second-step.component";
import { AnnualBudgetComponent } from './components/Budgets/annual-budget/annual-budget/annual-budget.component';
import {MonthlyBudgetComponent} from "./components/Budgets/monthly-budget/monthly-budget/monthly-budget.component";
import {ForecastBudgetComponent} from "./components/Budgets/forecast-budget/forecast-budget.component";
import {PurchaseRequestsComponent} from "./components/Purchases/purchase-requests/purchase-requests.component";
import {PurchaseOrdersComponent} from "./components/Purchases/purchase-orders/purchase-orders.component";
import {ReconciliationComponent} from "./components/Reconciliation/reconciliation/reconciliation.component";
import {ProductsSalesProcessComponent} from "./components/Sales/products-sales-process/products-sales-process.component";
import {IncomeStatementComponent} from "./components/Income Statement/income-statement/income-statement.component";
import {CashFlowRiskComponent} from "./components/Risk/cash-flow-risk/cash-flow-risk.component";
import {SalesRiskComponent} from "./components/Risk/sales-risk/sales-risk.component";
import {FinanceInsightsComponent} from "./components/finance-insights/finance-insights.component";


const routes: Routes = [
  
  {path : 'annualCashFlow', component: DailyCashflowComponent},
  {path :'annualCashFlow/months/:month/:year', component:AllMonthsComponent},
  {path : 'history', component: TransactionsHistoryComponent},
  {path: 'salesProcess', component:SalesProcessComponent},
  {path: 'productsSalesProcess', component:ProductsSalesProcessComponent},

  {path: 'annualBudget', component: AnnualBudgetComponent},
  {path:'monthlyBudget/:month/:year',component:MonthlyBudgetComponent},
  {path: 'forecastBudget/:year',component:ForecastBudgetComponent},
  {path :'/salesProcess/secondStep/' ,component:SecondStepComponent},
  {path : 'purchaseRequests', component: PurchaseRequestsComponent},
  {path : 'purchaseOrders', component: PurchaseOrdersComponent},
  {path :'reconciliation',component:ReconciliationComponent},
  {path :'incomeStatement',component:IncomeStatementComponent},
  {path :'cfRisk',component:CashFlowRiskComponent},
  {path :'salesRisk',component:SalesRiskComponent},
  {path :'financeInsights',component:FinanceInsightsComponent},





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialManagementRoutingModule {
  
}
