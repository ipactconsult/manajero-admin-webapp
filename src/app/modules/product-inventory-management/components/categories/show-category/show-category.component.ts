import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../../services/category/category.service";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {Category} from "../../../models/category/category";
import {Material} from "../../../models/material/material";
import {MaterialService} from "../../../services/material/material.service";
import moment from "moment";

@Component({
  selector: 'ngx-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.scss']
})
export class ShowCategoryComponent implements OnInit {
  
  existedCategory: Category = new Category();
  materialsByCategory: Material[] = [];
  moment: any = moment;

  constructor(private categoryService: CategoryService, private location: Location,
              private router: Router, private materialService: MaterialService) { }

  goToPreviousRoute(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.categoryService.getOneCategory(this.router.url
      .replace('/pim/category/', '')).subscribe((category) => {
      this.existedCategory = category;
    });
    this.materialService.getAllMaterials().subscribe(materials => {
      for (let m = 0; m < materials.length; m++) {
        if (materials[m].materialCategory?.categoryId === this.existedCategory?.categoryId) {
          this.materialsByCategory.push(materials[m]);
        }
      }
    })
  }

}
