import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FinanceManagementRoutingModule} from './finance-management-routing.module';
import {CreateRequestComponent} from './components/Requests/create-request/create-request.component';
import {RequestsHistoryComponent} from './components/Requests/requests-history/requests-history.component';
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbSelectModule} from "@nebular/theme";
import {NbEvaIconsModule} from "@nebular/eva-icons";


@NgModule({
  declarations: [
    CreateRequestComponent,
    RequestsHistoryComponent
  ],
  imports: [
    CommonModule,
    FinanceManagementRoutingModule,
    NbCardModule,
    
    NbButtonModule,
    NbInputModule,
    NbIconModule,
    NbEvaIconsModule,
    NbSelectModule,
    
    
  ]
})
export class FinanceManagementModule {
}
