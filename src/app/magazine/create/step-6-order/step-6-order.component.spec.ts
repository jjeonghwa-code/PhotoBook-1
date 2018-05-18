import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step6OrderComponent } from './step-6-order.component';

describe('Step6OrderComponent', () => {
  let component: Step6OrderComponent;
  let fixture: ComponentFixture<Step6OrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step6OrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step6OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
