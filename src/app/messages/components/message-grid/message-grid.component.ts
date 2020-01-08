import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../models/message.model';

@Component({
  selector: 'app-message-grid',
  templateUrl: './message-grid.component.html',
  styleUrls: ['./message-grid.component.scss']
})
export class MessageGridComponent implements OnInit {
  @Input() messages: Message[];
  constructor() { }

  ngOnInit() {
  }

}
