import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FinancialManagementRoutingModule } from './financial-management-routing.module';
import {
  NB_TIME_PICKER_CONFIG,
  NbActionsModule,
  NbAlertModule, NbBaseCalendarModule, NbButtonGroupModule,
  NbButtonModule, NbCalendarKitModule, NbCalendarModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule, NbListModule, NbMenuModule, NbProgressBarModule,
  NbRadioModule,
  NbSelectModule,
  NbSidebarModule, NbStepperModule, NbTabsetModule, NbTagModule, NbTimepickerModule,
  NbToastrModule, NbTooltipModule,
  NbTreeGridModule,
  NbUserModule, NbWindowModule,
  
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ThemeModule } from '../../@theme/theme.module';
import { DailyCashflowComponent } from './components/Transactions/annual-cashflow/daily-cashflow.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {NgxPaginationModule} from "ngx-pagination";
import {RouterModule} from "@angular/router";
import { NumberTypeComponent } from './components/Transactions/annual-cashflow/months/Utils/Editors/income-type/number-type.component';
import { TypeTypeComponent } from './components/Transactions/annual-cashflow/months/Utils/Editors/type-type/type-type.component';
import { DetailsTypeComponent } from './components/Transactions/annual-cashflow/months/Utils/Editors/details-type/details-type.component';
import { DateTypeComponent } from './components/Transactions/annual-cashflow/months/Utils/Editors/date-type/date-type.component';
import { ExpenseTypeComponent } from './components/Transactions/annual-cashflow/months/Utils/Editors/expense-type/expense-type.component';
import { MoneyFilterComponent } from './components/Transactions/annual-cashflow/months/Utils/Filters/money-filter/money-filter.component';
import { DateFilterComponent } from './components/Transactions/annual-cashflow/months/Utils/Filters/date-filter/date-filter.component';
import {MatNativeDateModule} from "@angular/material/core";
import { TypeFilterComponent } from './components/Transactions/annual-cashflow/months/Utils/Filters/type-filter/type-filter.component';
import {Ng2CompleterModule} from "ng2-completer";
import { TransactionsHistoryComponent } from './components/Transactions/transactions-history/transactions-history.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import { SalesProcessComponent } from './components/Sales/sales-process/sales-process.component';
import {ChartsModule} from "ng2-charts";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { AllMonthsComponent } from './components/Transactions/annual-cashflow/months/all-months/all-months.component';
import { GlobalHelpComponent } from './components/Transactions/transactions-utils/global-help/global-help.component';
import { MonthsHelpComponent } from './components/Transactions/transactions-utils/months-help/months-help.component';
import {SecondStepComponent} from "./components/Sales/sales-process/steps/second-step/second-step.component";
import { FilesTypeComponent } from './components/Transactions/annual-cashflow/months/Utils/Editors/files-type/files-type.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { AnnualBudgetComponent } from './components/Budgets/annual-budget/annual-budget/annual-budget.component';
import { MonthlyBudgetComponent } from './components/Budgets/monthly-budget/monthly-budget/monthly-budget.component';
import { ForecastBudgetComponent } from './components/Budgets/forecast-budget/forecast-budget.component';
import { SelectTypeComponent } from './components/Transactions/annual-cashflow/months/Utils/Editors/select-type/select-type.component';
import { SelectForExpenseTypeComponent } from './components/Transactions/annual-cashflow/months/Utils/Editors/select-for-expense-type/select-for-expense-type.component';
import { PurchaseRequestsComponent } from './components/Purchases/purchase-requests/purchase-requests.component';
import { PurchaseOrdersComponent } from './components/Purchases/purchase-orders/purchase-orders.component';
import { SelectTypeForForecastComponent } from './components/Transactions/annual-cashflow/months/Utils/Editors/select-type-for-forecast/select-type-for-forecast.component';
import { SelectDirectionForForecastComponent } from './components/Transactions/annual-cashflow/months/Utils/Editors/select-direction-for-forecast/select-direction-for-forecast.component';
import { DisabledInputComponent } from './components/Transactions/annual-cashflow/months/Utils/Editors/disabled-input/disabled-input.component';
import { SelectAccountsComponent } from './components/Transactions/annual-cashflow/months/Utils/Editors/select-accounts/select-accounts.component';
import { ReconciliationComponent } from './components/Reconciliation/reconciliation/reconciliation.component';
import { FilesWindowComponent } from './components/Transactions/transactions-utils/files-window/files-window.component';
import { ProductsSalesProcessComponent } from './components/Sales/products-sales-process/products-sales-process.component';
import { IncomeStatementComponent } from './components/Income Statement/income-statement/income-statement.component';
import { IncomeStatementHelperComponent } from './components/Income Statement/utils/helper/income-statement-helper/income-statement-helper.component';
import { SalesProcessHelperComponent } from './components/Sales/utils/helpers/sales-process-helper/sales-process-helper.component';
import { BudgetsHelperComponent } from './components/Budgets/util/helpers/budgets-helper/budgets-helper.component';
import { ForecastHelperComponent } from './components/Budgets/util/helpers/forecast-helper/forecast-helper.component';
import { ReconciliationHelperComponent } from './components/Reconciliation/util/helper/reconciliation-helper/reconciliation-helper.component';
import { CashFlowRiskComponent } from './components/Risk/cash-flow-risk/cash-flow-risk.component';
import { SalesRiskComponent } from './components/Risk/sales-risk/sales-risk.component';
import { FinanceInsightsComponent } from './components/finance-insights/finance-insights.component';


@NgModule({
  declarations: [
    DailyCashflowComponent,
    NumberTypeComponent,
    TypeTypeComponent,
    DetailsTypeComponent,
    DateTypeComponent,
    ExpenseTypeComponent,
    MoneyFilterComponent,
    DateFilterComponent,
    TypeFilterComponent,
    TransactionsHistoryComponent,
    SalesProcessComponent,
    AllMonthsComponent,
    GlobalHelpComponent,
    MonthsHelpComponent,
    SecondStepComponent,
    FilesTypeComponent,
    AnnualBudgetComponent,
    MonthlyBudgetComponent,
    ForecastBudgetComponent,
    SelectTypeComponent,
    SelectForExpenseTypeComponent,
    PurchaseRequestsComponent,
    PurchaseOrdersComponent,
    SelectTypeForForecastComponent,
    SelectDirectionForForecastComponent,
    DisabledInputComponent,
    SelectAccountsComponent,
    ReconciliationComponent,
    FilesWindowComponent,
    ProductsSalesProcessComponent,
    IncomeStatementComponent,
    IncomeStatementHelperComponent,
    SalesProcessHelperComponent,
    BudgetsHelperComponent,
    ForecastHelperComponent,
    ReconciliationHelperComponent,
    CashFlowRiskComponent,
    SalesRiskComponent,
    FinanceInsightsComponent],
  imports: [
    FormsModule,
    CommonModule,
    FinancialManagementRoutingModule,
    ReactiveFormsModule,
    NbTreeGridModule,
    NbDatepickerModule,
    NbTimepickerModule,
    NbAlertModule,
    NbToastrModule,
    ThemeModule,
    NbInputModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbSelectModule,
    NbIconModule,
    NbDialogModule,
    Ng2SmartTableModule,
    NbEvaIconsModule,
    NbCardModule,
    NgxPaginationModule,
    NbSidebarModule,
    RouterModule.forChild([ { path : 'finance/annualCashFlow'},
    ]),
    NbLayoutModule,
    NbMenuModule,
    NbTabsetModule,
    NbActionsModule,
    NbTooltipModule,
    NbTagModule,
    MatNativeDateModule,
    Ng2CompleterModule,
    NbCalendarModule,
    NbCalendarKitModule,
    MatNativeDateModule,
    
    MatButtonModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatInputModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatFormFieldModule,
    NbBaseCalendarModule,
    NbButtonGroupModule,
    NbProgressBarModule,
    NbStepperModule,
    NgxChartsModule,
    ChartsModule,
    NbListModule,
    NbWindowModule,
    NgbAccordionModule,
    
    
    








  ],
  entryComponents :[DateFilterComponent,DetailsTypeComponent,NumberTypeComponent,TypeTypeComponent,DateTypeComponent,ExpenseTypeComponent],
  providers :[{ provide:NB_TIME_PICKER_CONFIG, useValue:{} }
  ]
}) export class FinancialManagementModule { }
