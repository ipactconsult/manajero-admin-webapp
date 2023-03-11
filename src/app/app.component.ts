/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NbMenuService } from "@nebular/theme";
import { AnalyticsService } from "./@core/utils";
import { SeoService } from "./@core/utils";
import { MENU_ITEMS } from "./@theme/components/menu/pages-menu";
import { TokenStorageService } from "./modules/auth/service/token/token.service";

import {accessControlProjectManagement} from "./modules/auth/accessControle/accessControle"
import {AuthService} from "./modules/auth/service/auth.service";
@Component({
  selector: "ngx-app",
  template: `
    <ngx-one-column-layout *ngIf="loggedIn; else notLoggedIn">
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet> </router-outlet>
    </ngx-one-column-layout>
    <ng-template #notLoggedIn>
      <nb-layout>
        <nb-layout-column class="colored-column-basic">
          <router-outlet> </router-outlet>
        </nb-layout-column>
        <nb-layout-footer>Created with ♥ by IPACT Consult inc. 2022</nb-layout-footer

        >
      </nb-layout>
    </ng-template>
  `,
})
export class AppComponent implements OnInit {
  menu = MENU_ITEMS;
  userConnected = JSON.parse(sessionStorage.getItem('auth-user'));
  getToken;
  loggedIn: string = null;
  constructor(
    private analytics: AnalyticsService,
    private seoService: SeoService,
    private tokenStorageService: TokenStorageService,
    private menuService: NbMenuService,
    private router: Router,
    private authService: AuthService
  ) {
    this.loggedIn = tokenStorageService.getToken();
  }
  EventUserMenu = this.menuService.onItemClick().subscribe((event) => {
    this.onContecxtItemSelection(event.item.title);
  });

  onContecxtItemSelection(title) {
    title === "Log out" &&
      (
        this.router.navigateByUrl('/auth/login').then(() => {
          window.location.reload();
        }) &&
        this.authService.logout(this.userConnected.email).subscribe(
          () => {
            
          }, error => {
            console.log(error);
          }
        )
      
            ) && (
      this.tokenStorageService.signOut()
    );
    title === "Profile" &&
      (
      this.router.navigateByUrl('/profile').then(() => {
        
      })
      
            );


  }
  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();

    const currentUser = this.tokenStorageService.getUser();
    if (this.userConnected) {
      this.menu=accessControlProjectManagement(currentUser,this.menu);
    }
  }

 
}

