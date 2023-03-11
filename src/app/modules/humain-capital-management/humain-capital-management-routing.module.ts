import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDepartmentComponent } from './components/departments/create-department/create-department.component';
import { EditDepartmentComponent } from './components/departments/edit-department/edit-department.component';
import { ListDepartmentsComponent } from './components/departments/list-departments/list-departments.component';
import { CreateSubDepartmentComponent } from './components/departments/subdepartments/create-sub-department/create-sub-department.component';
import { EditSubDepartmentComponent } from './components/departments/subdepartments/edit-sub-department/edit-sub-department.component';
import { SubListDepartmentComponent } from './components/departments/subdepartments/sub-list-department/sub-list-department.component';
import { AdvancedDetailsEmployeeComponent } from './components/employees/advanced-details-employee/advanced-details-employee.component';
import { CreateEmployeeComponent } from './components/employees/create-employee/create-employee.component';
import { EditEmployeeComponent } from './components/employees/edit-employee/edit-employee.component';
import { ListEmployeesComponent } from './components/employees/list-employees/list-employees.component';
import { ViewOrganigramComponent } from './components/organigram/view-organigram/view-organigram.component';
import {LevelComponent} from "./components/organigram/level/level.component";
import { KeypadListEmployeesComponent } from './components/employees/keypad-list-employees/keypad-list-employees.component';
import {TableEmployeesComponent} from "./components/employees/table-employees/table-employees.component";
import {GridDepartmentComponent} from "./components/departments/grid-department/grid-department.component";
import {TableDepartmentComponent} from "./components/departments/table-department/table-department.component";
import { GridSubDepartmentComponent } from './components/departments/subdepartments/grid-sub-department/grid-sub-department.component';
import { TableSubDepartmentComponent } from './components/departments/subdepartments/table-sub-department/table-sub-department.component';
import { HistoriqueDepartmentsComponent } from './components/departments/historique-departments/historique-departments.component';
import { EmployeesHistoryComponent } from './components/employees/employees-history/employees-history.component';
import { KeypadContractsComponent } from './components/contracts/keypad-contracts/keypad-contracts.component';
import { GridContractsComponent } from './components/contracts/grid-contracts/grid-contracts.component';
import { ContractsTableComponent } from './components/contracts/contracts-table/contracts-table.component';
import { ContractDetailsComponent } from './components/contracts/contract-details/contract-details.component';
import { HistoryContractsComponent } from './components/contracts/history-contracts/history-contracts.component';
import { AllLeaveRequestsGridViewComponent } from './components/absence/all-leave-requests-grid-view/all-leave-requests-grid-view.component';
import { AllLeaveRequestsKeypadViewComponent } from './components/absence/all-leave-requests-keypad-view/all-leave-requests-keypad-view.component';
import { AllLeaveRequestsTableViewComponent } from './components/absence/all-leave-requests-table-view/all-leave-requests-table-view.component';
import { AssignContractComponent } from './components/contracts/assign-contract/assign-contract.component';
import { EditContractComponent } from './components/contracts/edit-contract/edit-contract.component';
import { GlobalCalendarLeavesRequestComponent } from './components/absence/global-calendar-leaves-request/global-calendar-leaves-request.component';
import { EditLeaveRequestComponent } from './components/absence/edit-leave-request/edit-leave-request.component';
import { GridReleasesComponent } from './components/release/grid-releases/grid-releases.component';
import { KeypadReleasesComponent } from './components/release/keypad-releases/keypad-releases.component';
import { TableReleasesComponent } from './components/release/table-releases/table-releases.component';
import { RecruitmentWorflowComponent } from './components/recruitment/recruitment-worflow/recruitment-worflow.component';
import { EditReleaseComponent } from './components/release/edit-release/edit-release.component';
import { GridJobsComponent } from './components/recruitment/grid-jobs/grid-jobs.component';
import { CategoryJobsComponent } from './components/recruitment/category/category-jobs/category-jobs.component';
import { KeypadJobsComponent } from './components/recruitment/keypad-jobs/keypad-jobs.component';
import { TableJobsComponent } from './components/recruitment/table-jobs/table-jobs.component';
import { JitsiComponent } from './components/recruitment/jitsi/jitsi.component';
import { SalleAnnexeComponent } from './components/recruitment/salle-annexe/salle-annexe.component';
import { AddTrainingComponent } from './components/tranings/add-training/add-training.component';
import { AddSkillsComponent } from './components/skills/add-skills/add-skills.component';
import { GridSkillsComponent } from './components/skills/grid-skills/grid-skills.component';
import { KeypadSkillsComponent } from './components/skills/keypad-skills/keypad-skills.component';
import { TableSkillsComponent } from './components/skills/table-skills/table-skills.component';
import { GridTrainingsComponent } from './components/tranings/grid-trainings/grid-trainings.component';
import { KeypadTrainingsComponent } from './components/tranings/keypad-trainings/keypad-trainings.component';
import { TableTrainingsComponent } from './components/tranings/table-trainings/table-trainings.component';
import { RecommendedTrainingComponent } from './components/tranings/recommended-training/recommended-training.component';
import { AddEvaluationComponent } from './components/evaluation/add-evaluation/add-evaluation.component';
import { GridEvaluationComponent } from './components/evaluation/grid-evaluation/grid-evaluation.component';
import { KeypadEvaluationComponent } from './components/evaluation/keypad-evaluation/keypad-evaluation.component';
import { TableEvaluationComponent } from './components/evaluation/table-evaluation/table-evaluation.component';
import { HumanDashboardComponent } from './components/hrDashboard/human-dashboard/human-dashboard.component';
import { GridApplicationsComponent } from './components/recruitment/applications/grid-applications/grid-applications.component';
import { KeypadApplicationsComponent } from './components/recruitment/applications/keypad-applications/keypad-applications.component';
import { TableApplicationsComponent } from './components/recruitment/applications/table-applications/table-applications.component';
import { ScreenApplicationComponent } from './components/recruitment/applications/screen-application/screen-application.component';
import { AllExpensesComponent } from './components/expenses/all-expenses/all-expenses.component';
import { ExpensesGridComponent } from './components/expenses/expenses-grid/expenses-grid.component';
import { ExpensesTableComponent } from './components/expenses/expenses-table/expenses-table.component';
import { CreateExpenseComponent } from './components/expenses/create-expense/create-expense.component';
import {EditExpenseComponent} from "./components/expenses/edit-expense/edit-expense.component";
import {EditTrainingComponent} from "./components/tranings/edit-training/edit-training.component";
import {EditSkillComponent} from "./components/skills/edit-skill/edit-skill.component";
import {PaySheetComponent} from "./components/paysheet/pay-sheet/pay-sheet.component";
import {PaySheetFormComponent} from "./components/pay/pay-sheet-form/pay-sheet-form.component";
import {PayGrid4Component} from "./components/pay/pay-grid4/pay-grid4.component";
import {PayGrid9Component} from "./components/pay/pay-grid9/pay-grid9.component";
import {PayTableComponent} from "./components/pay/pay-table/pay-table.component";
const routes: Routes = [
  {path: 'department/list', component: ListDepartmentsComponent},
  {path: 'department/grid', component: GridDepartmentComponent},
  {path: 'department/table', component: TableDepartmentComponent},
  {path: 'department/create', component: CreateDepartmentComponent},
  {path :'department/delete/:id',component: ListDepartmentsComponent},
  {path: 'department/update/:id', component:EditDepartmentComponent},
  {path: 'department/history', component:HistoriqueDepartmentsComponent},
  
  {path: 'employee/list_', component: ListEmployeesComponent},
  {path: 'employee/keypad/list_', component: KeypadListEmployeesComponent},
  {path: 'employee/table', component: TableEmployeesComponent},
  {path:'employee/advanced/:id',component:AdvancedDetailsEmployeeComponent},
  {path:'employee/create_',component:CreateEmployeeComponent},
  {path:'employee/update_/:id',component:EditEmployeeComponent},
  {path :'employee/delete_/:id', component:ListEmployeesComponent},
  {path: 'employee/history',component:EmployeesHistoryComponent},
  {path: 'organigram/view', component: ViewOrganigramComponent},
  {path: 'organigram/level/createandview', component: LevelComponent},
  {path : 'employee/edit/:id', component: EditEmployeeComponent},

  {path : 'subdepartment/createSub', component: CreateSubDepartmentComponent},
  {path: 'subdepartment/subList', component: SubListDepartmentComponent},
  {path: 'subdepartment/sub/grid', component: GridSubDepartmentComponent},
  {path: 'subdepartment/sub/table', component: TableSubDepartmentComponent},
  {path :'subdepartment/delete/:id', component: SubListDepartmentComponent},
  {path : 'department/subdepartment/delete/:id', component:ListDepartmentsComponent},
  {path :'subdepartment/edit/:id', component: EditSubDepartmentComponent},

  {path:'contracts/keypad',component:KeypadContractsComponent},
  {path:'contracts/grid',component:GridContractsComponent},
  {path:'contracts/table',component:ContractsTableComponent},
  {path:'contracts/assign/:id',component:AssignContractComponent},
  {path:'contracts/contract/details/:id', component: ContractDetailsComponent},
  {path:'contracts/contract/edit-contract/:id', component: EditContractComponent},
  {path:'contracts/history',component:HistoryContractsComponent},

  {path:'absences/allLeavesRequestsGridView',component:AllLeaveRequestsGridViewComponent},
  {path:'absences/allLeavesRequestsKeypadView',component:AllLeaveRequestsKeypadViewComponent},
  {path:'absences/allLeavesRequestsTableView',component:AllLeaveRequestsTableViewComponent},
  {path:'absences/global_calendar',component:GlobalCalendarLeavesRequestComponent},
  {path:'absences/edit-request/:id',component:EditLeaveRequestComponent},

  {path:'release/grid',component:GridReleasesComponent},
  {path:'release/keypad',component:KeypadReleasesComponent},
  {path:'release/table',component:TableReleasesComponent},
  {path:'release/edit/:id',component:EditReleaseComponent},

  {path:'recruitment/jobs/addJob',component:CategoryJobsComponent},
  {path :'recruitment/workflow', component:RecruitmentWorflowComponent},
  {path :'recruitment/jobs/grid', component:GridJobsComponent},
  {path :'recruitment/jobs/keypad', component:KeypadJobsComponent},
  {path :'recruitment/jobs/table', component:TableJobsComponent},
  {path :'recruitment/interview/room', component:JitsiComponent},
  {path :'recruitment/interview/annexe',component:SalleAnnexeComponent},
  {path :'recruitment/applications/grid',component:GridApplicationsComponent},
  {path :'recruitment/applications/keypad',component:KeypadApplicationsComponent},
  {path :'recruitment/applications/table',component:TableApplicationsComponent},
  {path :'recruitment/application/app/:id',component:ScreenApplicationComponent},


  {path :'trainings/training/create',component:AddTrainingComponent},
  {path :'trainings/grid',component:GridTrainingsComponent},
  {path :'trainings/keypad',component:KeypadTrainingsComponent},
  {path :'trainings/table',component:TableTrainingsComponent},
  {path :'trainings/edit/:id',component:EditTrainingComponent},
  {path :'trainings/recommended',component:RecommendedTrainingComponent},

  {path :'skills/skill/create',component:AddSkillsComponent },
  {path :'skills/grid',component:GridSkillsComponent },
  {path :'skills/keypad',component:KeypadSkillsComponent },
  {path :'skills/table',component:TableSkillsComponent },
  {path :'skills/edit/:id',component:EditSkillComponent},

  {path: 'evaluation/create',component: AddEvaluationComponent},
  {path: 'evaluation/grid',component: GridEvaluationComponent},
  {path: 'evaluation/keypad',component: KeypadEvaluationComponent},
  {path: 'evaluation/table',component: TableEvaluationComponent},

  {path: 'dashboard',component: HumanDashboardComponent},

  {path: 'expenses/grid', component: ExpensesGridComponent},
  {path: 'expenses/keypad', component: AllExpensesComponent},
  {path: 'expenses/table', component: ExpensesTableComponent},
  {path : 'expenses/create', component: CreateExpenseComponent},
  {path : 'expense/edit/:id', component: EditExpenseComponent},

  {path:'pay/paysheet/details/:id',component: PaySheetComponent},
  {path : 'pay/paysheetform/:id',component: PaySheetFormComponent},
  {path : 'pay/grid4payroll',component: PayGrid4Component},
  {path : 'pay/grid9payroll',component: PayGrid9Component},
  {path : 'pay/tablepayroll',component: PayTableComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class HumainCapitalManagementRoutingModule { }
