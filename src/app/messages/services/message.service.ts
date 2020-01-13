import {Injectable} from '@angular/core';
import {Message} from '../models/message.model';
import {BehaviorSubject, combineLatest, forkJoin, Observable, of, Subscriber, zip} from 'rxjs';
import {UserService} from '../../core/services/user.service';
import {User} from '../../core/models/user.model';
import {PagingState} from '../models/paging-state';
import {MessageTransportService} from './message-transport.service';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class MessageService {
  private pagingState: PagingState = {
    pageSize: 10,
    currentPage: 0,
    forwardIsAllowed: true,
    backwardIsAllowed: false
  };

  private pageMessages$ = new BehaviorSubject<Message[]>([]);
  private pagingState$ = new BehaviorSubject<PagingState>(this.pagingState);

  constructor(private userService: UserService, private messageTransportService: MessageTransportService) {
  }

  public getMessages(): Observable<Message[]> {
    return combineLatest([this.pageMessages$, this.userService.getAllUsers()]).pipe(
      map(([messages, users]) => this.joinWithUserData(messages, users))
    );
  }

  public getPagingState(): Observable<PagingState> {
    return this.pagingState$;
  }

  public navigateToPage(page: number): void {
    this.messageTransportService.getMessages(this.pagingState.pageSize, page).subscribe(
      messages => {
        this.pagingState = this.getUpdatedPagingState(page);

        this.pageMessages$.next(messages);
        this.pagingState$.next(this.pagingState);
      }
    );
  }

  public setUpPageSize(pageSize: number): void {
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
      forwardIsAllowed: this.messageTransportService.getAllMessages().length
        - this.pagingState.pageSize * (newPage + 1) > 0,
      backwardIsAllowed: this.messageTransportService.getAllMessages().length > 0 && newPage > 0
    };
  }

  public getMessage(id: number) {
    return this.messageTransportService.getMessage(id);
  }

  public createMessage(message: Message) {
    return this.messageTransportService.addMessage({
      ...message,
      userId: this.userService.getCurrentUser().value.id
    });
  }

  public updateMessage(message: Message) {
    return this.messageTransportService.updateMessage({
      ...message,
      userId: this.userService.getCurrentUser().value.id
    });
  }

  public deleteMessage(id: number) {
    return this.messageTransportService.deleteMessage(id);
  }
}
