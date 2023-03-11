import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService, NbWindowService } from '@nebular/theme';
import { Avocat } from '../../../models/Avocat';
import { AvocatService } from '../../../services/avocat/avocat.service';

@Component({
  selector: 'ngx-archived-avocat',
  templateUrl: './archived-avocat.component.html',
  styleUrls: ['./archived-avocat.component.scss']
})
export class ArchivedAvocatComponent implements OnInit {

  avocat: Avocat = new Avocat();

  dataAvocats: Avocat [] = [];
  
  constructor(private av: AvocatService, private dialogService: NbDialogService,
              private router: Router, private windowService: NbWindowService,
              private toastrService: NbToastrService) {
  }


  ngOnInit(): void {
    this.getAllAvocat();
  }

  getAllAvocat() {
    this.av.getAllAvocats().subscribe(
      (data: Avocat[]) => {
        this.dataAvocats = data.filter(
          (c => c.archive === "True" )
        );

      }, (err) => {
        return err;
      }
    );
  }


}
