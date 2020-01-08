import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class UserService {
  constructor(private client: HttpClient) { }

  loadUsers(): Observable<User[]> {
    return this.client.get<User[]>(`${environment.api_url}/users`);
  }
}
