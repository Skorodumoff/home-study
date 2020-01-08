import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PageType} from '../../../core/constants/page-type.enum';
import {Message} from '../../models/message.model';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnChanges {
  @Input() message: Message = null;
  @Output() formSave = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() delete = new EventEmitter();

  private form = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
  });

  constructor() {
  }

  ngOnChanges() {
    if (this.message !== null) {
      this.form.setValue({
        title: this.message.title,
        body: this.message.body
      });
    }
  }

  saveFormClick() {
    const value = this.form.value;
    this.formSave.emit(value);
  }

  deleteMessageClick() {
    this.delete.emit();
  }

  cancelClick() {
    this.cancel.emit();
  }
}
