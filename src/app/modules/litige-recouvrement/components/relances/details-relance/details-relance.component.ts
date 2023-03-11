import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dossier } from '../../../models/Dossier';
import { Relance } from '../../../models/Relance';
import { DossierjuridiqueService } from '../../../services/dossierjuridique.service';
import { RelanceService } from '../../../services/relance.service';

@Component({
  selector: 'ngx-details-relance',
  templateUrl: './details-relance.component.html',
  styleUrls: ['./details-relance.component.scss']
})
export class DetailsRelanceComponent implements OnInit {
enableEmail:boolean ;
enableSMS:boolean;
enableCall:boolean ;
enableComment:boolean ;
@Output() addCategoryOutputEvent = new EventEmitter<Relance>();
idUri: string = '';
enablePromise:boolean ;
relance: Relance = new Relance();
dossier :Dossier =new Dossier ();
createLitigeProject: FormGroup;


  constructor(private router: Router, private cs: RelanceService, 
    private activatedroute: ActivatedRoute, private ds :DossierjuridiqueService ,private modal: NgbModal
   )
   
{ }

  ngOnInit(): void {
    
    this.activatedroute.paramMap.subscribe(result => {
      this.idUri = result.get('id');

    }
    );
console.log(this.idUri)
  this.cs.getRelanceById(this.idUri).subscribe(data => {
    console.log(data)
      this.relance = data;
      error => console.log(error);
    });

    this.enableEmail=false ;
    this.enableCall=false ;
    this.enableComment=false ;
    this.enablePromise=false ;


  }


  enableMailComponent(){
    this.enableEmail=true ;
    this.enableCall=false ;
    this.enableComment=false ;
    this.enablePromise=false ;
    this.enableSMS=false ;   
  }
  enableCallsComponent(){
    this.enableEmail=false ;
    this.enableCall=true ;
    this.enableComment=false ;
    this.enablePromise=false ;
    this.enableSMS=false ;

  }
  enableCommentComponent(){
    this.enableEmail=false ;
    this.enableCall=false ;
    this.enableComment=true ;
    this.enablePromise=false ;
    this.enableSMS=false ;



  }
  enableSMSComponent(){
    this.enableEmail=false ;
    this.enableSMS=true ;
    this.enableCall=false ;
    this.enableComment=false ;
    this.enablePromise=false ;



  }
  enablePromiseComponent(){
    this.enableEmail=false ;
    this.enableCall=false ;
    this.enableComment=false ;
    this.enablePromise=true ;
    this.enableSMS=false ;

  }

  AddDossier(){
    this.dossier.relance=this.relance;

    this.ds.addDossier(this.dossier).subscribe(result => {
      this.dossier=result;
      this.router.navigateByUrl('/litige/judiciaire/'+result.id).then(() => {
        this.router.navigate(['/litige/judiciaire/'+result.id]);
      });
     
    },
      (err) => {
        console.log(err)
       
      },
    );



  }
}
