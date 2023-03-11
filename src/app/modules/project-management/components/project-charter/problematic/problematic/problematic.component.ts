import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
  TemplateRef,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService,
  
} from "@nebular/theme";
import { ProjectCharter } from "../../../../models/ProjectCharter";
import { ProjectCharterService } from "../../../../services/project-charter/project-charter.service";

@Component({
  selector: "ngx-problematic",
  templateUrl: "./problematic.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./problematic.component.scss"],
})
export class ProblematicComponent implements OnInit,OnChanges {
  @Input() problematic = null;
  @Output() refreshData = new EventEmitter<ProjectCharter>();
  flippedState: boolean = false;
  selectedItem=null;
  refDialog=null;
  constructor(
    private projectCharterService: ProjectCharterService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService

  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.problematic=changes.problematic.currentValue;
  }
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
  ngOnInit(): void {}
  confirmation(dialog: TemplateRef<any>) {
    this.refDialog= this.dialogService.open(
      dialog,
      { context: 'Are you sure to delete this item ?' });
  }
  storageEventListener(event: StorageEvent) {
    console.log(event);
  }

  flip(): void {
    this.flippedState = !this.flippedState;
  }
  delete(): void {
      this.problematic.problematic = null;
      this.projectCharterService
        .updateProjectCharter(this.problematic)
        .subscribe((ch) => {
          this.showToast(
            "success",
            "Failed",
            "creation project charter failed!"
          );

         this.refreshData.emit(ch);
          this.selectedItem=null;
          this.refDialog.close();
        });
    
  }
  refresh(event: ProjectCharter) {
    this.flippedState = !this.flippedState;
    this.problematic = event;
  }
  updateProblematic() {
    this.selectedItem=this.problematic.problematic;
    this.flip();
  }
}
