import {TestBed} from '@angular/core/testing';
import {MessageTransportService} from './message-transport.service';
import {HttpClient} from '@angular/common/http';
import {Message} from '../models/message.model';
import {Observable, of} from 'rxjs';

const MESSAGES: Message[] = [
  {
    'userId': 1,
    'id': 1,
    'title': 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',

    'body': 'quia et suscipit\nsuscipit recusandae consequuntur expedita et ' +
      'cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
  },
  {
    'userId': 1,
    'id': 2,
    'title': 'qui est esse',
    'body': 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor ' +
      'beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil ' +
      'molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
  },
  {
    'userId': 1,
    'id': 3,
    'title': 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    'body': 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi' +
      ' aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmole' +
      'stiae porro eius odio et labore et velit aut'
  },
  {
    'userId': 1,
    'id': 4,
    'title': 'eum et est occaecati',
    'body': 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem ' +
      'assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur ' +
      'doloremque ipsam iure\nquis sunt voluptatem rerum illo velit'
  }
].sort((a, b) => b.id - a.id);

class MockHttpClient {
  public get(): Observable<Message[]> {
      console.log('yo');
      return of(MESSAGES);
  }
}

describe('MessageTransportService', () => {
  let service: MessageTransportService;
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: HttpClient, useClass: MockHttpClient},
      MessageTransportService
    ]
  }));

  it('should be created', () => {
    service = TestBed.get(MessageTransportService);
    expect(service).toBeTruthy();
  });

  describe('#getMessages', () => {
    it('should return value', (done: DoneFn) => {
      service.getMessages(2, 1).subscribe(messages => {
        expect(messages).not.toBe(null);
        expect(messages).not.toBe(undefined);
        done();
      });
    });

    it('should return correct value for page 0', (done: DoneFn) => {
      service.getMessages(2, 0).subscribe(messages => {
        expect(messages[0]).toEqual(MESSAGES[0]);
        expect(messages[1]).toEqual(MESSAGES[1]);
        done();
      });
    });

    it('should return correct value for page 1', (done: DoneFn) => {
      service.getMessages(2, 1).subscribe(messages => {
        expect(messages[0]).toEqual(MESSAGES[2]);
        expect(messages[1]).toEqual(MESSAGES[3]);
        done();
      });
    });
  });

});
