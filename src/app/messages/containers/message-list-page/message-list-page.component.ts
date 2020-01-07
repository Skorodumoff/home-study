import {Component, OnInit} from '@angular/core';
import {PageType} from '../../../core/constants/page-type.enum';
import {User} from '../../../core/models/user.model';

@Component({
  selector: 'app-message-list-page',
  templateUrl: './message-list-page.component.html',
  styleUrls: ['./message-list-page.component.scss']
})
export class MessageListPageComponent implements OnInit {
  private pageType: PageType = PageType.MessageList;
  private currentUser: User = {
    userName: 'Daniel'
  };

  constructor() {
  }

  ngOnInit() {
  }

}
