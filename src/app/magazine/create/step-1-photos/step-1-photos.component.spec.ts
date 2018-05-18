import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step1PhotosComponent } from './step-1-photos.component';

describe('Step1PhotosComponent', () => {
  let component: Step1PhotosComponent;
  let fixture: ComponentFixture<Step1PhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step1PhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step1PhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
