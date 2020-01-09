import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Message} from '../../models/message.model';
import {User} from '../../../core/models/user.model';

@Component({
  selector: 'app-message-grid',
  templateUrl: './message-grid.component.html',
  styleUrls: ['./message-grid.component.scss']
})
export class MessageGridComponent implements OnInit {
  @Input() messages: Message[] = null;
  @Input() user: User;
  @Output() editMessage = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  openWebsite(website: string) {
    if (website.indexOf('http://') > -1 || website.indexOf('https://') > -1) {
      window.open(website);
    } else {
      window.open(`http://${website}`);
    }
  }

  canEdit(message) {
    return this.user.id === message.user.id;
  }

  editMessageClick(message: Message) {
    if (this.canEdit(message)) {
      this.editMessage.emit(message.id);
    }
  }
}
