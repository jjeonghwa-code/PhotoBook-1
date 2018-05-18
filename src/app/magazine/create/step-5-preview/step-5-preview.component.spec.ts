import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step5PreviewComponent } from './step-5-preview.component';

describe('Step5PreviewComponent', () => {
  let component: Step5PreviewComponent;
  let fixture: ComponentFixture<Step5PreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step5PreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step5PreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
