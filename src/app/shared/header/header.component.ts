import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageType} from '../../core/constants/page-type.enum';
import {User} from '../../core/models/user.model';
import {pageTitles} from '../../core/constants/page-titles';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() pageType: PageType;
  @Input() pageTitle: string;
  @Input() user: User;
  @Output() createNewMessageClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  getPageTitle() {
    return pageTitles[this.pageType];
  }

  userPanelIsVisible() {
    return this.pageType !== PageType.LogIn;
  }

  newPostBtnClick() {
    this.createNewMessageClick.emit();
  }
}
