import { Component, OnInit } from '@angular/core';
import {LevelService} from "../../../services/levelServices/level.service";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService
} from "@nebular/theme";
import {Level} from "../../../models/Level";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Department} from "../../../models/Department";
import {DepartmentService} from "../../../services/departmentservices/department.service";
import { Router } from '@angular/router';
import { SubDepartmentService } from '../../../services/departmentservices/subDepartmentService/sub-department.service';
import { SubDepartment } from '../../../models/SubDepartment';

@Component({
  selector: 'ngx-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit {

  config : NbToastrConfig;
  title = 'Create Level';
  content = 'Operation achieved';
  duration = 2000;
  status : NbComponentStatus = 'primary';
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;

  lvl : Level = new Level();
  listLvls : Level []= [];
  levelForm : FormGroup;
  listDepartment : Department [] = [];
  listSub : SubDepartment []=[];

  selectedItem: string="" ;

  constructor(private router:Router,private sds: SubDepartmentService, private ds: DepartmentService, private toastrService :NbToastrService, private ls : LevelService, private _builder : FormBuilder) { 
    this.levelForm = this._builder.group({
      levelReference : ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.getDepartments();
    this.getLvls();
    this.getSubDepts();
  }

  getDepartments() {
    this.ds.findAllDepts().subscribe(
      (data: Department[]) => { this.listDepartment = data;  } , (err) => {
        console.log(err);
      },
    );
  }

  getSubDepts() {
    this.sds.findAll().subscribe(
      (data: SubDepartment[]) => { this.listSub = data;  } , (err) => {
        console.log(err);
      },
    );
  }

  getLvls() {
    this.ls.findAll().subscribe(
      (data: Level[]) => { this.listLvls = data;  } , (err) => {
        console.log(err);
      },
    );
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
    };
    const titleContent = title ? ` ${title}` : '';
    this.toastrService.show(
      body,
      ` ${titleContent}`,
      config);
  }

  storeLevel(){
    this.ls.addLevel(this.lvl).subscribe(
      () => {
        this.showToast('success','SUCESS','Created Successfuly');
        this.levelForm.reset();
        this.router.navigateByUrl("/hr/organigram/level/createandview");
      }, (err) => {
        console.log(err);
        this.showToast('danger','FAILURE','Could not create Level');
      }
    )
  }
  
  

}
