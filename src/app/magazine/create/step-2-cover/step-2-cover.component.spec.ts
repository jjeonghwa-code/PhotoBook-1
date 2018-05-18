import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2CoverComponent } from './step-2-cover.component';

describe('Step2CoverComponent', () => {
  let component: Step2CoverComponent;
  let fixture: ComponentFixture<Step2CoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step2CoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step2CoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
