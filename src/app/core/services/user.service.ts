import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, Subscriber} from 'rxjs';
import {filter, last, map} from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(private client: HttpClient) { }
  private subscriber: Subscriber<User>;
  private currentUser$ = new Observable<User>(subscriber => {
    this.subscriber = subscriber;
  });

  loadUsers(): Observable<User[]> {
    return this.client.get<User[]>(`${environment.api_url}/users`);
  }

  getCurrentUser(): Observable<User> {
    const user: string = window.localStorage.getItem('currentUser');
    if (!user) {
      return null;
    }

    return JSON.parse(user);
  }

  storeUser(user): void {
    window.localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logOutUser(): void {
    window.localStorage.removeItem('currentUser');
  }

  login(username): Observable<User> {
    return this.loadUsers().pipe(map(users => users.find(user => user.username === username)));
  }
}
