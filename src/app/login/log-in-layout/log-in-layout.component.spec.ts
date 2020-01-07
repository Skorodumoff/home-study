import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInLayoutComponent } from './log-in-layout.component';

describe('LogInLayoutComponent', () => {
  let component: LogInLayoutComponent;
  let fixture: ComponentFixture<LogInLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogInLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
