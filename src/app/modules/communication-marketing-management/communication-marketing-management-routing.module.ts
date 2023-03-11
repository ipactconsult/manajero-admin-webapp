import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GedComponent} from './components/DocumentManagement/ged/ged.component';
import { ParternershipComponent } from './components/PartnerManagement/parternership/parternership.component';
import {EventMarketingComponent} from './components/eventManagement/event-marketing/event-marketing.component';
import {AddEditMarketingComponent} from './components/eventManagement/add-edit-marketing/add-edit-marketing.component' ; 
import { ListEventMarketingComponent } from './components/eventManagement/list-event-marketing/list-event-marketing.component';
import {EditPartnershipComponent} from './components/PartnerManagement/edit-partnership/edit-partnership.component'; 
import { ListPartnershipComponent } from './components/PartnerManagement/list-partnership/list-partnership.component';
import { AddEventMarketingComponent } from './components/eventManagement/add-event-marketing/add-event-marketing.component';
import {GridEventComponent} from "./components/eventManagement/grid-event/grid-event.component";
import {AddParternershipComponent} from "./components/PartnerManagement/add-parternership/add-parternership.component";
import {GridPartnershipComponent} from "./components/PartnerManagement/grid-partnership/grid-partnership.component";
import {DetailsPartnershipComponent} from "./components/PartnerManagement/details-partnership/details-partnership.component";
import { DetailsEventMarketingComponent } from './components/eventManagement/details-event-marketing/details-event-marketing.component';
import { SocialNetworkComponent } from './components/socialNetworkManagement/social-network/social-network.component';
import { ShareOnSocialMediaComponent } from './components/share-on-social-media/share-on-social-media.component';
import { PublicationComponent } from './components/publicationManagement/publication/publication.component';
import { AddPublicationComponent } from './components/publicationManagement/add-publication/add-publication.component';
import { EditPublicationComponent } from './components/publicationManagement/edit-publication/edit-publication.component';
import { PersonaComponent } from './components/PersonaManagement/persona/persona.component';
import { DetailsPublicationComponent } from './components/PublicationManagement/details-publication/details-publication.component';
import { GraphicalCharterComponent } from './components/graphicalCharterManagement/graphical-charter/graphical-charter.component';
//import {ChatComponent} from './components/chat/chat.component';
import { DetailsPersonaComponent } from './components/PersonaManagement/details-persona/details-persona.component';
import { EditPersonaComponent } from './components/personaManagement/edit-persona/edit-persona.component';
import { EditGraphicalCharterComponent } from './components/graphicalcharterManagement/edit-graphical-charter/edit-graphical-charter.component';
import { AddPersonaComponent } from './components/personaManagement/add-persona/add-persona.component';
import { AddCharterComponent } from './components/graphicalCharterManagement/add-charter/add-charter.component';
import { DetailsCharterComponent } from './components/graphicalCharterManagement/details-charter/details-charter.component';
import { GridPublicationComponent } from './components/PublicationManagement/grid-publication/grid-publication.component';
import { GridPersonnaComponent } from './components/personaManagement/grid-personna/grid-personna.component';
import { UserlistComponent } from './components/SocialNetworkManagement/userlist/userlist.component';
import { PostDetailsComponent } from './components/SocialNetworkManagement/post-details/post-details.component';
import { PartnerHistoryComponent } from './components/partnerManagement/partner-history/partner-history.component';
import { EventArchiveComponent } from './components/eventManagement/event-archive/event-archive.component';
import { CalenderEventMarketingComponent } from './components/eventManagement/calender-event-marketing/calender-event-marketing.component';
import { StatistiquePartnerComponent } from './components/partnerManagement/statistique-partner/statistique-partner.component';
import { AboutComponent } from './components/SocialNetworkManagement/about/about.component';
import { CurrentUserProfileComponent } from './components/SocialNetworkManagement/current-user-profile/current-user-profile.component';
import { StatMenuComponent } from './components/statistics/stat-menu/stat-menu.component';
import { PartnerStatComponent } from './components/statistics/partner-stat/partner-stat.component';
import { PersonaArchiveComponent } from './components/personaManagement/persona-archive/persona-archive.component';
import { PublicationArchiveComponent } from './components/PublicationManagement/publication-archive/publication-archive.component';
import { GalleryComponent } from './components/SocialNetworkManagement/gallery/gallery.component';
import { VideosComponent } from './components/SocialNetworkManagement/videos/videos.component';
import { ChatroomComponent } from './components/ChatManagement/chatroom/chatroom.component';
import { ChatFormComponent } from './components/ChatManagement/chat-form/chat-form.component';
import { CalendrierComponent } from './components/PublicationManagement/calendrier/calendrier.component';
import { ListPublicationComponent } from './components/PublicationManagement/list-publication/list-publication.component';
import { ListPersonaComponent } from './components/personaManagement/list-persona/list-persona.component';
import { GlobalCharterComponent } from './components/GlobalCharterManagement/global-charter/global-charter.component';
import { AddGlobalCharterComponent } from './components/GlobalCharterManagement/add-global-charter/add-global-charter.component';
import { EditGlobalCharterComponent } from './components/GlobalCharterManagement/edit-global-charter/edit-global-charter.component';
import { DetailsGlobalCharterComponent } from './components/GlobalCharterManagement/details-global-charter/details-global-charter.component';
import { ProductPersonasComponent } from './components/ProductPersonas/product-personas/product-personas.component';
import { EditProductPersonasComponent } from './components/ProductPersonas/edit-product-personas/edit-product-personas.component';
import { PersonaStatComponent } from './components/statistics/persona-stat/persona-stat.component';
import { ArchiveGlobalCharterComponent } from './components/GlobalCharterManagement/archive-global-charter/archive-global-charter.component';
import {SelectedUserComponent} from "./components/SocialNetworkManagement/selected-user/selected-user.component";
import {UpdatepostComponent} from "./components/SocialNetworkManagement/updatepost/updatepost.component";

const routes: Routes = [
  {
  path: 'comMarketing',
  component: GedComponent,
  },
  { 
    path: 'deleteGed/:id', 
    component: GedComponent 
  },
  {
    path: "EventMarketing",
    component: EventMarketingComponent,
  },

  {
    path: "Parternership",
    component: ParternershipComponent,
  },

  {
    path: "EditEvent/:id",
    component: AddEditMarketingComponent,
  },

  {
    path: "ListEvent",
    component: ListEventMarketingComponent,
  },


  {
    path: "EditPartner/:id",
    component: EditPartnershipComponent,
  },

  {
    path: "LisPartner",
    component: ListPartnershipComponent,
  },
  {
    path: "AddEvent",
    component: AddEventMarketingComponent,
  },
  {
    path: "EventGrid",
    component: GridEventComponent,
  },

  {
    path: "AddPartner",
    component: AddParternershipComponent,
  },


  {
    path: "GridPartnership",
    component: GridPartnershipComponent,
  },
  
  {
    path: "DetailsPartnership/:id",
    component: DetailsPartnershipComponent,
  },

  {
    path: "DetailsEvent/:id",
    component: DetailsEventMarketingComponent,
  },


  {
    path: "SocialNetwork",
    component: SocialNetworkComponent,
  },

  {
    path: "Share",
    component: ShareOnSocialMediaComponent,
  },
  
  {
    path: "Publication",
    component: PublicationComponent,
  },
  

  {
    path: "AddPublication",
    component: AddPublicationComponent,
  },

  {
    path: "EditPublication/:id",
    component: EditPublicationComponent,
  },

  {
    path: "DetailsPublication/:id",
    component: DetailsPublicationComponent,
  },



  {
    path: "Persona",
    component: PersonaComponent,
  },

  
  {
    path: "GraphicalCharter",
    component: GraphicalCharterComponent,
  },
  /*{
    path: "Chat",
    component: ChatComponent,
  },*/

  {
    path: "DetailsPersona/:id",
    component: DetailsPersonaComponent,
  },

  
  {
    path: "EditPersona/:id",
    component: EditPersonaComponent,
  },


  {
    path: "EditCharter/:id",
    component: EditGraphicalCharterComponent,
  },

  {
    path: "AddPersona",
    component: AddPersonaComponent,
  },


  
  {
    path: "AddCharter",
    component: AddCharterComponent,
  },


    
  {
    path: "DetailsCharter/:id",
    component: DetailsCharterComponent,
  },
  
  {
    path: "GridPublication",
    component: GridPublicationComponent,
  },


  {
    path: "GridPersona",
    component: GridPersonnaComponent,
  },
  
  {
    path: "UserList",
    component: UserlistComponent,
  },
  {
    path: "PostDetails/:id",
    component: PostDetailsComponent,
  },

  {
    path: "ArchivePartner",
    component: PartnerHistoryComponent,
  },


  {
    path: "ArchiveEvent",
    component: EventArchiveComponent,
  },
  
  
  {
    path: "CalenderEvent",
    component: CalenderEventMarketingComponent,
  },
 {
    path: "StatPartner",
    component: StatistiquePartnerComponent,
  },

  {
    path: "About/:id",
    component: AboutComponent,
  },
   
  {
    path: "CurrentUser",
    component: CurrentUserProfileComponent,
  },
  {
    path: "SelectedUser/:id",
    component: SelectedUserComponent,
  },
 {
    path: "StatMenu",
    component: StatMenuComponent,
  },


  {
    path: "StatPartner",
    component: PartnerStatComponent,
  },

  {
    path: "archivePartner",
    component: PersonaArchiveComponent,
  },

  {
    path: "archivePublication",
    component: PublicationArchiveComponent,
  },

  {
    path: "gallery",
    component: GalleryComponent,
  },

  {
    path: "updatePost/:id",
    component: UpdatepostComponent,
  },
  {
    path: "videos",
    component: VideosComponent,
  },
  {
    path: "chatRoom",
    component: ChatroomComponent,
  },
  {
    path: "chatForm",
    component: ChatFormComponent,
  },

  {
    path: "CalenderPublication",
    component: CalendrierComponent,
  },

  {
    path: "ListPublication",
    component: ListPublicationComponent,
  },
  {
    path: "ListPersona",
    component: ListPersonaComponent,
  },

  {
    path: "GlobalCharter",
    component: GlobalCharterComponent,
  },

  {
    path: "AddGlobalCharter",
    component: AddGlobalCharterComponent,
  },

  {
    path: "EditGlobalCharter/:id",
    component: EditGlobalCharterComponent,
  },

  {
    path: "DetailsGlobalCharter/:id",
    component: DetailsGlobalCharterComponent,
  },


  {
    path: "ProductPersonas",
    component: ProductPersonasComponent,
  },

  {
    path: "EditProductPersonas/:id",
    component: EditProductPersonasComponent,
  },

  {
    path: "personaStat",
    component: PersonaStatComponent,
  },
  {
    path: "ArchiveGlobalCharter",
    component: ArchiveGlobalCharterComponent,
  },

  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunicationMarketingManagementRoutingModule { }
