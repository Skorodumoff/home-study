import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PageType} from '../../../core/constants/page-type.enum';
import {Message} from '../../models/message.model';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnChanges, OnInit {
  @Input() message: Message = null;
  @Input() pageType: PageType;
  @Output() formSave = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() formTouched = new EventEmitter();

  private form = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(200)]
    }),
    body: new FormControl('',
      {
        validators: [Validators.required, Validators.maxLength(2000)]
      }),
  });

  constructor() {
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(take(1)).subscribe(() => {
      this.formTouched.emit();
    });
  }

  ngOnChanges() {
    this.initFormValue();
  }

  initFormValue() {
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
    if (this.pageType === PageType.CreateMessage) {
      this.form.reset();
    } else {
      this.initFormValue();
    }
  }

  showDeleteBtn() {
    return this.pageType === PageType.EditMessage;
  }
}
