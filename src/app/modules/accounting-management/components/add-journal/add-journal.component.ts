import { Component, OnInit } from '@angular/core';
import {JournalService} from "../../services/journal/journal.service";
import {Router} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  NbComponentStatus, 
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbWindowService
} from '@nebular/theme';


@Component({
  selector: 'ngx-add-journal',
  templateUrl: './add-journal.component.html',
  styleUrls: ['./add-journal.component.scss']
})
export class AddJournalComponent implements OnInit {
  journalForm!: FormGroup;
  journalToAdd;
  
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;

  constructor(private router: Router, private js: JournalService,private formbuilder: FormBuilder,
              private toastrService: NbToastrService, 
              private windowService: NbWindowService) { 
    this.journalForm = formbuilder.group({
          name: ['', Validators.required],
          code: ['', Validators.required]
        })
  }
  

  ngOnInit(): void {
    this.journalForm = new FormGroup({
      name: new FormControl(''), 
      code: new FormControl('')
});
  }
  submit() {
    this.journalToAdd = {
      name: this.journalForm.value.name,
      code: this.journalForm.value.code
    }
    this.js.addJournal(this.journalToAdd).subscribe(result => {

    this.showToast('success', 'Add ! ', 'New journal Added !!');
         this.router.navigateByUrl('/accounting/journallist').then(() => {
           this.router.navigate(['/accounting/journallist']);
        });
    
  },
    (err) => {
      this.showToast('danger', 'Add ! ', err.error.message);

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
