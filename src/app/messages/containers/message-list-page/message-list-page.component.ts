import {Component, OnInit} from '@angular/core';
import {PageType} from '../../../core/constants/page-type.enum';
import {User} from '../../../core/models/user.model';
import {Router} from '@angular/router';
import {routingConstants} from '../../constants/routing-constants';
import {MessageService} from '../../services/message.service';
import {Observable} from 'rxjs';
import {Message} from '../../models/message.model';
import {NavigationDirection} from '../../constants/navigation-direction.enum';
import {PagingState} from '../../models/paging-state';

@Component({
  selector: 'app-message-list-page',
  templateUrl: './message-list-page.component.html',
  styleUrls: ['./message-list-page.component.scss']
})
export class MessageListPageComponent implements OnInit {
  private pageType: PageType = PageType.MessageList;
  private messages$: Observable<Message[]>;
  private paging$: Observable<PagingState>;

  private messages = null;
  private paging = null;

  constructor(
    private router: Router,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.messages$ = this.messageService.getCurrentPageMessages();
    this.paging$ = this.messageService.getPagingState();

    // TODO async pipes didnt work when navBack, for some reason, investigate and fix
    // workaround
    this.messages$.subscribe(m => this.messages = m);
    this.paging$.subscribe(p => this.paging = p);

    this.messageService.setUpPageSize(10);
    this.messageService.navigateToPage(0);
  }

  onNavigate(direction: NavigationDirection) {
    console.log('navigate');

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
