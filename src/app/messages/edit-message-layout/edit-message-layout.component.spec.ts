import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMessageLayoutComponent } from './edit-message-layout.component';

describe('EditMessageLayoutComponent', () => {
  let component: EditMessageLayoutComponent;
  let fixture: ComponentFixture<EditMessageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMessageLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMessageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
