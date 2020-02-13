import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { VideoService } from 'src/app/core/services/video/video.service';
import { Video } from 'src/app/models/video';

@Component({
  selector: 'app-video-favourites',
  templateUrl: './video-favourites.component.html',
  styleUrls: ['./video-favourites.component.scss']
})
export class VideoFavouritesComponent implements OnInit {

  video: any;
  favourites = new Array();

  constructor(
    private authService: AuthService,
    private videoService: VideoService
  ) { }

  ngOnInit() {
    this.getFavourites(this.authService.getUserId());
  }

  getFavourites(id: string) {

    this.authService.getUser(id).subscribe(data => {
    this.getVideos(data[0].favourites);
    });
  }

  getVideos(ids: Array<string>){
    for (const videoId of ids) {
      this.videoService.getVideoById(videoId).subscribe(video => {
        this.video = video;
        if(this.video) {
          this.video.id = videoId;
          this.favourites.push(this.video);
        }
      });
    }
  }
}
