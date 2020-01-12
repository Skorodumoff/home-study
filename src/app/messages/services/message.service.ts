import {Injectable} from '@angular/core';
import {Message} from '../models/message.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, forkJoin, Observable, of, Subscriber} from 'rxjs';
import {UserService} from '../../core/services/user.service';
import {User} from '../../core/models/user.model';
import {PagingState} from '../models/paging-state';

@Injectable()
export class MessageService {
  private allMessages: Message[] = null;
  private pagingState: PagingState = {
    pageSize: 10,
    currentPage: 0,
    forwardIsAllowed: true,
    backwardIsAllowed: false
  };

  private pageMessages$ = new BehaviorSubject<Message[]>(null);
  private pagingState$ = new BehaviorSubject<PagingState>(this.pagingState);

  // state
  constructor(private client: HttpClient, private userService: UserService) {
  }

  // commands
  public init() {
    if (this.allMessages === null) {
      forkJoin([this.loadMessages(), this.userService.loadUsers()]).subscribe(
        // todo move data merge from subscription to pipeline
        ([messages, users]) => {
          const sortedMessages = this.sortMessagesById(messages);
          const messagesWithUserData = this.joinWithUserData(sortedMessages, users);
          this.allMessages = messagesWithUserData;
          this.emitPage();
        });
    }
  }

  public navigateToPage(page: number): void {
    this.pagingState = this.getUpdatedPagingState(page);
    this.emitPage();
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

    this.pageMessages$.next(pageMessages);
    this.pagingState$.next(this.pagingState);
  }

  addMessageLocally(message) {
    const maxId = Math.max(...this.allMessages.map(m => m.id));
    const allUsers = this.userService.getAllUsers();

    const user = allUsers.find(u => u.id === this.userService.getCurrentUser().value.id);

    const newMessage = {
      ...message,
      id: maxId + 1,
      user,
      userId: user.id
    };

    this.allMessages = [newMessage, ...this.allMessages];
  }

  updateMessageLocally(message) {
    console.log(message);
    this.allMessages = this.allMessages.map(m => m.id === message.id ? {
      ...m,
      ...message,
    } : m);
  }

  deleteMessageLocally(messageId) {
    this.allMessages = this.allMessages.filter(m => m.id !== messageId);
  }

  createMessage(message) {
    this.addMessageLocally(message);
    return of(message);
  }

  updateMessage(message) {
    this.updateMessageLocally(message);
    return of(message);
  }

  deleteMessage(id) {
    this.deleteMessageLocally(id);
    return of({});
  }

  // queries
  public getCurrentPageMessages(): Observable<Message[]> {
    return this.pageMessages$;
  }

  public getPagingState(): Observable<PagingState> {
    return this.pagingState$;
  }

  public getMessage(messageId: number): Observable<Message> {
    if (this.allMessages !== null) {
      return of(this.allMessages.find(message => message.id === messageId));
    } else {
      return this.client.get<Message>(`${environment.api_url}/posts/${messageId}`);
    }
  }

  private loadMessages(): Observable<Message[]> {
    return this.client.get<Message[]>(`${environment.api_url}/posts`);
  }

  // helpers
  private sortMessagesById(messages: Message[]): Message[] {
    return messages.sort((a, b) => b.id - a.id);
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
