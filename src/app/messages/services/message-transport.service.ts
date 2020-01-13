import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Message} from '../models/message.model';
import {environment} from '../../../environments/environment';
import {find, map, share, take, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable()
export class MessageTransportService {
  private allMessages: Message[] = null;

  constructor(private httpClient: HttpClient) {
  }

  private loadAllMessages() {
    return this.httpClient.get<Message[]>(`${environment.api_url}/posts`)
      .pipe(
        tap(messages => this.storeMessagesLocally(messages)),
        share()
      );
  }

  public getAllMessages(): Message[] {
    return this.allMessages !== null ? this.allMessages : [];
  }

  public getMessages(pageSize: number, page: number): Observable<Message[]> {
    if (this.allMessages === null) {
      return this.loadAllMessages().pipe(
        map(messages => this.getMessagesForPage(pageSize, page, messages))
      );
    }

    return of(this.getMessagesForPage(pageSize, page, this.allMessages));
  }

  public getMessage(id: number): Observable<Message> {
    if (this.allMessages === null) {
      return this.loadAllMessages().pipe(
        map(messages => messages.find(message => message.id === id))
      );
    }

    return of(this.allMessages.find(message => message.id === id));
  }

  public addMessage(message: Message): Observable<Message> {
    return of({}).pipe(
      map(() => {
        const addedMessage = this.addMessageLocally(message);
        return addedMessage;
      })
    );
  }

  public updateMessage(message: Message): Observable<Message> {
    return of(message).pipe(
      tap(() => this.updateMessageLocally(message))
    );
  }

  public deleteMessage(messageId: number): Observable<{}> {
    return of({}).pipe(
      tap(() => this.deleteMessageLocally(messageId))
    );
  }

  private storeMessagesLocally(messages: Message[]) {
    this.allMessages = this.sortMessagesById(messages);
  }

  private updateMessageLocally(message) {
    this.allMessages = this.allMessages.map(oldMessage => oldMessage.id === message.id ? message : oldMessage);
  }

  private addMessageLocally(message) {
    const maxId = Math.max(...this.allMessages.map(m => m.id));
    const newMessage = {
      ...message,
      id: maxId
    };

    this.allMessages = [newMessage, ...this.allMessages];

    return newMessage;
  }

  private deleteMessageLocally(messageId) {
    this.allMessages = this.allMessages.filter(message => message.id !== messageId);
  }

  private getMessagesForPage(pageSize: number, page: number, messages): Message[] {
    const start = page * pageSize;
    const end = start + pageSize;
    return messages.slice(start, end);
  }

  private sortMessagesById(messages: Message[]): Message[] {
    return messages.sort((a, b) => b.id - a.id);
  }

}
