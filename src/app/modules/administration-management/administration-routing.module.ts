import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RentalRequestTableComponent } from './components/rental-request/rental-request-table/rental-request-table.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

const routes: Routes = [ 
  {
  path: "rentalRequest",
  component: RentalRequestTableComponent,
},

{
  path: "dashboard",
  component: DashboardComponent,
},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
