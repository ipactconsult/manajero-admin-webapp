import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {ChartModule} from "angular2-chartjs";
import {
  NbAccordionModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbSelectModule,
  NbSidebarModule, NbTagModule,
  NbTooltipModule,
  NbTreeGridModule, NbUserModule,
  NbWindowModule,
  NbStepperModule,
  NbChatModule,
  NbTimepickerModule,
  NB_TIME_PICKER_CONFIG,
  NbDatepickerModule,
  NbFormFieldModule,
  NbSpinnerModule


} from '@nebular/theme';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import { CommunicationMarketingManagementRoutingModule } from './communication-marketing-management-routing.module';
//import { BrowserModule } from '@angular/platform-browser';

import { EventMarketingComponent } from './components/eventManagement/event-marketing/event-marketing.component';
import { AddEventMarketingComponent } from './components/eventManagement/add-event-marketing/add-event-marketing.component';
import { AddEditMarketingComponent } from './components/eventManagement/add-edit-marketing/add-edit-marketing.component';

import { ThemeModule } from '../../@theme/theme.module';
import { ListEventMarketingComponent } from './components/eventManagement/list-event-marketing/list-event-marketing.component';
import { ParternershipComponent } from './components/PartnerManagement/parternership/parternership.component';
import { AddGedComponent } from './components/DocumentManagement/add-ged/add-ged.component';
import {AddParternershipComponent} from './components/PartnerManagement/add-parternership/add-parternership.component';
import { GedComponent } from './components/DocumentManagement/ged/ged.component';
import { EditPartnershipComponent } from './components/PartnerManagement/edit-partnership/edit-partnership.component';
import { GedEditComponent } from './components/DocumentManagement/ged-edit/ged-edit.component';
import { ListPartnershipComponent } from './components/PartnerManagement/list-partnership/list-partnership.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatMenuModule} from '@angular/material/menu';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { GridEventComponent } from './components/eventManagement/grid-event/grid-event.component';
import { GridPartnershipComponent } from './components/PartnerManagement/grid-partnership/grid-partnership.component';
import { DetailsPartnershipComponent } from './components/PartnerManagement/details-partnership/details-partnership.component';
import { AppRoutingModule } from '../../app-routing.module';
import { RouterModule } from '@angular/router';
import { routes } from '@nebular/auth';
import { DocumentComponent } from './components/DocumentManagement/document/document.component';
import { DetailsEventMarketingComponent } from './components/eventManagement/details-event-marketing/details-event-marketing.component';
import { SocialNetworkComponent } from './components/socialNetworkManagement/social-network/social-network.component';
import { ShareOnSocialMediaComponent } from './components/share-on-social-media/share-on-social-media.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { CommonModule } from '@angular/common';
import { DocsService } from './docs/docs.service';
import { PublicationComponent } from './components/publicationManagement/publication/publication.component';
import { AddPublicationComponent } from './components/publicationManagement/add-publication/add-publication.component';
import { EditPublicationComponent } from './components/publicationManagement/edit-publication/edit-publication.component';
import { DetailsPublicationComponent } from './components/PublicationManagement/details-publication/details-publication.component';
import { PersonaComponent } from './components/PersonaManagement/persona/persona.component';
import { GraphicalCharterComponent } from './components/graphicalCharterManagement/graphical-charter/graphical-charter.component';
import { DetailsPersonaComponent } from './components/PersonaManagement/details-persona/details-persona.component';

import {Directive} from "@angular/core";
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";
import { EditPersonaComponent } from './components/personaManagement/edit-persona/edit-persona.component';
import { EditGraphicalCharterComponent } from './components/graphicalcharterManagement/edit-graphical-charter/edit-graphical-charter.component';
import { AddPersonaComponent } from './components/personaManagement/add-persona/add-persona.component';
import { AddCharterComponent } from './components/graphicalCharterManagement/add-charter/add-charter.component';
import { DetailsCharterComponent } from './components/graphicalCharterManagement/details-charter/details-charter.component';
import { GridPublicationComponent } from './components/PublicationManagement/grid-publication/grid-publication.component';
import { PostFeedComponent } from './components/SocialNetworkManagement/post-feed/post-feed.component';
import { CreatePostComponent } from './components/SocialNetworkManagement/create-post/create-post.component';
import { GridPersonnaComponent } from './components/personaManagement/grid-personna/grid-personna.component';
import { ChatGridComponent } from './components/graphicalCharterManagement/chat-grid/chat-grid.component';
//import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ColorPickerModule } from 'ngx-color-picker';
import { UserlistComponent } from './components/SocialNetworkManagement/userlist/userlist.component';
import { PostDetailsComponent } from './components/SocialNetworkManagement/post-details/post-details.component';
import { PartnerHistoryComponent } from './components/partnerManagement/partner-history/partner-history.component';
import { EventArchiveComponent } from './components/eventManagement/event-archive/event-archive.component';
import { CalenderEventMarketingComponent } from './components/eventManagement/calender-event-marketing/calender-event-marketing.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxOrgChartModule } from 'ngx-org-chart';

//import { FlatpickrModule } from 'angularx-flatpickr';


import { CalendrierComponent } from './components/PublicationManagement/calendrier/calendrier.component';
import { ListPublicationComponent } from './components/PublicationManagement/list-publication/list-publication.component';
import { ListPersonaComponent } from './components/personaManagement/list-persona/list-persona.component';
import { ShareButtonComponent } from './components/PublicationManagement/share-button/share-button.component';
import { GlobalCharterComponent } from './components/GlobalCharterManagement/global-charter/global-charter.component';
import { AddGlobalCharterComponent } from './components/GlobalCharterManagement/add-global-charter/add-global-charter.component';
import { EditGlobalCharterComponent } from './components/GlobalCharterManagement/edit-global-charter/edit-global-charter.component';
import { EditCommentComponent } from './components/SocialNetworkManagement/edit-comment/edit-comment.component';
import { DetailsGlobalCharterComponent } from './components/GlobalCharterManagement/details-global-charter/details-global-charter.component';
import { ProductPersonasComponent } from './components/ProductPersonas/product-personas/product-personas.component';
import { EditProductPersonasComponent } from './components/ProductPersonas/edit-product-personas/edit-product-personas.component';
import { PersonaStatComponent } from './components/statistics/persona-stat/persona-stat.component';
import { ArchiveGlobalCharterComponent } from './components/GlobalCharterManagement/archive-global-charter/archive-global-charter.component';
import { ArchiveDocumentComponent } from './components/DocumentManagement/archive-document/archive-document.component';
import {CurrentUserProfileComponent} from "./components/SocialNetworkManagement/current-user-profile/current-user-profile.component";
import {AboutComponent} from "./components/SocialNetworkManagement/about/about.component";
import {PartnerStatComponent} from "./components/statistics/partner-stat/partner-stat.component";
import {PersonaArchiveComponent} from "./components/PersonaManagement/persona-archive/persona-archive.component";
import {PublicationArchiveComponent} from "./components/PublicationManagement/publication-archive/publication-archive.component";
import {VideosComponent} from "./components/SocialNetworkManagement/videos/videos.component";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {NgxEchartsModule} from "ngx-echarts";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { SelectedUserComponent } from './components/SocialNetworkManagement/selected-user/selected-user.component';
import {MatButtonModule} from "@angular/material/button";
import { UpdatepostComponent } from './components/SocialNetworkManagement/updatepost/updatepost.component';

//import { StreamChatModule, StreamAutocompleteTextareaModule } from 'stream-chat-angular';

@NgModule({
  declarations: [
    GedComponent,
    ParternershipComponent  , 
    AddGedComponent, 
    AddParternershipComponent, 
    EventMarketingComponent, AddEventMarketingComponent, AddEditMarketingComponent, 
    ListEventMarketingComponent, EditPartnershipComponent, GedEditComponent, ListPartnershipComponent, 
    GridEventComponent, GridPartnershipComponent, DetailsPartnershipComponent  ,
   // FsIconComponent
    DocumentComponent,
    DetailsEventMarketingComponent,
    SocialNetworkComponent,
    ShareOnSocialMediaComponent,
    PublicationComponent,
    AddPublicationComponent,
    EditPublicationComponent,
    DetailsPublicationComponent,
    PersonaComponent,
    GraphicalCharterComponent,
    DetailsPersonaComponent,
    EditPersonaComponent,
    EditGraphicalCharterComponent,
    AddPersonaComponent,
    AddCharterComponent,
    DetailsCharterComponent,
    GridPublicationComponent,
    PostFeedComponent,
    CreatePostComponent,
    GridPersonnaComponent,
    ChatGridComponent,
    UserlistComponent,
    PostDetailsComponent,
    PartnerHistoryComponent,
    EventArchiveComponent,
    CalenderEventMarketingComponent,
    AboutComponent,
    CurrentUserProfileComponent,
    PartnerStatComponent,
    PersonaArchiveComponent,
    PublicationArchiveComponent,
    VideosComponent,
    UserlistComponent,
    CalendrierComponent,
    ListPublicationComponent,
    ListPersonaComponent,
    ShareButtonComponent,
    GlobalCharterComponent,
    AddGlobalCharterComponent,
    EditGlobalCharterComponent,
    EditCommentComponent,
    DetailsGlobalCharterComponent,
    ProductPersonasComponent,
    EditProductPersonasComponent,
    PersonaStatComponent,
    ArchiveGlobalCharterComponent,
    ArchiveDocumentComponent,
    SelectedUserComponent,
    UpdatepostComponent,


    
 ],
  imports: [

    CommonModule,
    NgbModule,
    NbIconModule,
    NbDialogModule,
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NbSelectModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    NbEvaIconsModule,
    CommunicationMarketingManagementRoutingModule,
    ThemeModule,
    NbTreeGridModule,
    NbLayoutModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NbSidebarModule,
    MatMenuModule,
    NbTooltipModule,
    NbWindowModule,
    NbAlertModule,
    NbUserModule,
    NbTagModule,
    NbAccordionModule,
    ChartModule,
    // ShareButtonsModule,
    // ShareIconsModule // Optional if you want the default share icons
    NbStepperModule,
    NbChatModule,
    NbTimepickerModule,
    NbDatepickerModule,
    //  NgxIntlTelInputModule

    //   ColorPickerModule
    //   FlatpickrModule.forRoot(),
    //  BrowserAnimationsModule,
    //   BrowserModule,
    NgbModalModule,
    AngularFireDatabaseModule,
    //  //  AngularFireModule,
    //  AngularFireAuthModule,

    //     HttpModule ,
    //BrowserAnimationsModule ,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),


    // FlatpickrModule.forRoot(),


    //ChartModule,
    NgxEchartsModule,
    NgxChartsModule,
    MatButtonModule,
    NbFormFieldModule,
    NbSpinnerModule,
    //  BrowserModule, 
    //   StreamAutocompleteTextareaModule, 
    //   StreamChatModule

    //  TranslateModule, 
    // StreamAutocompleteTextareaModule,
    //   StreamChatModule


  ],
    schemas :[
      NO_ERRORS_SCHEMA ,

    ] ,
    providers: [
      DocsService  ,
      {
        provide:NB_TIME_PICKER_CONFIG,
        useValue:{} ,
        } ,

    
      
    ]
})
export class CommunicationMarketingManagementModule { }
