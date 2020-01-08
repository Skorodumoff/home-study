import {Injectable} from '@angular/core';
import {Message} from '../models/message.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map, take, tap} from 'rxjs/operators';
import {Observable, of, Subscriber} from 'rxjs';

@Injectable()
export class MessageService {
  private pageMessages: Observable<Message[]> = new Observable<Message[]>(subscriber => {
    this.subscriber = subscriber;
  });
  private subscriber: Subscriber<Message[]>;

  // state
  private allMessages: Message[] = null;
  private pageSize = 10;
  private currentPage = 0;

  constructor(private client: HttpClient) {
  }

  // commands
  public navigateToPage(page: number): void {
    this.currentPage = page;

    if (this.allMessages === null) {
      this.loadMessages().pipe(take(1)).subscribe(messages => {
        this.allMessages = this.sortMessagesById(messages);
        this.emitPage();
      });
    } else {
      this.emitPage();
    }
  }

  public navigateForward(): void {
    this.navigateToPage(this.currentPage + 1);
  }

  public navigateBack(): void {
    if (this.currentPage > 0) {
      this.navigateToPage(this.currentPage - 1);
    }
  }

  private emitPage(): void {
    const pageMessages = this.getMessagesForPage(this.allMessages, this.pageSize, this.currentPage);
    this.subscriber.next(pageMessages);
  }

  // queries
  public getCurrentPageMessages(): Observable<Message[]> {
    return this.pageMessages;
  }

  private loadMessages(): Observable<Message[]> {
    return this.client.get<Message[]>(`${environment.api_url}/posts`);
  }

  // helpers
  private sortMessagesById(messages: Message[]): Message[] {
    return messages.sort((a, b) => a.id - b.id);
  }

  private getMessagesForPage(messages: Message[], pageSize: number, pageNumber: number): Message[] {
    const start = pageNumber * pageSize;
    const end = start + pageSize;
    return messages.slice(start, end);
  }
}