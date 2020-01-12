import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subscriber} from 'rxjs';

@Injectable()
export class NotificationService {
  private notification$ = new Observable<string>(subscriber => {
    this.subscriber = subscriber;
  });
  subscriber: Subscriber<string>;

  //private notification$ = new BehaviorSubject()

  constructor() { }

  showMessage(message: string) {
    setTimeout(() => {
      this.subscriber.next(message);
      setTimeout(() => this.subscriber.next(null), 5000);
    }, 0);
  }

  getNotification() {
    return this.notification$;
  }
}
