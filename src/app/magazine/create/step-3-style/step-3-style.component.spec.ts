import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step3StyleComponent } from './step-3-style.component';

describe('Step3StyleComponent', () => {
  let component: Step3StyleComponent;
  let fixture: ComponentFixture<Step3StyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step3StyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step3StyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
