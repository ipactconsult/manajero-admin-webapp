
import {ExtraOptions, RouterModule, Routes} from "@angular/router";

import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AuthGuard} from './auth-guard/auth.guard';
import {HomePageComponent} from './@theme/components/home-page/home-page.component';
import {ProfileUserComponent} from './modules/profile-user/profile-user.component';
import {ForgetPasswordComponent} from './modules/auth/components/forget-password/forget-password.component';
import {ResetPasswordComponent} from './modules/auth/components/reset-password/reset-password.component';

import { Page404Component } from "./@theme/components/page404/page404.component";



export const routes: Routes = [
  {path: 'finance', loadChildren:()=>import('./modules/financial-management/financial-management.module').
    then(f=>f.FinancialManagementModule),
    canActivate: [AuthGuard]},

  {path: 'accounting', loadChildren:()=>import('./modules/accounting-management/accounting-management.module').
    then(f=>f.AccountingManagementModule),
    canActivate: [AuthGuard]},

  {path: 'profile', component: ProfileUserComponent},

  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module')
      .then(m => m.AuthModule),
  },
    {
    path: 'forget',
   component: ForgetPasswordComponent
  },
      {
    path: 'reset_pwd/:token',
   component: ResetPasswordComponent
  },

  {

    path: "chat",
    loadChildren: () =>
      import('./modules/chat/chat.module').then(
        (m) => m.ChatModule
      ),
    canActivate: [AuthGuard],
  },
  
    {

    path: "projectManagement",
    loadChildren: () =>
      import('./modules/project-management/project-management.module').then(
        (m) => m.ProjectManagementModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: 'crm',
    loadChildren: () =>
      import(
        './modules/customer-relationship-management/customer-relationship-management.module'
        ).then((m) => m.CustomerRelationshipManagementModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'pim',
    loadChildren: () => import('./modules/product-inventory-management/product-inventory-management.module')
      .then(m => m.ProductInventoryManagementModule),
      canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: AppComponent,
  },

  
  {
    path: 'profile',
    component: ProfileUserComponent
  },
  {
    path: 'hr',
    loadChildren: () =>
      import(
        './modules/humain-capital-management/humain-capital-management.module'
        ).then((m) => m.HumainCapitalManagementModule),
    canActivate: [AuthGuard],
  },
   {
    path: 'litige',
    loadChildren: () => import('./modules/litige-recouvrement/litige-recouvrement.module')
    .then(m => m.LitigeRecouvrementModule),
      canActivate: [AuthGuard],
  },
  {

    path: "administration",
    loadChildren: () =>
      import("./modules/administration-management/administration.module").then(
        (m) => m.AdministrationModule
      ),
  },
  {
    path: "",
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },


  {
    path: 'communicationMarketing',

    loadChildren: () => import('./modules/communication-marketing-management/communication-marketing-management.module')
      .then(m => m.CommunicationMarketingManagementModule),
    canActivate: [AuthGuard],

  },

  {

    path: '**',
    pathMatch: 'full',

    component:Page404Component,
  },

];

const config: ExtraOptions = {
  useHash: true,
};

// @ts-ignore
@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
