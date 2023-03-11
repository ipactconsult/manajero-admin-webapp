import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from "@angular/core";
import { NbDialogService } from "@nebular/theme";
import { Budget } from "../../../../models/document/Budget";
import { ProjectCharter } from "../../../../models/ProjectCharter";
import { ProjectCharterService } from "../../../../services/project-charter/project-charter.service";

@Component({
  selector: "ngx-budget-table",
  templateUrl: "./budget-table.component.html",
  styleUrls: ["./budget-table.component.scss"],
})
export class BudgetTableComponent implements OnInit {
  @Input() data: ProjectCharter = null;
  @Output() dataChanged = new EventEmitter<Budget[]>();
  selectedItem = null;
  refDialog = null;
  flippedState: boolean = false;
  dataTabel: Budget[] = [];
  settings = {
    mode: "external",
    actions: { edit: false },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      confirm: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      area: {
        title: "Area",
        type: "string",
      },
      amount: {
        title: "Amount",
        type: "string",
      },
    },
  };
  constructor(
    private projectCharterService: ProjectCharterService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.dataTabel = this.data?.budget;
  }
  confirmation(event, dialog: TemplateRef<any>) {
    this.selectedItem = event;
    this.refDialog = this.dialogService.open(dialog, {
      context: "Are you sure to delete this item ?",
    });
  }
  onDeleteConfirm(event): void {
    let newData: Budget[];

    newData = this.data.budget.filter((item) => item.area != event.data.area);

    this.data.budget = newData;
    this.projectCharterService.updateProjectCharter(this.data).subscribe({
      next: () => {
        this.dataTabel = newData;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.dataChanged.emit(this.dataTabel);

        this.refDialog.close();
      },
    });
  }
  onCreate(): void {
    this.selectedItem = null;    
    this.flip();
  }

  onUserRowSelect(event): void {
    this.selectedItem = event.data;    
    this.flip();
  }

  refresh(event: any): void {
    this.dataTabel = [...this.data.budget];
    this.data.budget = this.dataTabel;    
    this.dataChanged.emit(event.budget);
  }
  flip(): void {
    this.flippedState = !this.flippedState;
  }
  flipBack() {
    this.flip();
    this.selectedItem = null;
  }
}
