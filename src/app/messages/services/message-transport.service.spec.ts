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
    return of(MESSAGES);
  }
}

describe('MessageTransportService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: HttpClient, useClass: MockHttpClient},
      MessageTransportService
    ]
  }));

  it('should be created', () => {
    const service = TestBed.get(MessageTransportService);
    expect(service).toBeTruthy();
  });

  describe('#getMessages', () => {
    let service: MessageTransportService;
    beforeAll(() => {
       service = TestBed.get(MessageTransportService);
    });


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

  describe('#getStoredMessages', () => {
    let service: MessageTransportService;
    beforeAll(() => {
      service = TestBed.get(MessageTransportService);
    });

    it('should return empty array if #getMessages wasn\'t called yet', () => {
      expect(service.getStoredMessages()).toEqual([]);
    });

    it('should return all stored messages if #getMessages was called', (done: DoneFn) => {
      service.getMessages(2, 0).subscribe(() => {
        expect(service.getStoredMessages()).toEqual(MESSAGES);
        done();
      });
    });
  });

  describe('#getMessage', () => {
    let service: MessageTransportService;
    beforeAll(() => {
      service = TestBed.get(MessageTransportService);
    });

    it('should return correct message object', (done: DoneFn) => {
      const id = 1;
      const message = MESSAGES.find(m => m.id === id);

      service.getMessage(id).subscribe(result => {
        expect(result).toEqual(message);
        done();
      });
    });

    it('should return undefined if message not found', (done: DoneFn) => {
      service.getMessage(1000).subscribe(result => {
        expect(result).toEqual(undefined);
        done();
      });
    });
  });

  describe('#addMessage', () => {
    let service: MessageTransportService;
    beforeAll((done: DoneFn) => {
      service = TestBed.get(MessageTransportService);
      service.getMessages(2, 0).subscribe(() => {
        done();
      });
    });

    const message: Message = {
      title: 'foo',
      body: 'bar',
      userId: 1
    };
    const maxId = 4;

    it('should return added message with correct id', (done: DoneFn) => {
      service.addMessage(message).subscribe((result) => {
        expect(result.title).toEqual(message.title);
        expect(result.body).toEqual(message.body);
        expect(result.userId).toEqual(message.userId);
        expect(result.id).toEqual(maxId + 1);

        done();
      });
    });

    it('should store added message in service state', () => {
      expect(service.getStoredMessages()[0]).toEqual({
        ...message,
        id: maxId + 1
      });
    });
  });

  describe('#updateMessage', () => {
    let service: MessageTransportService;
    beforeAll((done: DoneFn) => {
      service = TestBed.get(MessageTransportService);
      service.getMessages(2, 0).subscribe(() => {
        done();
      });
    });

    const message: Message = {
      title: 'foo',
      body: 'bar',
      userId: 1,
      id: 1
    };


    it('should return added updated with correct id', (done: DoneFn) => {
      service.updateMessage(message).subscribe((result) => {
        expect(result).toEqual(message);
        done();
      });
    });

    it('should update message in service state', () => {
      expect(service.getStoredMessages().find(m => m.id === message.id)).toEqual(message);
    });
  });

  describe('#deleteMessage', () => {
    let service: MessageTransportService;
    beforeAll((done: DoneFn) => {
      service = TestBed.get(MessageTransportService);
      service.getMessages(2, 0).subscribe(() => {
        done();
      });
    });

    const messageId = 1;

    it('should return empty object', (done: DoneFn) => {
      service.deleteMessage(messageId).subscribe((result) => {
        expect(result).toEqual({});
        done();
      });
    });

    it('should delete message from service state', () => {
      expect(service.getStoredMessages().find(m => m.id === messageId)).toEqual(undefined);
    });
  });
});
