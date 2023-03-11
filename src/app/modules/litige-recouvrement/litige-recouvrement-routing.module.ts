import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlgorithmeComponent } from './components/algorithme/algorithme.component';
import { AvocatDetailsComponent } from './components/avocat/avocat-details/avocat-details.component';
import { CreateAvocatComponent } from './components/avocat/create-avocat/create-avocat.component';
import { EditAvocatComponent } from './components/avocat/edit-avocat/edit-avocat.component';
import { ListAvocatsComponent } from './components/avocat/list-avocats/list-avocats.component';
import { CreateCategoriesComponent } from './components/categories/create-categories/create-categories.component';
import { EditCategoriesComponent } from './components/categories/edit-categories/edit-categories.component';
import { ListCategoriesComponent } from './components/categories/list-categories/list-categories.component';
import { ListcategorieGrilleComponent } from './components/categories/listcategorie-grille/listcategorie-grille.component';
import { ListcategorieTableComponent } from './components/categories/listcategorie-table/listcategorie-table.component';
import { CreateLitigeComponent } from './components/litige/create-litige/create-litige.component';
import { EditLitigeComponent } from './components/litige/edit-litige/edit-litige.component';
import { EmailSendComponent } from './components/litige/email-send/email-send.component';
import { ListLitigeComponent } from './components/litige/list-litige/list-litige.component';
import { LitigeDetailsComponent } from './components/litige/litige-details/litige-details.component';
import { RapportChartComponent } from './components/litige/rapport-chart/rapport-chart.component';
import { CreateLoiComponent } from './components/lois/create-loi/create-loi.component';
import { ListLoisComponent } from './components/lois/list-lois/list-lois.component';
import { UpdateloiComponent } from './components/lois/updateloi/updateloi.component';
import { RecouvrementRapportComponent } from './components/recouvrement-rapport/recouvrement-rapport.component';
import { CallComponent } from './components/relances/calls/call/call.component';
import { DateClotureComponent } from './components/relances/clotures/date-cloture/date-cloture.component';
import { CommentComponent } from './components/relances/comment/comment/comment.component';
import { CreateRelanceComponent } from './components/relances/create-relance/create-relance.component';
import { DateSuivantComponent } from './components/relances/date/date-suivant/date-suivant.component';
import { DetailsRelanceComponent } from './components/relances/details-relance/details-relance.component';
import { ListRelancesComponent } from './components/relances/list-relances/list-relances.component';
import { MailComponent } from './components/relances/mails/mail/mail.component';
import { PromiseComponent } from './components/relances/promises/promise/promise.component';
import { ProcessComponent } from './components/judiciaire/process/process.component';
import { CalenderRelanceComponent } from './components/relances/calender-relance/calender-relance.component';
import { AvocatGridComponent } from './components/avocat/avocat-grid/avocat-grid.component';
import { AvocatTableComponent } from './components/avocat/avocat-table/avocat-table.component';
import { MeetComponent } from './components/avocat/meet/meet.component';
import { SpecialiteComponent } from './components/avocat/specialite/specialite.component';
import { ImgComponent } from './components/img/img.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { ArchivedAvocatComponent } from './components/avocat/archived-avocat/archived-avocat.component';



const routes: Routes = [
  {path: 'listavocats', component: ListAvocatsComponent},
  {path: 'tableavocats', component: AvocatTableComponent},
  {path: 'gridavocats', component: AvocatGridComponent},
  {path: 'detailavocat/:id', component: AvocatDetailsComponent},
  {path: 'createlitige', component: CreateLitigeComponent},
  {path :'delete/:id',component: ListAvocatsComponent},
  {path: 'listlitige', component: ListLitigeComponent},
  {path: 'createav', component: CreateAvocatComponent},
  {path: 'editcat/:id', component: EditCategoriesComponent},
  {path: 'editavocat/:id', component:EditAvocatComponent},
  {path: 'createloi', component: CreateLoiComponent},
  {path :'delete/:id',component: ListAvocatsComponent},
  {path :'deleteca/:id',component: ListCategoriesComponent},
  {path: 'update/:id', component:ListAvocatsComponent},
  {path: 'listca', component: ListCategoriesComponent},
  {path: 'createcat', component: CreateCategoriesComponent},
  {path: 'listloi', component: ListLoisComponent},
  {path :'deleteloi/:id',component: ListLoisComponent},
  {path :'litigedetails/:id',component: LitigeDetailsComponent},
  {path :'avocatdetails/:id',component: AvocatDetailsComponent},
  {path: 'listloi/:id', component: ListLoisComponent},
  {path: 'updateloi/:id', component: UpdateloiComponent},
  {path: 'updatelitige/:id', component: EditLitigeComponent},
  {path: 'emailsend/', component: EmailSendComponent},
  {path: 'grid', component: ListcategorieGrilleComponent},
  {path: 'relances', component: ListRelancesComponent},
  {path: 'createrelance', component: CreateRelanceComponent},
  {path: 'detailsrelance/:id', component: DetailsRelanceComponent},
  {path: 'table', component: ListcategorieTableComponent},
  {path: 'chart', component: RapportChartComponent},
  {path: 'mail', component: MailComponent},
  {path: 'promise', component: PromiseComponent},
  {path: 'call', component: CallComponent},
  {path: 'comment', component: CommentComponent},
  {path: 'cloture', component: DateClotureComponent},
  {path: 'newdate', component: DateSuivantComponent},
  {path: 'rapport', component: RecouvrementRapportComponent},
  {path: 'algorithme', component: AlgorithmeComponent},
  {path: 'judiciaire/:id', component: ProcessComponent},
  {path: 'calender', component: CalenderRelanceComponent},
  {path: 'room', component: MeetComponent},
  {path: 'meeting', component: SpecialiteComponent},
  {path: 'img', component: ImgComponent},
  {path: 'statistique', component: DashbordComponent},
  {path: 'archiverd', component: ArchivedAvocatComponent},






  

  















];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LitigeRecouvrementRoutingModule { }
