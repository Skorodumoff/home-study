import {Component, OnInit} from '@angular/core';
import {PageType} from '../../../core/constants/page-type.enum';
import {User} from '../../../core/models/user.model';
import {Router} from '@angular/router';
import {routingConstants} from '../../constants/routing-constants';
import {Observable} from 'rxjs';
import {Message} from '../../models/message.model';
import {NavigationDirection} from '../../constants/navigation-direction.enum';
import {PagingState} from '../../models/paging-state';
import {NotificationService} from '../../../core/services/notification.service';
import {UserService} from '../../../core/services/user.service';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-message-list-page',
  templateUrl: './message-list-page.component.html',
  styleUrls: ['./message-list-page.component.scss']
})
export class MessageListPageComponent implements OnInit {
  private pageType: PageType = PageType.MessageList;
  private messages$: Observable<Message[]>;
  private paging$: Observable<PagingState>;
  private notification$: Observable<string>;
  private currentUser$: Observable<User>;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private notificationService: NotificationService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.messages$ = this.messageService.getMessages();
    this.paging$ = this.messageService.getPagingState();
    this.notification$ = this.notificationService.getNotification();

    this.currentUser$ = this.userService.getCurrentUser();

    this.messageService.setUpPageSize(10);
    this.messageService.navigateToPage(0);
  }

  onPageNavigate(direction: NavigationDirection) {
    if (direction === NavigationDirection.back) {
      this.messageService.navigateBack();
    } else {
      this.messageService.navigateForward();
    }
  }

  onCreateNewMessageClick() {
    this.router.navigate([`messages/${routingConstants.newMessageParamValue}`]);
  }

  onEditMessage(messageId) {
    this.router.navigate([`messages/${messageId}`]);
  }
}
