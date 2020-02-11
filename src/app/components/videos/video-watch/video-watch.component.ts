import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/core/services/video/video.service';
import { Video } from 'src/app/models/video';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-watch',
  templateUrl: './video-watch.component.html',
  styleUrls: ['./video-watch.component.scss']
})
export class VideoWatchComponent implements OnInit {

  video: any;
  videoUrl: any;
  isMy: boolean;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    
    this.getVideo();
    

  }

  getVideo() {
    this.route.params.subscribe((data) => {
      let id = data['id'];
      this.videoService.getVideoById(id)
      .subscribe((video) => {
        this.video = video,
        this.videoUrl = this.transform(this.video.videoUrl);
        this.isMy = this.videoService.isMy(this.video.uploaderId);
      });
    });
  }

  transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url.replace('watch?v=', 'embed/'));
  }
}
