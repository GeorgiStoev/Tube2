import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/core/services/video/video.service';
import { Video } from 'src/app/models/video';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-video-watch',
  templateUrl: './video-watch.component.html',
  styleUrls: ['./video-watch.component.scss']
})
export class VideoWatchComponent implements OnInit {

  video: any;
  videoUrl: any;
  isMy: boolean;
  uploaderPicUrl: string;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private authService: AuthService,
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
        this.authService.getUser(this.video.uploaderId).subscribe((data) => {
        this.uploaderPicUrl = data[0].imageUrl;
        })
      });
    });
  }

  addToFavourites() {
    this.route.params.subscribe((data) => {
      let id = data['id'];
      this.authService.getUser(this.authService.getUserId()).subscribe((data) => {
        if(!data[0].favourites.includes(id))
          {
            data[0].favourites.push(id);
            return this.authService.updateUser(data[0]).then(a => console.log(a));
          }
    });
  });
  }

  delete() {
    this.route.params.subscribe((data) => {
      let id = data['id'];
      this.videoService.delete(id);
    })
  }

  transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url.replace('watch?v=', 'embed/'));
  }
}
