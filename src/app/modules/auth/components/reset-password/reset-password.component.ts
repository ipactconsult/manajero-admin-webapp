import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService
} from '@nebular/theme';
import {AuthService} from '../../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  formResetPWD: FormGroup;
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
  token: string;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router, private toastrService: NbToastrService,
    private route: ActivatedRoute,
  ) {
  }

  get password() {
    return this.formResetPWD.get('password');
  }

  ngOnInit(): void {
    const formcontrols = {
      password: new FormControl('', [Validators.required]),
    };
    this.formResetPWD = this.fb.group(formcontrols);
    this.route.params.subscribe((params) => {
      this.token = params['token'];
    });
    console.log(this.token)
  }

  resetPWD() {
    const data = this.formResetPWD.value;
    this.authService.resetPWD(data, this.token).subscribe({
      next: () => {
        this.showToast('success', 'Updated Successfully',
          'Password Updated Successfully !!');
        this.router.navigate(['/auth/login']);
      },
    });
  }
 cancelReset(){
  this.router.navigate(['/auth/login']);
 }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? ` ${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }
}
