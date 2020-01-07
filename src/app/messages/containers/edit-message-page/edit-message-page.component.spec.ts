import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMessagePageComponent } from './edit-message-page.component';

describe('EditMessageLayoutComponent', () => {
  let component: EditMessagePageComponent;
  let fixture: ComponentFixture<EditMessagePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMessagePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMessagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
