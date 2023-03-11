import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateRequestComponent} from "./components/Requests/create-request/create-request.component";

const routes: Routes = [{
  path: 'create-request', component: CreateRequestComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceManagementRoutingModule { }
