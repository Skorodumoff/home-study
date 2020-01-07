import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageListLayoutComponent } from './message-list-layout.component';

describe('MessageListLayoutComponent', () => {
  let component: MessageListLayoutComponent;
  let fixture: ComponentFixture<MessageListLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageListLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageListLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
