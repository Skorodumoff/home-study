import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Message} from '../../models/message.model';

@Component({
  selector: 'app-message-grid',
  templateUrl: './message-grid.component.html',
  styleUrls: ['./message-grid.component.scss']
})
export class MessageGridComponent implements OnInit {
  @Input() messages: Message[] = null;
  @Output() editMessage = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    console.log(changes);
  }

  openWebsite(website: string, e: Event) {
    if (website.indexOf('http://') > -1 || website.indexOf('https://') > -1) {
      window.open(website);
    } else {
      window.open(`http://${website}`);
    }
  }

  editMessageClick(messageId: number) {
    this.editMessage.emit(messageId);
  }
}
