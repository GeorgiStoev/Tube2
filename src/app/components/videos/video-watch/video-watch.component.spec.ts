import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoWatchComponent } from './video-watch.component';

describe('VideoWatchComponent', () => {
  let component: VideoWatchComponent;
  let fixture: ComponentFixture<VideoWatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoWatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
