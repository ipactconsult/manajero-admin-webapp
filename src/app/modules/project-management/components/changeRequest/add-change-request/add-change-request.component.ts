import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TokenStorageService } from "../../../../auth/service/token/token.service";
import { ChangeRequest } from "../../../models/ChangeRequest";
import { ChangeRequestService } from "../../../services/changeRequest/change-request.service";
@Component({
  selector: "ngx-add-change-request",
  templateUrl: "./add-change-request.component.html",
  styleUrls: ["./add-change-request.component.scss"],
})
export class AddChangeRequestComponent implements OnInit {
  changeRquestForm: FormGroup;
  @Output() dataChanged = new EventEmitter<ChangeRequest>();
  @Input() selectedItem: ChangeRequest = null;
  projectId: string;
  request: ChangeRequest = null;
  constructor(
    private fb: FormBuilder,
    private changeRequestService: ChangeRequestService,
    private route: ActivatedRoute,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    
    this.route.paramMap.subscribe((params) => {
      this.projectId = params.get("id");
    });

    const formcontrols = {
      changeType: new FormControl(this?.selectedItem?.changeType),
      description: new FormControl(this?.selectedItem?.description, [
        Validators.required,
      ]),
    };
    this.changeRquestForm = this.fb.group(formcontrols);
  }
  get changeType() {
    return this.changeRquestForm.get("changeType");
  }
  get description() {
    return this.changeRquestForm.get("description");
  }

  save() {
    const data = this.changeRquestForm.value;
    const currentUser = this.tokenStorageService.getUser();
    data.project = { id: this.projectId };
    data.requestor = currentUser;

    this.changeRequestService.addChangeRequest(data).subscribe({
      next: (request: ChangeRequest) => {
        this.request = request;
        
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.dataChanged.emit(this.request);
      },
    });
  }
  update() {
    const data = this.changeRquestForm.value;

    data.project = { id: this.projectId };
    this.changeRequestService.updateChangeRequest(data).subscribe({
      next: (request: ChangeRequest) => {
        this.request = request;
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
