import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AngularFireStorage } from "@angular/fire/storage";
import { NbDialogService } from "@nebular/theme";
import { StatusRequest } from "../../../models/enum/StatusRequest";
import { ProjectCharter } from "../../../models/ProjectCharter";
import { ProjectCharterService } from "../../../services/project-charter/project-charter.service";
@Component({
  selector: "ngx-upload-file",
  templateUrl: "./upload-file.component.html",
  styleUrls: ["./upload-file.component.scss"],
})
export class UploadFileComponent implements OnInit {
  @Input() data: ProjectCharter;

  uploadEnabled: boolean = false;
  loader: boolean = false;
  filePath: String = "";
  fileName: String = "";
  refDialog = null;
  refDialogAlertInfo = null;

  constructor(
    private afStorage: AngularFireStorage,
    private projectCharterService: ProjectCharterService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {}
  confirmation(dialog: TemplateRef<any>) {
    this.refDialog = this.dialogService.open(dialog, {
      context: "Are you sure to delete this item ?",
    });
  }
  alertInfo(dialog: TemplateRef<any>) {
    this.refDialogAlertInfo = this.dialogService.open(dialog, {
      context: "Please select a file !",
    });
  }
  enableUpload() {
    this.uploadEnabled = true;
  }
  upload(event: any) {
    this.filePath = event.target.files[0];
    this.fileName = event.target.files[0].name;
  }
  uploadImage(dialog: TemplateRef<any>) {
    if (this.fileName === "") {
      this.alertInfo(dialog);
    } else {
      const fileUniqueName = `/${this.fileName}${Math.random()}${
        this.filePath
      }`;
      const datatfile = this.data.file;
      this.loader = true;

      this.afStorage.upload(fileUniqueName, this.filePath).then(() => {
        datatfile !== null
          ? this.data.file.push(fileUniqueName)
          : ((this.data.file = []), this.data.file.push(fileUniqueName));
        this.projectCharterService
          .updateProjectCharter(this.data)
          .subscribe((ch) => {
            this.uploadEnabled = false;
            this.loader = false;
            this.fileName=""
          });
      });
    }
  }

  onTagRemove(event) {
    this.data.file = this.data.file.filter(function (element) {
      return element != event;
    });
    this.afStorage;
    this.projectCharterService
      .updateProjectCharter(this.data)
      .subscribe((ch) => {
        this.refDialog.close();
      });
  }
}
