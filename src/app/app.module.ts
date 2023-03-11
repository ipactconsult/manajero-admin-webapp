// @ts-ignore
import { BrowserModule } from '@angular/platform-browser';
// @ts-ignore
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// @ts-ignore
import { NgModule } from '@angular/core';
// @ts-ignore
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import {
  NbButtonModule,
  NbCardModule,
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbIconModule,
  NbMenuModule,
  NbSelectModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbLayoutModule,
  NbInputModule,
  NbCheckboxModule,
  NbAlertModule,
  NbActionsModule, NbTagModule, NbSpinnerModule,
  NbTreeGridModule,
} from '@nebular/theme';
import {RouterModule} from '@angular/router';
import {CommunicationMarketingManagementRoutingModule} from './modules/communication-marketing-management/communication-marketing-management-routing.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';

import { NbEvaIconsModule } from '@nebular/eva-icons';



import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CustomerRelationshipManagementModule} from './modules/customer-relationship-management/customer-relationship-management.module';


import {AuthInterceptorService} from "./modules/auth/helpers/auth-interceptor.service";
import {LoginComponent} from "./modules/auth/components/login/login.component";
import {ProfileUserComponent} from './modules/profile-user/profile-user.component';


// @ts-ignore
import {AngularFireStorageModule} from '@angular/fire/storage'
// @ts-ignore
import {AngularFireModule} from '@angular/fire';
import {AuthModule} from "./modules/auth/auth.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { environment } from '../environments/environment';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatMenuModule} from '@angular/material/menu';
import {FinanceManagementModule} from "./modules/finance-management/finance-management.module";
import {AccountingManagementModule} from "./modules/accounting-management/accounting-management.module";

//import { TranslateModule } from '@ngx-translate/core';



@NgModule({

  declarations: [AppComponent ,
 
    LoginComponent, ProfileUserComponent],
  imports: [
    //CommonModule,
    NgbModule,
    RouterModule,
    NbCardModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2SmartTableModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),

    FormsModule,
    NbIconModule,
    NbIconModule,
    NbDialogModule,
    NbButtonModule,
    NbInputModule,
    NbSpinnerModule,

    NbCardModule,
    NbSelectModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    NbEvaIconsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    FormsModule,
    NbIconModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),

    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireStorageModule,
    NgxPaginationModule,
    NbSelectModule,
    NbSidebarModule,
    MatMenuModule,
    NgbModule,
    NbSpinnerModule,
    CustomerRelationshipManagementModule,
    NbCardModule,
    NbIconModule,
    NbLayoutModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbAlertModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AuthModule,
    NbActionsModule,
    NbTagModule,
   //ShareButtonsModule,
    AccountingManagementModule,
    //, TranslateModule.forRoot(), 
   // StreamAutocompleteTextareaModule,
    //
   // StreamChatModule

    NbLayoutModule,
    //ShareButtonsModule,
    CommunicationMarketingManagementRoutingModule,
FinanceManagementModule,
    BrowserAnimationsModule,
    NbTreeGridModule,


  ],
  bootstrap: [AppComponent],
  exports: [
    LoginComponent ,

  ]
})
export class AppModule {}
