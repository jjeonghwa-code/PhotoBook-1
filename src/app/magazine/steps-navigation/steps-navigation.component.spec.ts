import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsNavigationComponent } from './steps-navigation.component';

describe('StepsNavigationComponent', () => {
  let component: StepsNavigationComponent;
  let fixture: ComponentFixture<StepsNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepsNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
