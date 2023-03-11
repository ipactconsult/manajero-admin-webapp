import { Component, OnInit } from '@angular/core';
import {MaterialService} from "../../../../services/material/material.service";
import {Material} from "../../../../models/material/material";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import moment from "moment";

@Component({
  selector: 'ngx-show-material',
  templateUrl: './show-material.component.html',
  styleUrls: ['./show-material.component.scss']
})
export class ShowMaterialComponent implements OnInit {
  
  existedMaterial: Material = new Material();
  materialCreationDate;
  completedState1 = true;
  moment: any = moment;

  constructor(private materialService: MaterialService, private location: Location,
              private router: Router) { }
  
  goToPreviousRoute(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.materialService.getOneMaterial(this.router.url
      .replace('/pim/procurement/material/', '')).subscribe((material) => {
        this.existedMaterial = material;
        this.materialCreationDate = moment(this.existedMaterial.materialCreationDate).format('DD MMM YYYY')
    })
  }

}
