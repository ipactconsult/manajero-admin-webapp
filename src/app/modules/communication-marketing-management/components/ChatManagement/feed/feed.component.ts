import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessage } from '../../../models/chat-message';
import { ChatService } from '../../../services/chatService/chat.service';

@Component({
  selector: 'ngx-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  ngOnInit() {
    //this.feed = this.chat.getMessages();
  }



/*
  feed: Observable<ChatMessage[]>;

  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.feed = this.chat.getMessages();
  }

  ngOnChanges() {
    this.feed = this.chat.getMessages();
  }*/

}
