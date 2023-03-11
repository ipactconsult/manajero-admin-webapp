import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { title } from 'process';
import {Publication} from "../../../models/publication";
import {PublicationService} from "../../../services/publication.service";

@Component({
  selector: 'ngx-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss']
})
export class ShareButtonComponent implements OnInit {


  @Input() type: 'facebook' | 'twitter';
  @Input() shareUrl: string;
  navUrl: string;
  idE;
  publication: Publication = new Publication();

  constructor( private publicationService: PublicationService, 
    
    private activatedroute: ActivatedRoute ) { }

  ngOnInit() {
    this.activatedroute.paramMap.subscribe(result => {
      this.idE = result.get('id');
    });

    this.publicationService.getPublicationById(this.idE).subscribe(data => {
      this.publication = data;
    
 
      error => console.log(error);
    });
    this.createNavigationUrl();
  }

  private createNavigationUrl() {
    let searchParams = new URLSearchParams();

    // TODO: zrobić map z tego manualnego dziugania

    switch(this.type) {
      case 'facebook':
       // searchParams.set('u', this.shareUrl);
       searchParams.set('u', this.shareUrl);

        this.navUrl = 'https://www.facebook.com/sharer/sharer.php?' + searchParams;
        break;
      case 'twitter':
        
  
        searchParams.set('url', "foo=1&bar=2" );
     //   searchParams.set('url', "test again " );
        this.navUrl =  'https://twitter.com/share?' + searchParams + this.publication ;
        break;
    }
  }

  public share() {
    return window.open(this.navUrl, "_blank");
  }

}
