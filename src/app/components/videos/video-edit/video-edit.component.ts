import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from 'src/app/core/services/video/video.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Video } from 'src/app/models/video';

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.scss']
})
export class VideoEditComponent implements OnInit {

  id: string;
  video: any;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService
  ) { }

  ngOnInit() {
    this.getVideo();
  }

  getVideo() {
    this.route.params.subscribe((data) => {
      this.id = data['id'];
      this.videoService.getVideoById(this.id)
      .subscribe((video) => {
        this.video = video;
      });
    });
  }

  editVideo(formData) {
    this.video.id = this.id;
    this.video.name = formData.value.name;
    this.video.category = formData.value.category;
    this.video.videoUrl = formData.value.videoUrl;
    
    this.videoService.editVideo(this.video);
  }
}
