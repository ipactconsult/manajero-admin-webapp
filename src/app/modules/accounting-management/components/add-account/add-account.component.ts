import { Component, OnInit } from '@angular/core';
import {Account} from "../../models/account.model";
import {Router} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  NbComponentStatus, 
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbWindowService
} from '@nebular/theme';
import {AccountsService} from "../../services/accounts/accounts.service";

@Component({
  selector: 'ngx-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {
  
  accountForm!: FormGroup;
  accountToAdd: Account;
  
  index = 1;
  destroyByClick = true;
  duration = 5000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;

  constructor(private router: Router, private as: AccountsService,private formbuilder: FormBuilder,
              private toastrService: NbToastrService, 
              private windowService: NbWindowService) {
     this.accountForm = formbuilder.group({
          name: ['', Validators.required],
          code: ['', Validators.required]
        })
  }

  ngOnInit(): void {
    this.accountForm = new FormGroup({
      name: new FormControl(''), 
      code: new FormControl('')
});
  }
  submit() {
    this.accountToAdd = {
      name: this.accountForm.value.name,
      code: this.accountForm.value.code
    }
    this.as.addAccount(this.accountToAdd).subscribe(result => {

    this.showToast('success', 'Add ! ', 'New account Added !!');
         this.router.navigateByUrl('/accounting/accountlist').then(() => {
           this.router.navigate(['/accounting/accountlist']);
        },
           (err) => {
      this.showToast('danger', 'Error in add ! ', err.error.message);

    },
           );
    
  },
    (err) => {
      this.showToast('danger', 'error ! ', err.error.message);

    },
  );
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
