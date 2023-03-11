import { Component, OnInit } from '@angular/core';
import { Avocat } from '../../models/Avocat';
import { Dossier } from '../../models/Dossier';
import { Loi } from '../../models/Loi';
import { Relance } from '../../models/Relance';
import { AvocatService } from '../../services/avocat/avocat.service';
import { DossierjuridiqueService } from '../../services/dossierjuridique.service';
import { LitigeService } from '../../services/litige/litige.service';
import { LoiService } from '../../services/lois/loi.service';
import { RelanceService } from '../../services/relance.service';

@Component({
  selector: 'ngx-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {
numberlaws:number
numberavocat:number

numberrelance:number
numdispute:number
numberrelancecloture:number

numberdossier:number

  laws:Loi 
  avocat:Avocat
  dossier:Dossier
  relance:Relance;
  

  constructor(private lawservice:LoiService,private avocatservice:AvocatService,private dossierservice:DossierjuridiqueService,
    private relanceservice:RelanceService,private litige:LitigeService) { }

  ngOnInit(): void {

    this.lawservice.getAllLois().subscribe(law=>{

this.numberlaws=law.length;

    })
    this.lawservice.getAllLois().subscribe(law=>{

      this.numberlaws=law.length;
      
          })
          this.relanceservice.getAllRelance("false",false).subscribe(relance=>{

            this.numberrelance=relance.length;
            
                }) 
                this.relanceservice.getAllRelance("false",true).subscribe(relance=>{

                  this.numberrelancecloture=relance.length;
                  
                      }) 
                      
                
                this.avocatservice.getAllAvocats().subscribe(avocat=>{

                  this.numberavocat=avocat.length;
                  
                      })
                      this.litige.getAllLitige().subscribe(lit=>{

                        this.numdispute=lit.length;
                        
                            })
                          
  }
  

}


