import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../core/models/user.model';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {
  @Input() user: User = null;
  @Output() loginClick = new EventEmitter();
  @Output() logoutClick = new EventEmitter();
  constructor() { }

  ngOnInit() {
    console.log(this.user);
  }

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
