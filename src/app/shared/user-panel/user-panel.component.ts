import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../core/models/user.model';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {
  @Input() user: User = null;
  constructor() { }

  ngOnInit() {
    console.log(this.user);
  }

  userIsLoggedIn() {
    return this.user !== null && this.user !== undefined ;
  }

}
