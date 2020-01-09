import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
    title: new FormControl('',
      [Validators.required, Validators.maxLength(200)]),
    body: new FormControl('',
      [Validators.required, Validators.maxLength(2000)]),
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

  onSubmit() {
    if (this.form.valid) {
      this.formSave.emit(this.form.value);
    }
  }

  deleteMessageClick() {
    this.delete.emit();
  }

  cancelClick() {
    this.cancel.emit();
  }

}
