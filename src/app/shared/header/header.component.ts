import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageType} from '../../core/constants/page-type.enum';
import {User} from '../../core/models/user.model';
import {pageTitles} from '../../core/constants/page-titles';
import {Router} from '@angular/router';
import {UserService} from '../../core/services/user.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() pageType: PageType;
  @Input() pageTitle: string;
  @Output() createNewMessageClick = new EventEmitter();
  @Output() backToHomepageClick = new EventEmitter();

  private user: User;
  private user$: Observable<User>;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.user$ = this.userService.getCurrentUser();
    this.user$.subscribe(user => this.user = user);
  }

  getPageTitle() {
    return pageTitles[this.pageType];
  }

  userPanelIsVisible() {
    return this.pageType !== PageType.LogIn;
  }

  backToHomepageLinkIsVisible() {
    return this.pageType === PageType.EditMessage || this.pageType === PageType.CreateMessage;
  }

  backToHomepage() {
    this.backToHomepageClick.emit();
  }

  newPostBtnClick() {
    this.createNewMessageClick.emit();
  }

  onLoginClick() {
    this.router.navigate([`log-in`]);
  }

  onLogoutClick() {
    this.userService.logOutUser();
    this.router.navigate(['messages']);
  }
}
