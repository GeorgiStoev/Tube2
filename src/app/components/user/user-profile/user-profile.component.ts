import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Video } from 'src/app/models/video';
import { VideoService } from 'src/app/core/services/video/video.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  id: string;
  user: any;
  myVideos: Video[];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private videoService: VideoService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((data) => {
      this.id = data['id'];
      this.authService.getUser(this.id).subscribe((data) => {
        this.user = data[0];
        this.videoService.getVideosByUserId(this.id)
          .subscribe((data) => {
            this.myVideos = data;
          });
      });
    });
  }
}
