import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Budget } from "../../../../models/Budget";
import { BudgetService } from "../../../../services/budget/budget.service";

@Component({
  selector: "ngx-budget-form",
  templateUrl: "./budget-form.component.html",
  styleUrls: ["./budget-form.component.scss"],
})
export class BudgetFormComponent implements OnInit {
  budgetForm: FormGroup;
  @Output() refreshData = new EventEmitter<Budget>();
  @Input() selectedItem: Budget = null;
  filePath: String = "";
  fileName: String = "";
  fileAdded: String = "";
  refDialog = null;
  loader: boolean = false;
  id: String = "";
  constructor(
    private route: ActivatedRoute,
    private afStorage: AngularFireStorage,
    private fb: FormBuilder,
    private budgetService: BudgetService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get("id");
    })
    this.fileAdded = this.selectedItem?.motif;
    const formcontrols = {
      title: new FormControl(this.selectedItem?.title, [Validators.required]),
      amount: new FormControl(this.selectedItem?.amount, [Validators.required]),
      notes: new FormControl(this.selectedItem?.notes, [Validators.required]),
    };
    this.budgetForm = this.fb.group(formcontrols);
  }
  upload(event: any) {
    this.filePath = event.target.files[0];
    this.fileName = event.target.files[0].name;
  }
  uploadImage() {
    const fileUniqueName = `/${this.fileName}${Math.random()}${this.filePath}`;
    this.loader = true;
    this.afStorage.upload(fileUniqueName, this.filePath).then(() => {
      this.fileAdded = fileUniqueName;
      this.loader = false;
    });
  }
  save() {
    const data = this.budgetForm.value;
    data.motif = this.fileAdded;
    data.project = this.id;

    this.budgetService.add(data).subscribe({
      next: (result) => {
        this.refreshData.emit(result)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  update() {
    const data = this.budgetForm.value;
    data.motif = this.fileAdded;
    data.id = this.selectedItem.id;
    data.project = this.id;

    this.budgetService.update(data).subscribe({
      next: (result) => {
        this.refreshData.emit(result)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
