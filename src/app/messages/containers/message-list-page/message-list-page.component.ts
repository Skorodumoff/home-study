import {Component, OnInit} from '@angular/core';
import {PageType} from '../../../core/constants/page-type.enum';
import {User} from '../../../core/models/user.model';
import {Router} from '@angular/router';
import {routingConstants} from '../../constants/routing-constants';
import {MessageService} from '../../services/message.service';
import {Observable} from 'rxjs';
import {Message} from '../../models/message.model';
import {NavigationDirection} from '../../constants/navigation-direction.enum';

@Component({
  selector: 'app-message-list-page',
  templateUrl: './message-list-page.component.html',
  styleUrls: ['./message-list-page.component.scss']
})
export class MessageListPageComponent implements OnInit {
  private pageType: PageType = PageType.MessageList;
  private messages$: Observable<Message[]>;

  constructor(
    private router: Router,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.messages$ = this.messageService.getCurrentPageMessages();
    this.messageService.navigateToPage(0);
  }

  onNavigate(direction: NavigationDirection) {
    if (direction === NavigationDirection.back) {
      this.messageService.navigateBack();
    } else {
      this.messageService.navigateForward();
    }
  }

  onCreateNewMessageClick() {
    this.router.navigate([`messages/${routingConstants.newMessageParamValue}`]);
  }

  onEditMessageClick(messageId) {
    this.router.navigate([`messages/${messageId}`]);
  }
}
