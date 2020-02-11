import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoFavouritesComponent } from './video-favourites.component';

describe('VideoFavouritesComponent', () => {
  let component: VideoFavouritesComponent;
  let fixture: ComponentFixture<VideoFavouritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoFavouritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
