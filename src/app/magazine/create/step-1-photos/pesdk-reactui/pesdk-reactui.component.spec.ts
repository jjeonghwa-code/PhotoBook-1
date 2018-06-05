import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesdkReactuiComponent } from './pesdk-reactui.component';

describe('PesdkReactuiComponent', () => {
  let component: PesdkReactuiComponent;
  let fixture: ComponentFixture<PesdkReactuiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesdkReactuiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesdkReactuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
