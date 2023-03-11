import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService
} from '@nebular/theme';

@Component({
  selector: 'ngx-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

 forgetPWDForm: FormGroup;
  config: NbToastrConfig;
  current: number = 1;
  search: string = '';
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';
  positions = NbGlobalPhysicalPosition;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,     private toastrService: NbToastrService

  ) {}
  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }

  ngOnInit(): void {
    const formcontrols = {
      email: new FormControl("", [Validators.required]),
    };
    this.forgetPWDForm = this.fb.group(formcontrols);
  }
  get email() {
    return this.forgetPWDForm.get("email");
  }
  
  forgetPWD() {
    const data = this.forgetPWDForm.value;
    this.authService.forgetPWD(data).subscribe({
      next: () => {
        this.showToast('Please Verify your e-mail, to reset your password!!' , this.positions.TOP_RIGHT, 'success');
        this.router.navigate(['/reset-pwd']);
      },
    });
  }
  cancelForget(){
    this.router.navigate(['/auth/login']);
   }
}
