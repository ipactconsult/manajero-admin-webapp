import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'ngx-share-on-social-media',
  templateUrl: './share-on-social-media.component.html',
  styleUrls: ['./share-on-social-media.component.scss']
})
export class ShareOnSocialMediaComponent implements OnInit {

  /*
   code = {
     name: '<share-buttons>',
     example: '<share-buttons show="11"></share-buttons>',
     styles: `@import '~ngx-sharebuttons/themes/default';`,
     npm: `npm i ngx-sharebuttons @angular/cdk
 npm i @fortawesome/fontawesome-svg-core @fortawesome/angular-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons`,
     import: `import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
 
 @NgModule({
   imports: [
     ShareButtonsModule,
     ShareIconsModule // Optional if you want the default share icons
   ]
 })`
   };
 
 
   displayedColumns = ['type', 'name', 'description'];
   dataSource: ApiDataSource | null;
 
   constructor(private docs: DocsService, private titleService: Title) {
   }
 
   ngOnInit() {
     this.titleService.setTitle('Share Buttons Component');
     const apiDatabase = new ApiDatabase(this.docs.getContainerApi());
     this.dataSource = new ApiDataSource(apiDatabase);
   }
 */
  ngOnInit() {

  }
}

