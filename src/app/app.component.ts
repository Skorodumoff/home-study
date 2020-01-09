import {Component, OnInit} from '@angular/core';
import {UserService} from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'assignment';

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.init();
  }
}
