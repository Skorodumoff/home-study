import {Component, OnInit} from '@angular/core';
import {PageType} from '../../../core/constants/page-type.enum';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../core/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.scss']
})
export class LogInPageComponent implements OnInit {
  private pageType: PageType = PageType.LogIn;
  private noUser = false;

  private form = new FormGroup({
    userName: new FormControl('', Validators.required)
  });

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.valid) {
      const username = this.form.value.username;

      this.userService.login(username).subscribe(user => {
        if (!user) {
          this.noUser = true;
        } else {
          this.userService.storeUser(user);
          this.router.navigate(['messages']);
        }
      });
    }
  }
}
