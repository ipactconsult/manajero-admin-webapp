import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from "@angular/core";
import { ProjectCharterDocument } from "../../../../models/document/ProjectCharterDocument";
import { ProjectCharter } from "../../../../models/ProjectCharter";
import { ProjectCharterService } from "../../../../services/project-charter/project-charter.service";
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService,
} from "@nebular/theme";
import { removeElementFromArray } from "../../../../utils/reutilizable-function";
@Component({
  selector: "ngx-delivery-units-table",
  templateUrl: "./delivery-units-table.component.html",
  styleUrls: ["./delivery-units-table.component.scss"],
})
export class DeliveryUnitsTableComponent implements OnInit {
  @Input() data: ProjectCharter = null;
  @Output() dataChanged = new EventEmitter<ProjectCharterDocument[]>();

  flippedState: boolean = false;
  dataTabel: ProjectCharterDocument[] = [];
  selectedItem = null;
  refDialog = null;
  constructor(
    private projectCharterService: ProjectCharterService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
  ) {}

  //toster config
  config: NbToastrConfig;

  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : "";

    this.index += 1;
    this.toastrService.show(body, `Toast ${this.index}${titleContent}`, config);
  }
  //
  ngOnInit(): void {
    this.dataTabel = this.data?.deliveryUnits;
  }
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
      name: {
        title: "Delivery unit",
        type: "string",
      },
      description: {
        title: "Description/Comment",
        type: "string",
      },
    },
  };
  confirmation(event, dialog: TemplateRef<any>) {
    this.selectedItem = event;
    this.refDialog = this.dialogService.open(dialog, {
      context: "Are you sure to delete this item ?",
    });
  }
  onDeleteConfirm(event): void {
    this.data.deliveryUnits = removeElementFromArray(
      this.dataTabel,
      event.data.id
    );
    this.projectCharterService.updateProjectCharter(this.data).subscribe({
      next: (result: any) => {
        this.data = result;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.showToast("success", "Success", "Deleted successfully!");
        this.dataTabel = [];
        this.dataTabel = this.data.deliveryUnits;
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
  refresh(event: ProjectCharter): void {
    this.dataTabel = [...event.deliveryUnits];
    this.data = event;
    this.dataChanged.emit(event.deliveryUnits);
  }
  flip(): void {
    this.flippedState = !this.flippedState;
  }
}
