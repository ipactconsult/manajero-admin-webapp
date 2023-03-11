import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarModule,DateAdapter} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HumainCapitalManagementRoutingModule } from './humain-capital-management-routing.module';
import { ListDepartmentsComponent } from './components/departments/list-departments/list-departments.component';
import { CreateDepartmentComponent } from './components/departments/create-department/create-department.component';
import { ListEmployeesComponent } from './components/employees/list-employees/list-employees.component';
import {NgxOrgChartModule} from 'ngx-org-chart';
import { CKEditorModule } from 'ng2-ckeditor';

import { ViewOrganigramComponent } from './components/organigram/view-organigram/view-organigram.component';
import {
  NbAccordionModule,
  NbAlertModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbProgressBarModule,
  NbSelectModule,
  NbSpinnerModule,
  NbStepperModule,
  NbTabsetModule,
  NbTagModule,
  NbToggleModule,
  NbTooltipModule,
  NbUserModule, NbWindowModule
} from '@nebular/theme';
import {NgxCopyPasteModule} from 'ngx-copypaste';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import {NgxPaginationModule} from 'ngx-pagination';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { EditDepartmentComponent } from './components/departments/edit-department/edit-department.component';
import { CreateEmployeeComponent } from './components/employees/create-employee/create-employee.component';
import { AdvancedDetailsEmployeeComponent } from './components/employees/advanced-details-employee/advanced-details-employee.component';
import { EditEmployeeComponent } from './components/employees/edit-employee/edit-employee.component';
import { SubListDepartmentComponent } from './components/departments/subdepartments/sub-list-department/sub-list-department.component';
import { CreateSubDepartmentComponent } from './components/departments/subdepartments/create-sub-department/create-sub-department.component';
import { EditSubDepartmentComponent } from './components/departments/subdepartments/edit-sub-department/edit-sub-department.component';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { LevelComponent } from './components/organigram/level/level.component';
import { KeypadListEmployeesComponent } from './components/employees/keypad-list-employees/keypad-list-employees.component';
import { TableEmployeesComponent } from './components/employees/table-employees/table-employees.component';
import { GridDepartmentComponent } from './components/departments/grid-department/grid-department.component';
import { TableDepartmentComponent } from './components/departments/table-department/table-department.component';
import {NgxPrintModule} from "ngx-print";
import { ReadMoreModule } from 'ng-readmore';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { GridSubDepartmentComponent } from './components/departments/subdepartments/grid-sub-department/grid-sub-department.component';
import { TableSubDepartmentComponent } from './components/departments/subdepartments/table-sub-department/table-sub-department.component';
import { NgxPrintElementModule } from 'ngx-print-element';
import { HistoriqueDepartmentsComponent } from './components/departments/historique-departments/historique-departments.component';
import { EmployeesHistoryComponent } from './components/employees/employees-history/employees-history.component';
import { KeypadContractsComponent } from './components/contracts/keypad-contracts/keypad-contracts.component';
import { GridContractsComponent } from './components/contracts/grid-contracts/grid-contracts.component';
import { ContractsTableComponent } from './components/contracts/contracts-table/contracts-table.component';
import { HistoryContractsComponent } from './components/contracts/history-contracts/history-contracts.component';
import { AllLeaveRequestsGridViewComponent } from './components/absence/all-leave-requests-grid-view/all-leave-requests-grid-view.component';
import { AllLeaveRequestsKeypadViewComponent } from './components/absence/all-leave-requests-keypad-view/all-leave-requests-keypad-view.component';
import { AllLeaveRequestsTableViewComponent } from './components/absence/all-leave-requests-table-view/all-leave-requests-table-view.component';
import { AssignContractComponent } from './components/contracts/assign-contract/assign-contract.component';
import { ContractDetailsComponent } from './components/contracts/contract-details/contract-details.component';
import { EditContractComponent } from './components/contracts/edit-contract/edit-contract.component';
import { GlobalCalendarLeavesRequestComponent } from './components/absence/global-calendar-leaves-request/global-calendar-leaves-request.component';
import { EditLeaveRequestComponent } from './components/absence/edit-leave-request/edit-leave-request.component';
import { KeypadReleasesComponent } from './components/release/keypad-releases/keypad-releases.component';
import { GridReleasesComponent } from './components/release/grid-releases/grid-releases.component';
import { TableReleasesComponent } from './components/release/table-releases/table-releases.component';
import { CategoryJobsComponent } from './components/recruitment/category/category-jobs/category-jobs.component';
import { RecruitmentWorflowComponent } from './components/recruitment/recruitment-worflow/recruitment-worflow.component';
import { EditReleaseComponent } from './components/release/edit-release/edit-release.component';
import { GridJobsComponent } from './components/recruitment/grid-jobs/grid-jobs.component';
import { KeypadJobsComponent } from './components/recruitment/keypad-jobs/keypad-jobs.component';
import { TableJobsComponent } from './components/recruitment/table-jobs/table-jobs.component';
import { JitsiComponent } from './components/recruitment/jitsi/jitsi.component';
import { SalleAnnexeComponent } from './components/recruitment/salle-annexe/salle-annexe.component';
import { AddTrainingComponent } from './components/tranings/add-training/add-training.component';
import { GridTrainingsComponent } from './components/tranings/grid-trainings/grid-trainings.component';
import { KeypadTrainingsComponent } from './components/tranings/keypad-trainings/keypad-trainings.component';
import { TableTrainingsComponent } from './components/tranings/table-trainings/table-trainings.component';
import { EditTrainingComponent } from './components/tranings/edit-training/edit-training.component';
import { AddSkillsComponent } from './components/skills/add-skills/add-skills.component';
import { GridSkillsComponent } from './components/skills/grid-skills/grid-skills.component';
import { KeypadSkillsComponent } from './components/skills/keypad-skills/keypad-skills.component';
import { TableSkillsComponent } from './components/skills/table-skills/table-skills.component';
import { AddEvaluationComponent } from './components/evaluation/add-evaluation/add-evaluation.component';
import { GridEvaluationComponent } from './components/evaluation/grid-evaluation/grid-evaluation.component';
import { KeypadEvaluationComponent } from './components/evaluation/keypad-evaluation/keypad-evaluation.component';
import { TableEvaluationComponent } from './components/evaluation/table-evaluation/table-evaluation.component';
import { EditEvaluationComponent } from './components/evaluation/edit-evaluation/edit-evaluation.component';
import { HumanDashboardComponent } from './components/hrDashboard/human-dashboard/human-dashboard.component';
import { GridApplicationsComponent } from './components/recruitment/applications/grid-applications/grid-applications.component';
import { KeypadApplicationsComponent } from './components/recruitment/applications/keypad-applications/keypad-applications.component';
import { TableApplicationsComponent } from './components/recruitment/applications/table-applications/table-applications.component';
import { ScreenApplicationComponent } from './components/recruitment/applications/screen-application/screen-application.component';
import { AllExpensesComponent } from './components/expenses/all-expenses/all-expenses.component';
import { ExpensesGridComponent } from './components/expenses/expenses-grid/expenses-grid.component';
import { ExpensesTableComponent } from './components/expenses/expenses-table/expenses-table.component';
import { CreateExpenseComponent } from './components/expenses/create-expense/create-expense.component';
import { EditExpenseComponent } from './components/expenses/edit-expense/edit-expense.component';
import { EditSkillComponent } from './components/skills/edit-skill/edit-skill.component';
import { PaySheetComponent } from './components/paysheet/pay-sheet/pay-sheet.component';
import { PayGrid4Component } from './components/pay/pay-grid4/pay-grid4.component';
import { PayGrid9Component } from './components/pay/pay-grid9/pay-grid9.component';
import { PayTableComponent } from './components/pay/pay-table/pay-table.component';
import { PaySheetFormComponent } from './components/pay/pay-sheet-form/pay-sheet-form.component';
import { RecommendedTrainingComponent } from './components/tranings/recommended-training/recommended-training.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
//import {CountdownModule} from "ngx-countdown";

@NgModule({
  declarations: [
    ListDepartmentsComponent,
    CreateDepartmentComponent,
    ListEmployeesComponent,
    ViewOrganigramComponent,
    EditDepartmentComponent,
    CreateEmployeeComponent,
    AdvancedDetailsEmployeeComponent,
    EditEmployeeComponent,
    SubListDepartmentComponent,
    CreateSubDepartmentComponent,
    EditSubDepartmentComponent,
    LevelComponent,
    KeypadListEmployeesComponent,
    TableEmployeesComponent,
    GridDepartmentComponent,
    TableDepartmentComponent,
    GridSubDepartmentComponent,
    TableSubDepartmentComponent,
    HistoriqueDepartmentsComponent,
    EmployeesHistoryComponent,
    KeypadContractsComponent,
    GridContractsComponent,
    ContractsTableComponent,
    HistoryContractsComponent,
    AllLeaveRequestsGridViewComponent,
    AllLeaveRequestsKeypadViewComponent,
    AllLeaveRequestsTableViewComponent,
    AssignContractComponent,
    ContractDetailsComponent,
    EditContractComponent,
    GlobalCalendarLeavesRequestComponent,
    EditLeaveRequestComponent,
    KeypadReleasesComponent,
    GridReleasesComponent,
    TableReleasesComponent,
    CategoryJobsComponent,
    RecruitmentWorflowComponent,
    EditReleaseComponent,
    GridJobsComponent,
    KeypadJobsComponent,
    TableJobsComponent,
    JitsiComponent,
    SalleAnnexeComponent,
    AddTrainingComponent,
    GridTrainingsComponent,
    KeypadTrainingsComponent,
    TableTrainingsComponent,
    EditTrainingComponent,
    AddSkillsComponent,
    GridSkillsComponent,
    KeypadSkillsComponent,
    TableSkillsComponent,
    AddEvaluationComponent,
    GridEvaluationComponent,
    KeypadEvaluationComponent,
    TableEvaluationComponent,
    EditEvaluationComponent,
    HumanDashboardComponent,
    GridApplicationsComponent,
    KeypadApplicationsComponent,
    TableApplicationsComponent,
    ScreenApplicationComponent,
    AllExpensesComponent,
    ExpensesGridComponent,
    ExpensesTableComponent,
    CreateExpenseComponent,
    EditExpenseComponent,
    EditSkillComponent,
    PaySheetComponent,
    PayGrid4Component,
    PayGrid9Component,
    PayTableComponent,
    PaySheetFormComponent,
    RecommendedTrainingComponent,

  ],
  imports: [
    HumainCapitalManagementRoutingModule,
    NgxOrgChartModule,
    NbIconModule,
    CommonModule,
    CKEditorModule,
    FormsModule,
    NbSelectModule,
    NbInputModule,
    NbButtonModule,
    NbDialogModule,
    NbCardModule,
    MatMenuModule,
    NbEvaIconsModule,
    Ng2SearchPipeModule,
    NbAlertModule,
    NbStepperModule,
    ReactiveFormsModule,
    NbListModule,
    NbUserModule,
    NgxPaginationModule,
    NbBadgeModule,
    ReactiveFormsModule,
    NbTabsetModule,
    NbAccordionModule,
    NbTagModule,
    NbCheckboxModule,
    NbLayoutModule,
    Ng2TelInputModule,
    NbTooltipModule,
    NbDatepickerModule,
    NbSpinnerModule,
    NgxPrintModule,
    NgxPrintElementModule,
    PdfViewerModule,
    NbWindowModule,
    NbFormFieldModule,
    CalendarModule.forRoot({
        provide : DateAdapter,
        useFactory : adapterFactory
    }), 
    NbToggleModule,
    NgxSliderModule,
    ReadMoreModule,
    NbProgressBarModule,
    NgxCopyPasteModule,
    
  //  CountdownModule
    NgxChartsModule
  
  ],
})
export class HumainCapitalManagementModule { }
