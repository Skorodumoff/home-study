import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {forkJoin, Observable, Subscription, zip} from 'rxjs';
import {PageType} from '../../../core/constants/page-type.enum';
import {routingConstants} from '../../constants/routing-constants';
import {MessageService} from '../../services/message.service';
import {Message} from '../../models/message.model';
import {NotificationService} from '../../../core/notification.service';
import {UserService} from '../../../core/services/user.service';
import {combineAll, take, withLatestFrom} from 'rxjs/operators';

@Component({
  selector: 'app-edit-message-page',
  templateUrl: './edit-message-page.component.html',
  styleUrls: ['./edit-message-page.component.scss']
})
export class EditMessagePageComponent implements OnInit, OnDestroy {
  private routeSubscription: Subscription;
  private pageType: PageType;
  private messageId: number;
  private message$: Observable<Message>;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private notificationService: NotificationService,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(paramMap => {
      const messageStringId = paramMap.get(routingConstants.messageIdParamName);
      this.pageType = this.getPageType(messageStringId);

      if (this.pageType === PageType.EditMessage) {
        this.messageId = parseInt(messageStringId, 10);
        this.message$ = this.messageService.getMessage(this.messageId);

        this.restrictEdit();
      }
    });
  }

  private restrictEdit() {
    zip(this.userService.getCurrentUser(), this.message$).pipe(take(1))
      .subscribe(([user, message]) => {
        if (message.userId !== user.id) {
          window.alert('You don\'t have permission to view this page');
          this.router.navigate(['messages']);
        }
      });
  }

  private getPageType(messageId): PageType {
    if (messageId === routingConstants.newMessageParamValue) {
      return PageType.CreateMessage;
    }
    return PageType.EditMessage;
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  onFormSave(formValue) {
    if (this.pageType === PageType.CreateMessage) {
      this.messageService.createMessage(formValue).subscribe(() => {
        this.router.navigate(['/messages']);
        this.notificationService.showMessage('post was successfully created');
      });
    } else {
      const message = {
        ...formValue,
        id: this.messageId
      };
      this.messageService.updateMessage(message).subscribe(() => {
        this.router.navigate(['/messages']);
        this.notificationService.showMessage('post was successfully updated');
      });
    }
  }

  onDelete() {
    // todo confirmation popup
    this.messageService.deleteMessage(this.messageId).subscribe(() => {
      this.router.navigate(['/messages']);
      this.notificationService.showMessage('post was deleted');
    });
  }

  onCancel() {
    this.router.navigate(['/messages']);
  }

  onBackToHomepage() {
    this.router.navigate(['/messages']);
  }


}
