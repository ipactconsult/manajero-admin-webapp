import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService, NbWindowService } from '@nebular/theme';
import { Facture } from '../../../models/Facture';
import { Relance } from '../../../models/Relance';
import { RelanceService } from '../../../services/relance.service';
import { removeElementFromArray } from '../../../share/function';


@Component({
  selector: 'ngx-list-relances',
  templateUrl: './list-relances.component.html',
  styleUrls: ['./list-relances.component.scss']
})
export class ListRelancesComponent implements OnInit {
  @Output() addReminderOutputEvent = new EventEmitter<Relance>();
  relanceList: Relance[];
  relance: Relance = new Relance();
  config: NbToastrConfig;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  search: string="";
  facture=Facture;
  numberCustomers = 0;
  currentdate:Date ;
  numbermail=0




  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  current : number = 1;

  preventDuplicates = false;
  status: NbComponentStatus= 'primary';
  title = 'HI there!';
  content = `I'm cool toaster!`;

  constructor(private windowService: NbWindowService ,private cs: RelanceService , private dialogService: NbDialogService,
    private router: Router, 
    private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.currentdate=new Date();


    this.getAllRelance("false",false)
  }

  compareDate(date:Date):boolean{
    const d=new Date(date);
   

    return d.getTime()===this.currentdate.getTime();





  }
  getAllRelance(ar :string ,clo:boolean){

    this.cs.getAllRelance(ar,clo).subscribe((response)  =>{

      console.log(response);
      this.relanceList = response;
      for (let  i = 0; i < this.relanceList.length; i++) {
        console.log(this.relanceList[i].invoice);
        if (this.relanceList[i]?.invoice?.clientName !== this.relanceList[i+1]?.invoice?.clientName) {
          this.numberCustomers = this.numberCustomers + 1;
        } else {
          this.numberCustomers = this.numberCustomers + 0;
        }
      }
      console.log(this.numberCustomers);
      for (let  i = 0; i < this.relanceList.length; i++){
this.numbermail=this.numbermail+this.relanceList[i]?.email?.length


      }
      console.log(this.numbermail)
    }
  

    );



  }
  changeStatus(event,relance){

    relance.cloture=event;
this.cs.updateRelance(relance.id,relance).subscribe({next:(res)=>{
  this.relanceList=[];
  this.relanceList =[...removeElementFromArray(this.relanceList,relance.id)];

  console.log(res);

},error:(err)=>console.log(err)})
console.log(event);


  }

  openWindow(contentTemplate) {
    this.windowService.open(
      contentTemplate,
      {
        title: 'Add New Reminder',
      },
    );
  }

  filtrebyStatus(event){

    this.getAllRelance("false",event);



  }
  add_categorie(c: Relance) {
    this.addReminderOutputEvent.emit(c);
  }
  
}
