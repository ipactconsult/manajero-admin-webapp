import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TokenStorageService } from "../../../../auth/service/token/token.service";
import { ChangeRequest } from "../../../models/ChangeRequest";
import { ChangeRequestService } from "../../../services/changeRequest/change-request.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: "ngx-detail-edit-change-request",
  templateUrl: "./detail-edit-change-request.component.html",
  styleUrls: ["./detail-edit-change-request.component.scss"],
})

export class DetailEditChangeRequestComponent implements OnInit {
  changeRquestForm: FormGroup;
  @Output() dataChanged = new EventEmitter<ChangeRequest>();
  @Input() selectedItem: ChangeRequest = null;
  projectId: string;
  request: ChangeRequest = null;
  constructor(
    private fb: FormBuilder,
    private changeRequestService: ChangeRequestService,
    private route: ActivatedRoute,
    private datepipe:DatePipe  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.projectId = params.get("id");
    });

    const formcontrols = {
     
      status: new FormControl(this?.selectedItem?.status),
      comment: new FormControl(this?.selectedItem?.comment),
    };
    this.changeRquestForm = this.fb.group(formcontrols);
  }

  get status() {
    return this.changeRquestForm.get("status");
  }

  get comment() {
    return this.changeRquestForm.get("comment");
  }
  update() {
    const data = this.changeRquestForm.value;
    
    this.selectedItem.status=data.status;
    this.selectedItem.comment=data.comment;

    this.changeRequestService.updateChangeRequest(this.selectedItem).subscribe({
      next: (request: ChangeRequest) => {
        this.request = request;
        console.log(request);
        
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.dataChanged.emit(this.request);
      },
    });
  }
}
