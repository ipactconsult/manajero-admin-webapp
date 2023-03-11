import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TokenStorageService } from "../../../modules/auth/service/token/token.service";

@Component({
  selector: "ngx-page404",
  templateUrl: "./page404.component.html",
  styleUrls: ["./page404.component.scss"],
})
export class Page404Component implements OnInit {
  loggedIn: string = null;

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.loggedIn = this.tokenStorageService.getToken();
  }
  goToHome() {
    if (this.loggedIn === null) {
      this.router.navigate(["/auth/login"]);
    } else {
      this.router.navigate(["/"]);
    }
  }
}
