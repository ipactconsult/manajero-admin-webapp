import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Auth } from "../../model/Auth";


import { AuthService } from "../../service/auth.service";
import { TokenStorageService } from "../../service/token/token.service";
import {NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from "@nebular/theme";
@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  userRole;
  loginData;
  positions = NbGlobalPhysicalPosition;
  btnDis = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private toastrService: NbToastrService
  ) {}

  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  ngOnInit(): void {
    const formcontrols = {
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    };
    this.loginform = this.fb.group(formcontrols);
  }

  get email() {
    return this.loginform.get("email");
  }
  get password() {
    return this.loginform.get("password");
  }

  login() {
    this.btnDis = true;
    setTimeout(() => {
      this.loginData = {
        email: this.loginform.get("email").value,
        password: this.loginform.get("password").value
      };
      this.authService.login(this.loginData).subscribe(
        user => {
          this.tokenStorageService.saveToken(user.token);
          this.tokenStorageService.saveUser({
            email: user.email,
            username: user.username,
            company: user.company,
            matriculate: user.matriculate,
            role: user.roles[0],
            id: user.id
          });
          this.userRole = user.roles[0];
          if (this.userRole === 'ROLE_HR_MANAGER') {
            this.showToast('Logged In' , this.positions.TOP_RIGHT, 'success');
            this.router.navigate(['/hr/organigram/view']).then(() => {
              window.location.reload();
            });
          }
          if (this.userRole === 'ROLE_PROJECT_MANAGER') {
            this.showToast('Logged In' , this.positions.TOP_RIGHT, 'success');
            this.router.navigate(['/projectManagement/process']).then(() => {
              window.location.reload();
            });
          }
          if (this.userRole === 'ROLE_CRM_MANAGER') {
            this.showToast('Logged In' , this.positions.TOP_RIGHT, 'success');
            this.router.navigate(['/crm/prospects']).then(() => {
              window.location.reload();
            });
          }
          if (this.userRole === 'ROLE_CMKG_MANAGER') {
            this.showToast('Logged In' , this.positions.TOP_RIGHT, 'success');
            this.router.navigate(['/communicationMarketing/personaStat']).then(() => {
              window.location.reload();
            });
          }
          if (this.userRole === 'ROLE_FIN_MANAGER') {
            this.showToast('Logged In' , this.positions.TOP_RIGHT, 'success');
            this.router.navigate(['/finance/financeInsights']).then(() => {
              window.location.reload();
            });
          }
          if (this.userRole === 'ROLE_ACC_MANAGER') {
            this.showToast('Logged In' , this.positions.TOP_RIGHT, 'success');
            this.router.navigate(['/accounting/insights']).then(() => {
              window.location.reload();
            });
          }
          if (this.userRole === 'ROLE_PIM_MANAGER') {
            this.showToast('Logged In' , this.positions.TOP_RIGHT, 'success');
            this.router.navigate(['/pim/dashboard']).then(() => {
              window.location.reload();
            });
          }
          if (this.userRole === 'ROLE_RL_MANAGER') {
            this.showToast('Logged In' , this.positions.TOP_RIGHT, 'success');
            this.router.navigate(['/litige/statistique']).then(() => {
              window.location.reload();
            });
          }
          if (this.userRole === 'ROLE_ADMIN') {
            this.showToast('Logged In' , this.positions.TOP_RIGHT, 'success');
            this.router.navigate(['/administration/rentalRequest']).then(() => {
              window.location.reload();
            });
          }
        }, error => {
          this.showToast("Invalid Credentials" , this.positions.TOP_RIGHT, 'danger');
          this.btnDis = false;
        }
      );
    }, 3000);
  }

}