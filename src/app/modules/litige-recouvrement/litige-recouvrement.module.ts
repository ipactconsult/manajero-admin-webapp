import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LitigeRecouvrementRoutingModule } from './litige-recouvrement-routing.module';
import { ListAvocatsComponent } from './components/avocat/list-avocats/list-avocats.component';
import { ListLoisComponent } from './components/lois/list-lois/list-lois.component';
import { CreateAvocatComponent } from './components/avocat/create-avocat/create-avocat.component';
import { ListCategoriesComponent } from './components/categories/list-categories/list-categories.component';
import { CreateCategoriesComponent } from './components/categories/create-categories/create-categories.component';
import { CreateLoiComponent } from './components/lois/create-loi/create-loi.component';
import { NbAccordionModule, NbAlertModule, NbBadgeModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbListModule, NbProgressBarModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbTagModule, NbToggleModule, NbTooltipModule, NbTreeGridModule, NbUserModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxEchartsModule } from 'ngx-echarts';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from '@nebular/auth';
import { EchartsPieComponent } from './components/recouvrement-rapport/pie-echart';
import { EchartsBarComponent } from './components/recouvrement-rapport/bar-chart';
import { PieEchartType } from './components/dashbord/piechartstype';




import { EchartsMultipleXaxisComponent } from './components/recouvrement-rapport/multiple-echarts';
import {CalendarModule,DateAdapter} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';







import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HumainCapitalManagementRoutingModule } from '../humain-capital-management/humain-capital-management-routing.module';
import { NgxOrgChartModule } from 'ngx-org-chart';
import { MatMenuModule } from '@angular/material/menu';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ThemeModule } from '../../@theme/theme.module';
import { CustomerRelationshipManagementRoutingModule } from '../customer-relationship-management/customer-relationship-management-routing.module';
import { CreateLitigeComponent } from './components/litige/create-litige/create-litige.component';
import { ListLitigeComponent } from './components/litige/list-litige/list-litige.component';
import { EditCategoriesComponent } from './components/categories/edit-categories/edit-categories.component';
import { EditAvocatComponent } from './components/avocat/edit-avocat/edit-avocat.component';
import { LitigeDetailsComponent } from './components/litige/litige-details/litige-details.component';
import { AvocatDetailsComponent } from './components/avocat/avocat-details/avocat-details.component';
import { UpdateloiComponent } from './components/lois/updateloi/updateloi.component';
import { EditLitigeComponent } from './components/litige/edit-litige/edit-litige.component';
import { EmailSendComponent } from './components/litige/email-send/email-send.component';
import { ListcategorieGrilleComponent } from './components/categories/listcategorie-grille/listcategorie-grille.component';
import { ListcategorieTableComponent } from './components/categories/listcategorie-table/listcategorie-table.component';
import { RapportChartComponent } from './components/litige/rapport-chart/rapport-chart.component';
import { LitigeProcessComponent } from './components/litige/litige-process/litige-process.component';
import { ListRelancesComponent } from './components/relances/list-relances/list-relances.component';
import { DetailsRelanceComponent } from './components/relances/details-relance/details-relance.component';
import { CreateRelanceComponent } from './components/relances/create-relance/create-relance.component';
import { MailComponent } from './components/relances/mails/mail/mail.component';
import { CommentComponent } from './components/relances/comment/comment/comment.component';
import { CallComponent } from './components/relances/calls/call/call.component';
import { PromiseComponent } from './components/relances/promises/promise/promise.component';
import { DateSuivantComponent } from './components/relances/date/date-suivant/date-suivant.component';
import { DateClotureComponent } from './components/relances/clotures/date-cloture/date-cloture.component';
import { RecouvrementRapportComponent } from './components/recouvrement-rapport/recouvrement-rapport.component';
import { AlgorithmeComponent } from './components/algorithme/algorithme.component';
import { ProcessComponent } from './components/judiciaire/process/process.component';
import { AvocatTableComponent } from './components/avocat/avocat-table/avocat-table.component';
import { AvocatGridComponent } from './components/avocat/avocat-grid/avocat-grid.component';
import { CalenderRelanceComponent } from './components/relances/calender-relance/calender-relance.component';
import { MeetComponent } from './components/avocat/meet/meet.component';
import { SpecialiteComponent } from './components/avocat/specialite/specialite.component';
import { SmsComponent } from './components/relances/sms/sms.component';
import { ImgComponent } from './components/img/img.component';
import { HistoriqueEmailComponent } from './components/relances/historique-email/historique-email.component';
import { HistoriqueSmsComponent } from './components/relances/historique-sms/historique-sms.component';
import { HistoriqueCallComponent } from './components/relances/historique-call/historique-call.component';
import { HistoriqueCommentsComponent } from './components/relances/historique-comments/historique-comments.component';
import { HistoriquePromiseComponent } from './components/relances/historique-promise/historique-promise.component';
import { PdfComponent } from './components/relances/export/pdf/pdf.component';
import { PdfsmsComponent } from './components/relances/pdfsms/pdfsms.component';
import { PdfcallComponent } from './components/relances/pdfcall/pdfcall.component';
import { PdfcommentComponent } from './components/relances/pdfcomment/pdfcomment.component';
import { PdfpormiseComponent } from './components/relances/pdfpormise/pdfpormise.component';
import { PenaltyComponent } from './components/relances/penalty/penalty.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { ContactAvocatComponent } from './components/dashbord/contact-avocat/contact-avocat.component';
import { ProgressRelanceComponent } from './components/dashbord/progress-relance/progress-relance.component';
import { ArchivedAvocatComponent } from './components/avocat/archived-avocat/archived-avocat.component';




@NgModule({
  declarations: [
    ListAvocatsComponent,
    ListLoisComponent,
    CreateAvocatComponent,
    ListCategoriesComponent,
    CreateCategoriesComponent,
    EchartsPieComponent,
    PieEchartType,
    CreateLoiComponent,
    CreateLitigeComponent,
    ListLitigeComponent,
    EditCategoriesComponent,
    EditAvocatComponent,
    LitigeDetailsComponent,
    AvocatDetailsComponent,
    UpdateloiComponent,
    EditLitigeComponent,
    EmailSendComponent,
    ListcategorieGrilleComponent,
    ListcategorieTableComponent,
    RapportChartComponent,
    LitigeProcessComponent,
    ListRelancesComponent,
    DetailsRelanceComponent,
    CreateRelanceComponent,
    MailComponent,
    CommentComponent,
    CallComponent,
    PromiseComponent,
    DateSuivantComponent,
    
    DateClotureComponent,
    RecouvrementRapportComponent,
    AlgorithmeComponent,
    EchartsBarComponent,
    EchartsMultipleXaxisComponent,
    ProcessComponent,
    AvocatTableComponent,
    AvocatGridComponent,
    CalenderRelanceComponent,
    MeetComponent,
    SpecialiteComponent,
    SmsComponent,
    ImgComponent,
    HistoriqueEmailComponent,
    HistoriqueSmsComponent,
    HistoriqueCallComponent,
    HistoriqueCommentsComponent,
    HistoriquePromiseComponent,
    PdfComponent,
    PdfsmsComponent,
    PdfcallComponent,
    PdfcommentComponent,
    PdfpormiseComponent,
    PenaltyComponent,
    DashbordComponent,
    ContactAvocatComponent,
    ProgressRelanceComponent,
    ArchivedAvocatComponent,
  ],
  imports: [
    CommonModule,
    LitigeRecouvrementRoutingModule,
    FormsModule,
    NbFormFieldModule,
    NbTooltipModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NbInputModule,
    NbToggleModule,
    NbSelectModule,
    NbButtonModule,
    NbUserModule,
    Ng2SmartTableModule,
    NbStepperModule,
    NbCheckboxModule,
    NbCardModule,
    HumainCapitalManagementRoutingModule,
    NgxOrgChartModule,
    NgxEchartsModule,
    NbIconModule,
    CommonModule,
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
    Ng2SmartTableModule,
    NbListModule,
    NbUserModule,
    NgxPaginationModule,
    NbAccordionModule,
    NbDatepickerModule,
    NbBadgeModule,
    ReactiveFormsModule,
    NbTabsetModule, CommonModule,
    NbIconModule,
    ThemeModule,
    NbDialogModule,
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NbSelectModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    NbEvaIconsModule,
    NbTreeGridModule,
    NbUserModule,
    CustomerRelationshipManagementRoutingModule,
    NbListModule,
    Ng2SearchPipeModule,
    NbProgressBarModule,
    MatMenuModule,
    NbTagModule,
    CalendarModule.forRoot({
      provide : DateAdapter,
      useFactory : adapterFactory
  }), 


    





  ]
})
export class LitigeRecouvrementModule { }
