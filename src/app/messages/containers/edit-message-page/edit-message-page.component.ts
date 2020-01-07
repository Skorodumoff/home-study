import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {PageType} from '../../../core/constants/page-type.enum';
import {routingConstants} from '../../constants/routing-constants';

@Component({
  selector: 'app-edit-message-page',
  templateUrl: './edit-message-page.component.html',
  styleUrls: ['./edit-message-page.component.scss']
})
export class EditMessagePageComponent implements OnInit, OnDestroy {
  private routeSubscription: Subscription;
  private pageType: PageType;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const messageId = paramMap.get(routingConstants.messageIdParamName);
      this.pageType = this.getPageType(messageId);
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
}
