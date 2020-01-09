import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../core/models/user.model';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent {
  @Input() user: User = null;
  @Output() loginClick = new EventEmitter();
  @Output() logoutClick = new EventEmitter();
  constructor() { }

  userIsLoggedIn() {
    return this.user !== null && this.user !== undefined ;
  }

  loginBtnClick() {
    this.loginClick.emit();
  }

  logoutBtnClick() {
    this.logoutClick.emit();
  }
}
