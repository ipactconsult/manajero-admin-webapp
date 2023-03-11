import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ProjectManagementRoutingModule } from './project-management-routing.module';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbProgressBarModule,
  NbSelectModule,
  NbStepperModule,
  NbTabsetModule,
  NbWindowModule,
  NbSpinnerModule,
  NbBadgeModule,
  NbLayoutModule,
  NbTagModule,
  NbAccordionModule,
  NbContextMenuModule,
  NbActionsModule,
  NbTreeGridModule,
  NbAutocompleteModule,
  NbUserModule
} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NbEvaIconsModule} from '@nebular/eva-icons';

import { ScheduleComponent } from './components/activities/schedule/schedule/schedule.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { TaskmanagerComponent } from './components/activities/taskManager/taskmanager/taskmanager.component';
import { ActivityTableComponent } from './components/activities/activitiesTable/activity-table/activity-table.component';
import { ProjectCharterTablleComponent } from './components/project-charter/project-charter-tablle/project-charter-tablle.component';
import { ProjectCharterDetailsComponent } from './components/project-charter/project-charter-details/project-charter-details.component';
import { AddProjectCharterComponent } from './components/project-charter/add-project-charter/add-project-charter.component';
import { ProjectCharterGeneralInfoComponent } from './components/project-charter/project-charter-general-info/project-charter-general-info.component';
import { ProblematicComponent } from './components/project-charter/problematic/problematic/problematic.component';
import { ProjectProductDescriptionComponent } from './components/project-charter/project-product-description/project-product-description/project-product-description.component';
import { DeliveryUnitsTableComponent } from './components/project-charter/delivery-units/delivery-units-table/delivery-units-table.component';
import { AddDeliveryUnitComponent } from './components/project-charter/delivery-units/add-delivery-unit/add-delivery-unit.component';
import { SuccessCriteriaTableComponent } from './components/project-charter/success-criteria/success-criteria-table/success-criteria-table.component';
import { AddSuccessCriteriaComponent } from './components/project-charter/success-criteria/add-success-criteria/add-success-criteria.component';
import { AddProblematicComponent } from './components/project-charter/problematic/add-problematic/add-problematic.component';
import { GoalTableComponent } from './components/project-charter/goal/goal/goal-table/goal-table.component';
import { ProjectGoalComponent } from './components/project-charter/goal/goal/project-goal/project-goal.component';
import { CreateUpdateProjectGoalComponent } from './components/project-charter/goal/goal/create-update-project-goal/create-update-project-goal.component';
import { MilestoneTableComponent } from './components/project-charter/goal/milestone/milestone-table/milestone-table.component';
import { CreateUpdateMilestoneComponent } from './components/project-charter/goal/milestone/create-update-milestone/create-update-milestone.component';
import { AddProjectProductDescriptionComponent } from './components/project-charter/project-product-description/add-project-product-description/add-project-product-description.component';
import { HighLevelRiskTableComponent } from './components/project-charter/high-level-risk/high-level-risk-table/high-level-risk-table.component';
import { AddLevelRiskComponent } from './components/project-charter/high-level-risk/add-level-risk/add-level-risk.component';
import { KeyStakeholdersTableComponent } from './components/project-charter/Key-stakeholders/key-stakeholders-table/key-stakeholders-table.component';
import { AddKeyStakeholderComponent } from './components/project-charter/Key-stakeholders/add-key-stakeholder/add-key-stakeholder.component';
import { AddAreComponent } from './components/project-charter/Are/add-are/add-are.component';
import { AreTableComponent } from './components/project-charter/Are/are-table/are-table.component';
import { AddresponsibilityCustomerComponent } from './components/project-charter/responsibilityCustomer/addresponsibility-customer/addresponsibility-customer.component';
import { ResponsibilityCustomerTableComponent } from './components/project-charter/responsibilityCustomer/responsibility-customer-table/responsibility-customer-table.component';
import { AddBudgetComponent } from './components/project-charter/budget/add-budget/add-budget.component';
import { BudgetTableComponent } from './components/project-charter/budget/budget-table/budget-table.component';
import { StatisticalMoreInfoComponent } from './components/project-charter/statistical-more-info/statistical-more-info/statistical-more-info.component';
import { GenraleInfoFormComponent } from './components/project-charter/project-charter-general-info/genrale-info-form/genrale-info-form.component';
import {AngularFireStorageModule} from '@angular/fire/storage'
import {AngularFireModule} from '@angular/fire'
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from '../../../environments/environment';
import { AddChangeRequestComponent } from './components/changeRequest/add-change-request/add-change-request.component';
import { ChangeRequestTableComponent } from './components/changeRequest/change-request-table/change-request-table.component';
import { UploadFileComponent } from './components/project-charter/upload-file/upload-file.component';
import { StatisticComponent } from './components/project-charter/statistic/statistic.component';
import { MatMenuModule } from '@angular/material/menu';
import { EditGoalComponent } from './components/project-charter/goal/goal/edit-goal/edit-goal.component';
import { ExportPdfComponent } from './components/project-charter/export-pdf/export-pdf/export-pdf.component';
import { CreateProjectComponent } from './components/Project/create-project/create-project.component';
import { ProjectTableComponent } from './components/Project/project-table/project-table.component';
import { ProjectDetailsComponent } from './components/Project/project-details/project-details.component';
import { ProjectGeneraleInfoComponent } from './components/Project/generale-info/project-generale-info/project-generale-info.component';
import { RequirementTableComponent } from './components/Project/requirement/requirement-table/requirement-table.component';
import { AddRequirementComponent } from './components/Project/requirement/add-requirement/add-requirement.component';
import { ProcessComponent } from './components/process/process.component';
import { RiskTableComponent } from './components/Project/risk/risk-table/risk-table.component';
import { RiskFormComponent } from './components/Project/risk/risk-form/risk-form.component';
import { StakeholderTableComponent } from './components/Project/stakholder/stakeholder-table/stakeholder-table.component';
import { StakeholderFormComponent } from './components/Project/stakholder/stakeholder-form/stakeholder-form.component';
import { SuccessTableComponent } from './components/Project/success-criteria/success-table/success-table.component';
import { SuccessFormComponent } from './components/Project/success-criteria/success-form/success-form.component';
import { BudgetFormComponent } from './components/Project/budget/budget-form/budget-form.component';
import { ProjectBudgetTableComponent } from './components/Project/budget/project-budget-table/project-budget-table.component';
import { ProcessStepsComponent } from './components/process-steps/process-steps.component';
import { AssumptionTableComponent } from './components/Project/assumption/assumption-table/assumption-table.component';
import { AssumptionFormComponent } from './components/Project/assumption/assumption-form/assumption-form.component';
import { GoalsTableComponent } from './components/Project/goals/goals-table/goals-table.component';
import { GoalFormComponent } from './components/Project/goals/goal-form/goal-form.component';
import { ActionPlanComponent } from './components/Project/action-plan/action-plan.component';
import { GeneraleInfoFormComponent } from './components/Project/generale-info/generale-info-form/generale-info-form.component';
import { DetailEditChangeRequestComponent } from './components/changeRequest/detail-edit-change-request/detail-edit-change-request.component';
import { ActivitiesTableComponent } from './components/Project/activities/activities-table/activities-table.component';
import { ActivitiesFormComponent } from './components/Project/activities/activities-form/activities-form.component';
import { ResourceTableComponent } from './components/Project/resource/resource-table/resource-table.component';
import { ResourceFormComponent } from './components/Project/resource/resource-form/resource-form.component';
import { TeamTableComponent } from './components/Project/team/team-table/team-table.component';
import { TeamFormComponent } from './components/Project/team/team-form/team-form.component';
import { HelpComponent } from './components/Project/risk/help/help.component';
import { HelpActionPlanComponent } from './components/Project/action-plan/help-action-plan/help-action-plan.component';
import { ListItemAddedStepComponent } from './components/Project/action-plan/list-item-added-step/list-item-added-step.component';
import { ActivitiesStatusComponent } from './components/Project/activities/activities-status/activities-status.component';
import { ActivitiesStepperComponent } from './components/Project/activities/activities-stepper/activities-stepper.component';
import { GoalsDetailsComponent } from './components/Project/goals/goals-details/goals-details.component';
import { AtivityResourceComponent } from './components/Project/activities/ativity-resource/ativity-resource.component';
import { AtivityTeamComponent } from './components/Project/activities/ativity-team/ativity-team.component';
import { ResourceRequestComponent } from './components/Project/resource/resource-request/resource-request.component';
import { CardComponent } from './components/Project/project-grid/card/card.component';
import { ListCardComponent } from './components/Project/project-grid/list-card/list-card.component';
import { AssignEmployeeComponent } from './components/Project/activities/assign-employee/assign-employee.component';
import { TaskModalComponent } from './components/activities/taskManager/task-modal/task-modal.component';
import { TaskManagerFormComponent } from './components/activities/taskManager/task-manager-form/task-manager-form.component';
import { TaskDetailsComponent } from './components/activities/schedule/task-details/task-details.component';
import { ResourceRequestTableComponent } from './components/Project/resource/resource-request-table/resource-request-table.component';
import { BudgetListComponent } from './components/Project/budget/budget-list/budget-list.component';
import { BudgetEstimatedComponent } from './components/Project/budget/budget-estimated/budget-estimated.component';
import { BudgetResourceComponent } from './components/Project/budget/budget-resource/budget-resource.component';
import { BudgetAdditionelComponent } from './components/Project/budget/budget-additionel/budget-additionel.component';
import { BudgetEstimatedTableComponent } from './components/Project/budget/budget-estimated-table/budget-estimated-table.component';
import { BudgetResourceTableComponent } from './components/Project/budget/budget-resource-table/budget-resource-table.component';
import { MemberComponent } from './components/Project/members/member/member.component';
import { MemberCardComponent } from './components/Project/members/member-card/member-card.component';
import { SharedProjectComponent } from './components/Project/shared-project/shared-project.component';
import { SharedProjectDetailsComponent } from './components/Project/shared-project-details/shared-project-details/shared-project-details.component';
//

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
]);
@NgModule({
  declarations: [
 
    ScheduleComponent,
    TaskmanagerComponent,
    ActivityTableComponent,
    ProjectCharterTablleComponent,
    ProjectCharterDetailsComponent,
    AddProjectCharterComponent,
    ProjectCharterGeneralInfoComponent,
    ProblematicComponent,
    ProjectProductDescriptionComponent,
    DeliveryUnitsTableComponent,
    AddDeliveryUnitComponent,
    SuccessCriteriaTableComponent,
    AddSuccessCriteriaComponent,
    AddProblematicComponent,
    GoalTableComponent,
    ProjectGoalComponent,
    CreateUpdateProjectGoalComponent,
    MilestoneTableComponent,
    CreateUpdateMilestoneComponent,
    AddProjectProductDescriptionComponent,
    HighLevelRiskTableComponent,
    AddLevelRiskComponent,
    KeyStakeholdersTableComponent,
    AddKeyStakeholderComponent,
    AddAreComponent,
    AreTableComponent,
    AddresponsibilityCustomerComponent,
    ResponsibilityCustomerTableComponent,
    AddBudgetComponent,
    BudgetTableComponent,
    StatisticalMoreInfoComponent,
    GenraleInfoFormComponent,
    AddChangeRequestComponent,
    ChangeRequestTableComponent,
    UploadFileComponent,
    StatisticComponent,
    EditGoalComponent,
    ExportPdfComponent,
    CreateProjectComponent,
    ProjectTableComponent,
    ProjectDetailsComponent,
    ProjectGeneraleInfoComponent,
    RequirementTableComponent,
    AddRequirementComponent,
    ProcessComponent,
    RiskTableComponent,
    RiskFormComponent,
    StakeholderTableComponent,
    StakeholderFormComponent,
    SuccessTableComponent,
    SuccessFormComponent,
    BudgetFormComponent,
    ProjectBudgetTableComponent,
    ProcessStepsComponent,
    AssumptionTableComponent,
    AssumptionFormComponent,
    GoalsTableComponent,
    GoalFormComponent,
    ActionPlanComponent,
    GeneraleInfoFormComponent,
    DetailEditChangeRequestComponent,
    ActivitiesTableComponent,
    ActivitiesFormComponent,
    ResourceTableComponent,
    ResourceFormComponent,
    TeamTableComponent,
    TeamFormComponent,
    HelpComponent,
    HelpActionPlanComponent,
    ListItemAddedStepComponent,
    ActivitiesStatusComponent,
    ActivitiesStepperComponent,
    GoalsDetailsComponent,
    AtivityResourceComponent,
    AtivityTeamComponent,
    ResourceRequestComponent,
    CardComponent,
    ListCardComponent,
    AssignEmployeeComponent,
    TaskModalComponent,
    TaskManagerFormComponent,
    TaskDetailsComponent,
    ResourceRequestTableComponent,
    BudgetListComponent,
    BudgetEstimatedComponent,
    BudgetResourceComponent,
    BudgetAdditionelComponent,
    BudgetEstimatedTableComponent,
    BudgetResourceTableComponent,
    MemberComponent,
    MemberCardComponent,
    SharedProjectComponent,
    SharedProjectDetailsComponent,
  ],
  imports: [
    CommonModule,
    ProjectManagementRoutingModule,
    NbButtonModule,
    NbCardModule,
    MatMenuModule,
    NbDialogModule,
    NbIconModule,
    NbInputModule,
    NbSelectModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    NbEvaIconsModule,
    NbTabsetModule,
    DragDropModule,
    FullCalendarModule,
    NbAlertModule,
    NbProgressBarModule,
    NbDatepickerModule,
    NbWindowModule,
    NbStepperModule,
    NbSelectModule,
    NbDialogModule,
    NbSpinnerModule,
    NbBadgeModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbTagModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    NbAccordionModule,
    NbContextMenuModule,
    NbActionsModule,
    NbTreeGridModule,
    NbAutocompleteModule,
   // BeautifulChartsModule  
   NbUserModule  
  ]
})
export class ProjectManagementModule { }
