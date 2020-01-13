import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class NotificationService {
  private notification$ = new BehaviorSubject<string>(null);

  constructor() {
  }

  showMessage(message: string) {
    this.notification$.next(message);
    setTimeout(() => this.notification$.next(null), 5000);
  }

  getNotification() {
    return this.notification$;
  }
}
