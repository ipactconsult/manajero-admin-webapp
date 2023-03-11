import { Component, OnInit } from '@angular/core';
import {MessageService} from "../../services/message/message.service";
import {Message} from "../../models/message/message";
import {AuthService} from "../../../auth/service/auth.service";
import {Auth} from "../../../auth/model/Auth";
import moment from "moment";

@Component({
  selector: 'ngx-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  allMessages: Message[] = [];
  users: Auth[] = [];
  userConnected = JSON.parse(sessionStorage.getItem('auth-user'));
  otherUser;
  msgsSent: any[] = [];
  messageToSent;
  messageToUpdate;
  chatHidden = true;
  changeColorOnClick = 'text-white';
  messageId;
  moment: any = moment;
  usersLoaded = false;

  constructor(private messageService: MessageService, private authService: AuthService) { }

  selectUser(otherUser) {
    this.allMessages = [];
    this.msgsSent = [];
    this.otherUser = otherUser;
    if (this.chatHidden === true) {
      this.chatHidden = false;
    }
    for (let u = 0; u < this.users.length; u++) {
      if (this.users[u].email === this.otherUser) {
        this.changeColorOnClick = 'text-primary';
      } else {
        this.changeColorOnClick = 'text-white';
      }
    }
    this.messageService.getAllMessages().subscribe(messages => {
      for (let m = 0; m < messages.length; m++) {
        if (messages[m].me === this.userConnected.email &&
          messages[m].theOther === otherUser || messages[m].me === otherUser &&
          messages[m].theOther === this.userConnected.email) {
          this.allMessages.push(messages[m]);
          this.msgsSent = messages[m].messages;
          for (let s = 0; s < this.msgsSent.length; s++) {
            this.msgsSent[s].reply = this.userConnected.email === this.msgsSent[s].me;
          }
          this.messageId = messages[m].messageId;
        }
      }
    })
  }

  sendMessage(event: any) {

    this.msgsSent.push({
      text: event.message,
      date: new Date(),
      me: this.userConnected.email,
      reply: true
    });

    this.messageToSent = {
      me: this.userConnected.email,
      theOther: this.otherUser,
      messages: this.msgsSent
    };

    this.messageToUpdate = {
      messages: this.msgsSent
    };

    if (this.allMessages.length === 0) {
      this.messageService.addNewMessage(this.messageToSent).subscribe(() => {
        this.allMessages.push(this.messageToSent);
      });
    } else {
      this.messageService.updateConversation(this.messageToUpdate, this.messageId).subscribe(message => {
        console.log(message);
      })
    }
  }

  ngOnInit(): void {
    this.usersLoaded = true;
    setTimeout(() => {
      this.authService.getAllUsers().subscribe(users => {
        for (let u = 0; u < users.length; u++) {
          if (users[u].email !== this.userConnected.email) {
            this.usersLoaded = false;
            this.users.push(users[u]);
          }
        }
      });
    }, 2000);
  }

}
