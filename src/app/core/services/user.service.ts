import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(private client: HttpClient) { }

  loadUsers(): Observable<User[]> {
    return this.client.get<User[]>(`${environment.api_url}/users`);
  }

  getCurrentUser(): User {
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

  login(userName): Observable<User> {
    return this.loadUsers().pipe(map(users => users.find(user => user.userName === userName)));
  }
}
