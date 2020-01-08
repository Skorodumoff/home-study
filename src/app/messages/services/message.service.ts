import {Injectable} from '@angular/core';
import {Message} from '../models/message.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {forkJoin, Observable, of, Subscriber} from 'rxjs';
import {UserService} from '../../core/services/user.service';
import {User} from '../../core/models/user.model';
import {PagingState} from '../models/paging-state';

@Injectable()
export class MessageService {
  private pageMessages$: Observable<Message[]> = new Observable<Message[]>(subscriber => {
    this.messagesSubscriber = subscriber;
  });

  private pagingState$: Observable<PagingState> = new Observable<PagingState>(subscriber => {
    this.pagingStateSubscriber = subscriber;
  });

  private messagesSubscriber: Subscriber<Message[]>;
  private pagingStateSubscriber: Subscriber<PagingState>;

  // state
  private allMessages: Message[] = null;
  private pagingState: PagingState = {
    pageSize: 10,
    currentPage: 0,
    forwardIsAllowed: true,
    backwardIsAllowed: false
  };

  constructor(private client: HttpClient, private userService: UserService) {
  }

  // commands
  public navigateToPage(page: number): void {
    if (this.allMessages === null) {
      forkJoin([this.loadMessages(), this.userService.loadUsers()]).subscribe(
        ([messages, users]) => {
          const sortedMessages = this.sortMessagesById(messages);
          const messagesWithUserData = this.joinWithUserData(sortedMessages, users);
          this.allMessages = messagesWithUserData;
          this.pagingState = this.getUpdatedPagingState(page);
          this.emitPage();

          console.log('SLOW');
          console.log(this.allMessages);
        });
    } else {
        console.log('FAST');
        console.log(this.allMessages);

        this.pagingState = this.getUpdatedPagingState(page);
        this.emitPage();
    }
  }

  public setUpPageSize(pageSize: number) {
    this.pagingState = {
      ...this.pagingState,
      pageSize
    };
  }

  public navigateForward(): void {
    this.navigateToPage(this.pagingState.currentPage + 1);
  }

  public navigateBack(): void {
    if (this.pagingState.currentPage > 0) {
      this.navigateToPage(this.pagingState.currentPage - 1);
    }
  }

  private emitPage(): void {
    const pageMessages = this.getMessagesForPage();
    console.log('page messages');
    console.log(pageMessages);

    this.messagesSubscriber.next(pageMessages);
    this.pagingStateSubscriber.next(this.pagingState);
  }

  // queries
  public getCurrentPageMessages(): Observable<Message[]> {
    return this.pageMessages$;
  }

  public getPagingState(): Observable<PagingState> {
    return this.pagingState$;
  }

  private loadMessages(): Observable<Message[]> {
    return this.client.get<Message[]>(`${environment.api_url}/posts`);
  }

  // helpers
  private sortMessagesById(messages: Message[]): Message[] {
    return messages.sort((a, b) => a.id - b.id);
  }

  private joinWithUserData(messages: Message[], users: User[]) {
    return messages.map(message => ({
      ...message,
      user: users.find(user => user.id === message.userId)
    }));
  }

  private getUpdatedPagingState(newPage: number): PagingState {
    return {
      ...this.pagingState,
      currentPage: newPage,
      forwardIsAllowed: this.allMessages.length - this.pagingState.pageSize * (newPage + 1) > 0,
      backwardIsAllowed: this.allMessages.length > 0 && newPage > 0
    };
  }

  private getMessagesForPage(): Message[] {
    const start = this.pagingState.currentPage * this.pagingState.pageSize;
    const end = start + this.pagingState.pageSize;
    return this.allMessages.slice(start, end);
  }
}
