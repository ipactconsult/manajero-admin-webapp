import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbThemeService, NbToastrConfig, NbToastrService, NbWindowService } from '@nebular/theme';
import { Relance } from '../../models/Relance';
import { RelanceService } from '../../services/relance.service';

@Component({
  selector: 'ngx-recouvrement-rapport',
  templateUrl: './recouvrement-rapport.component.html',
  styleUrls: ['./recouvrement-rapport.component.scss']
})
export class RecouvrementRapportComponent  implements OnInit {



  @Output() addReminderOutputEvent = new EventEmitter<Relance>();
  relanceList: Relance[];
  relance: Relance = new Relance();
  config: NbToastrConfig;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  search: string="";
  numberCustomers = 0;
  currentdate:Date ;
  numbermail=0;
  numbesms=0;




  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  current : number = 1;
  numberin=0;

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
      for (let  i = 0; i < this.relanceList.length; i++){
        this.numbesms=this.numbesms+this.relanceList[i]?.sms?.length
        
        
              }
      console.log(this.numbermail)
    }
  

    );



  }
 
}
