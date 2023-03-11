import { Component, OnInit } from '@angular/core';
import { ChatMessage } from '../../../models/chat-message';
import {ChatService} from './../../../services/chatService/chat.service';

@Component({
  selector: 'ngx-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {
  //message: string;
  chatMessage : ChatMessage = new ChatMessage();
  constructor(private chat: ChatService) { }

  ngOnInit() {
  }
/*
  send() {
    this.chat.sendMessage(this.chatMessage);
    console.log('message', this.chatMessage);
 //   this.chatMessage = '';

  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }*/
}


