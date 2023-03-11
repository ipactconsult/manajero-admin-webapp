import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './components/messages/messages.component';
import {NbCardModule, NbChatModule, NbListModule, NbSpinnerModule} from "@nebular/theme";
import {ChatRoutingModule} from "./chat-routing.module";



@NgModule({
  declarations: [
    MessagesComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbListModule,
    NbChatModule,
    ChatRoutingModule,
    NbSpinnerModule
  ]
})
export class ChatModule { }
