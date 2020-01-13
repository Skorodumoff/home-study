import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {Observable, of} from 'rxjs';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';

const USERS: User[] = [
  {
    'id': 1,
    'name': 'Leanne Graham',
    'username': 'Bret',
    'email': 'Sincere@april.biz',
    'address': {
      'street': 'Kulas Light',
      'suite': 'Apt. 556',
      'city': 'Gwenborough',
      'zipcode': '92998-3874',
      'geo': {
        'lat': '-37.3159',
        'lng': '81.1496'
      }
    },
    'phone': '1-770-736-8031 x56442',
    'website': 'hildegard.org',
    'company': {
      'name': 'Romaguera-Crona',
    }
  },
  {
    'id': 2,
    'name': 'Ervin Howell',
    'username': 'Antonette',
    'email': 'Shanna@melissa.tv',
    'address': {
      'street': 'Victor Plains',
      'suite': 'Suite 879',
      'city': 'Wisokyburgh',
      'zipcode': '90566-7771',
      'geo': {
        'lat': '-43.9509',
        'lng': '-34.4618'
      }
    },
    'phone': '010-692-6593 x09125',
    'website': 'anastasia.net',
    'company': {
      'name': 'Deckow-Crist',
      'catchPhrase': 'Proactive didactic contingency',
      'bs': 'synergize scalable supply-chains'
    }
  },
  {
    'id': 3,
    'name': 'Clementine Bauch',
    'username': 'Samantha',
    'email': 'Nathan@yesenia.net',
    'address': {
      'street': 'Douglas Extension',
      'suite': 'Suite 847',
      'city': 'McKenziehaven',
      'zipcode': '59590-4157',
      'geo': {
        'lat': '-68.6102',
        'lng': '-47.0653'
      }
    },
    'phone': '1-463-123-4447',
    'website': 'ramiro.info',
    'company': {
      'name': 'Romaguera-Jacobson',
      'catchPhrase': 'Face to face bifurcated interface',
      'bs': 'e-enable strategic applications'
    }
  },
];

class MockHttpClient {
  public get(): Observable<User[]> {
    return of(USERS);
  }
}

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: HttpClient, useClass: MockHttpClient},
      UserService
    ]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
