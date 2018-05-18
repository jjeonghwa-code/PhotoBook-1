import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step4LayoutComponent } from './step-4-layout.component';

describe('Step4LayoutComponent', () => {
  let component: Step4LayoutComponent;
  let fixture: ComponentFixture<Step4LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step4LayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step4LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
