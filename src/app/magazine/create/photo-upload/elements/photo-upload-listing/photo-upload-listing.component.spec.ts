import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoUploadListingComponent } from './photo-upload-listing.component';

describe('PhotoUploadListingComponent', () => {
  let component: PhotoUploadListingComponent;
  let fixture: ComponentFixture<PhotoUploadListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoUploadListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoUploadListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
