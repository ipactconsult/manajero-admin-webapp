import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { NbToastrService } from "@nebular/theme";
import { ProjectCharterDocument } from "../../../../models/document/ProjectCharterDocument";
import { ProjectCharter } from "../../../../models/ProjectCharter";
import { AreService } from "../../../../services/are/are.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ProjectCharterService } from "../../../../services/project-charter/project-charter.service";
import { Are } from "../../../../models/Are";
import { AreCategory } from "../../../../models/enum/AreCategory";
import { UpdateItem } from "../../../../utils/reutilizable-function";
@Component({
  selector: "ngx-add-are",
  templateUrl: "./add-are.component.html",
  styleUrls: ["./add-are.component.scss"],
})
export class AddAreComponent implements OnChanges {
  createAreForm: FormGroup;
  catgeoryType: AreCategory;
  @Input() projectCharter: ProjectCharter = null;
  @Output() refreshData = new EventEmitter<Are[]>();
  @Input() selectedItem = null;
  newAre: Are = null;
  constructor(
    private fb: FormBuilder,
    private projectCharterService: ProjectCharterService
  ) {
    const formcontrols = {
      item: new FormControl("", [Validators.required]),
      category: new FormControl("", [Validators.required]),
    };
    this.createAreForm = this.fb.group(formcontrols);
  }
  ngOnChanges(changes: SimpleChanges): void {
    changes?.selectedItem?.currentValue &&
    changes.selectedItem !== undefined &&
    changes.selectedItem.currentValue.data === undefined
      ? ((this.selectedItem = changes?.selectedItem?.currentValue),
        this.initializeForm(
          this?.selectedItem.item,
          this?.selectedItem.category
        ))
      : this.initializeForm("", "");
  }
  initializeForm(item: string, category: string) {
    this.createAreForm.setValue({
      item: item,
      category: category,
    });
  }

  get item() {
    return this.createAreForm.get("item");
  }
  get category() {
    return this.createAreForm.get("category");
  }
  create() {
    const data = this.createAreForm.value;
    const are = this.projectCharter?.are;
    are === null && (this.projectCharter.are = []);
    let itemsUpdated = null;
    this.selectedItem !== null
      ? ((itemsUpdated = UpdateItem(data, are, this.selectedItem)),
        (this.projectCharter.are = itemsUpdated))
      : this.projectCharter.are.push(data);

    this.projectCharterService
      .updateProjectCharter(this.projectCharter)
      .subscribe({
        next: (result: any) => {
          this.refreshData.emit(result);
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.createAreForm.reset();
        },
      });
  }
}
