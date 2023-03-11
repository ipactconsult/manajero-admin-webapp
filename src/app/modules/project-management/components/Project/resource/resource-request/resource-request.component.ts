import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ResourceService } from "../../../../services/resource/resource.service";

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ResourceRequest } from "../../../../models/ResourceRequest";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "ngx-resource-request",
  templateUrl: "./resource-request.component.html",
  styleUrls: ["./resource-request.component.scss"],
})
export class ResourceRequestComponent implements OnInit {
  resourceRequestForm: FormGroup;
  @Output() refreshData = new EventEmitter<ResourceRequest>();
  id: string;
  @Input() selectedItem = null;
  constructor(
    private resourceService: ResourceService,
    private route: ActivatedRoute,

    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      this.id = params.get("id");
    });
    let date = null;
    if (
      this?.selectedItem?.preferredDate != undefined &&
      this?.selectedItem?.preferredDate !== null
    ) {
      date = new Date(this?.selectedItem?.preferredDate);
    } else {
      date = "";
    }
    console.log(date);

    const formcontrols = {
      resourceName: new FormControl(this?.selectedItem?.resourceName, [
        Validators.required,
      ]),
      description: new FormControl(this?.selectedItem?.description, [
        Validators.required,
      ]),
      importance: new FormControl(this?.selectedItem?.importance, [
        Validators.required,
      ]),
      preferredDate: new FormControl(date, [Validators.required]),
    };
    this.resourceRequestForm = this.fb.group(formcontrols);
  }
  save() {
    const data = this.resourceRequestForm.value;
    console.log("save");
    
    data.project = this.id;
    this.resourceService.sendRequest(data).subscribe({
      next: (result) => {
        console.log(result);
        
        this.refreshData.emit(result);
      },
      error: (err) => {
        console.error(err);
      },
      complete:()=> {
this.resourceRequestForm.reset();
      }
    });
  }
  update() {
    console.log("test");
    
    const data = this.resourceRequestForm.value;
    data.id=this.selectedItem.id
    data.project = this.id;
    this.resourceService.update(data).subscribe({
      next: (result) => {

        this.refreshData.emit(result);
      },
      error: (err) => {
        console.error(err);
      },
      complete:()=> {
this.resourceRequestForm.reset();
      }
    }); 
  }
}
