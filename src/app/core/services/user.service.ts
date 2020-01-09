import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable, Subscriber} from 'rxjs';
import {filter, last, map} from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(private client: HttpClient) { }
  private currentUser$ = new BehaviorSubject<User>(null);
  private allUsers: User[] = null;

  init() {
    const user = this.getUserFromStorage();
    this.currentUser$.next(user);
  }

  isLoggedIn() {
    return this.currentUser$.value !== null;
  }

  getCurrentUser() {
    return this.currentUser$;
  }

  getAllUsers() {
    return this.allUsers;
  }

  loadUsers(): Observable<User[]> {
    const users$ = this.client.get<User[]>(`${environment.api_url}/users`);
      users$.subscribe((users) => {
        this.allUsers = users;
      });

      return users$;
  }

  getUserFromStorage() {
    const user: string = window.localStorage.getItem('currentUser');
    if (!user) {
      return null;
    }

    return <User>(JSON.parse(user));
  }

  storeUser(user): void {
    window.localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser$.next(user);
  }

  logOutUser(): void {
    window.localStorage.removeItem('currentUser');
    this.currentUser$.next(null);
  }

  login(username): Observable<User> {
    const user$ = this.loadUsers().pipe(map(users => users.find(user => user.username === username)));
    user$.subscribe(user => {
      if (user) {
        this.storeUser(user);
      }
    });

    return user$;
  }
}
