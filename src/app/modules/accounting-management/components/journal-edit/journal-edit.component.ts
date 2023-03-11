import { Component, OnInit } from '@angular/core';
import {JournalService} from "../../services/journal/journal.service";
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbWindowService
} from '@nebular/theme';
import {Journal} from "../../models/journal.model";

@Component({
  selector: 'ngx-journal-edit',
  templateUrl: './journal-edit.component.html',
  styleUrls: ['./journal-edit.component.scss']
})
export class JournalEditComponent implements OnInit {

  journalForm!: FormGroup;
  journalToAdd;

  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;

  idUri: string = '';
  namee: string ;
  codee: string ;
  journal: Journal;

  constructor(private activatedroute: ActivatedRoute, 
              private router: Router,
              private js: JournalService,
              private formbuilder: FormBuilder,
              private toastrService: NbToastrService,
              private windowService: NbWindowService) {
    this.journalForm = formbuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required]
    })
  }


  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');

    });

    this.js.getJournalId(this.idUri).subscribe(result =>{
      this.codee = result.code;
      this.namee = result.name;
      this.journal = result;
    });
  }
  
  
  submit() {
    this.journalToAdd = {
      id: this.idUri,
      name: this.journalForm.value.name,
      code: this.journalForm.value.code
    }
    this.js.addJournal(this.journalToAdd).subscribe(result => {

        this.showToast('success', 'Add ! ', 'New journal edited !!');
        this.router.navigateByUrl('/accounting/journallist').then(() => {
          this.router.navigate(['/accounting/journallist']);
        });

      },
      (err) => {
        this.showToast('danger', 'Edit ! ', err.error.message);

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
