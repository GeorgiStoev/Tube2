import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../../core/services/video/video.service';
import { AuthService } from '../../../core/services//auth/auth.service';

@Component({
  selector: 'app-video-create',
  templateUrl: './video-create.component.html',
  styleUrls: ['./video-create.component.scss']
})
export class VideoCreateComponent implements OnInit {

  constructor(
    private videoService: VideoService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  addVideo(formData) {
    const name = formData.value.name;
    const category = formData.value.category;
    const videUrl = formData.value.videoUrl;
    const uploaderId = this.authService.getUserId();
    const date = new Date();
    
    this.videoService.createVideo(name, category, videUrl, uploaderId, date);
  }
}
