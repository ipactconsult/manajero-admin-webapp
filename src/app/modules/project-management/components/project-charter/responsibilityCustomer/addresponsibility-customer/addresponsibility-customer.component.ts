import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ProjectCharter } from "../../../../models/ProjectCharter";
import { ResponsibilityCustomer } from "../../../../models/ResponsibilityCustomer";
import { ProjectCharterService } from "../../../../services/project-charter/project-charter.service";
import { UpdateItem } from "../../../../utils/reutilizable-function";
@Component({
  selector: "ngx-addresponsibility-customer",
  templateUrl: "./addresponsibility-customer.component.html",
  styleUrls: ["./addresponsibility-customer.component.scss"],
})
export class AddresponsibilityCustomerComponent implements OnInit {
  createResponsibiltyCustomerForm: FormGroup;
  @Output() refreshData = new EventEmitter<ResponsibilityCustomer[]>();
  @Input() projectCharter: ProjectCharter = null;
  @Input() selectedItem = null;
  constructor(
    private fb: FormBuilder,
    private projectCharterService: ProjectCharterService
  ) {}

  ngOnInit(): void {
    const formcontrols = {
      item: new FormControl(this.selectedItem?.item, [Validators.required]),
      responsibilityCategory: new FormControl(
        this.selectedItem?.responsibilityCategory,
        [Validators.required]
      ),
      comment: new FormControl(this.selectedItem?.comment, [
        Validators.required,
      ]),
      contact: new FormGroup({
        phone: new FormControl(this.selectedItem?.contact?.phone),
        email: new FormControl(this.selectedItem?.contact?.email),
        address: new FormControl(this.selectedItem?.contact?.address),
      }),
    };
    this.createResponsibiltyCustomerForm = this.fb.group(formcontrols);
  }
  get item() {
    return this.createResponsibiltyCustomerForm.get("item");
  }
  get responsibilityCategory() {
    return this.createResponsibiltyCustomerForm.get("responsibilityCategory");
  }
  get comment() {
    return this.createResponsibiltyCustomerForm.get("comment");
  }
  create() {
    const data = this.createResponsibiltyCustomerForm.value;

    const responsibiltyCustomer = this.projectCharter?.responsibilityCustomer;

    responsibiltyCustomer === null &&
      (this.projectCharter.responsibilityCustomer = []);
    let itemsUpdated = null;

    this.selectedItem !== null
      ? ((itemsUpdated = UpdateItem(
          data,
          responsibiltyCustomer,
          this.selectedItem
        )),
        (this.projectCharter.responsibilityCustomer = itemsUpdated))
        : this.projectCharter.responsibilityCustomer.push(data);

    this.projectCharterService
      .updateProjectCharter(this.projectCharter)
      .subscribe({
        next: (result: any) => {
          this.refreshData.emit(result.responsibilityCustomer);
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.createResponsibiltyCustomerForm.reset();
        },
      });
  }
}
