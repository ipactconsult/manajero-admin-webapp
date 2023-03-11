import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MessagesComponent} from "./components/messages/messages.component";

const routes: Routes = [
  { path: 'messages', component: MessagesComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ChatRoutingModule { }