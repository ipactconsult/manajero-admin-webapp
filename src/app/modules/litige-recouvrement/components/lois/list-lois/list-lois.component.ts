import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Loi } from '../../../models/Loi';
import { LoiService } from '../../../services/lois/loi.service';
import { removeElementFromArray } from '../../../share/function';
import { UpdateloiComponent } from '../updateloi/updateloi.component';

@Component({
  selector: 'ngx-list-lois',
  templateUrl: './list-lois.component.html',
  styleUrls: ['./list-lois.component.scss']
})
export class ListLoisComponent implements OnInit {

  LoiList: Loi[] = []
  //LoiCaList:Loi[];


  source: LocalDataSource = new LocalDataSource();
  constructor(private windowService: NbWindowService,
    private router: Router,
    private loisc: LoiService,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    let name = this.activatedRoute.snapshot.paramMap.get("id");
    if (name == null) {
      this.loisc.getAllLois().subscribe((res) => {
        this.LoiList = res;
      });
    }
    else {
      this.loisc.GetLoibyCategory(name).subscribe((res) => {
        this.LoiList = res;
      });
    }

  }
  settings = {

    columns: {
      docName: {
        title: 'Document Name',
        type: 'string',

      },
      docType: {
        title: 'Type of Document',
        type: 'string',
        

      },
      file: {
        title: 'Url File  ',
        type: 'html', 
        valuePrepareFunction: (cell, row) => {
         
          return ` <a
         
            target="_blank"
            href="${row.file}"
            style="text-decoration: none"
          >
          file-link
  </a>`

        },

        
      },

      categorie: {
        title: ' Type of Category ',
        type: 'string',
        filter: false,
        valuePrepareFunction: (cell, row) => {
          return row?.cat?.categoriename

        },

      },

    },
    actions: {
      custom: [
  {
    name: 'edit',
    title: '<i class="nb-edit text-warning" title="Edit"></i>',
  },
  {
    name: 'delete',
    title: '<i class="nb-trash text-danger" title="Delete"></i>',
  },
  
],
edit: false,
delete: false,
add:false,

position: 'right',


    },
    pager: {
      display: true,
      perPage: 5,
    },

  };

  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      this.loisc.deleteLoi(event.data.id).subscribe({

        next: (res: any) => {

          const result = removeElementFromArray(this.LoiList, event.data.id);
          this.LoiList = [];
          this.LoiList = [...result];
          window.location.reload();


        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => { },
      });
    }
  }
  onCustom(event) {
    if (event.action === 'edit') {
      this.router.navigateByUrl('/litige/updateloi/' + event.data.id);
      }
     else if (event.action === 'delete') {
      this.onDeleteConfirm(event);
              window.location.reload();

    }
  }

 
}