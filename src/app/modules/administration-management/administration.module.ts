import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { RentalRequestTableComponent } from './components/rental-request/rental-request-table/rental-request-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {NbAlertModule, NbCardModule, NbIconModule, NbSelectModule, NbTagModule} from '@nebular/theme';
import { RentalRequestDetailsComponent } from './components/rental-request/rental-request-details/rental-request-details.component';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {NgxEchartsModule} from "ngx-echarts";
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    RentalRequestTableComponent,
    RentalRequestDetailsComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbIconModule,
    NbEvaIconsModule,
      NbTagModule,
    NbAlertModule,
    NbSelectModule,
    NgxEchartsModule


    ]
})
export class AdministrationModule { }
