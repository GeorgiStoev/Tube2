import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../../../models/video';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  @Input('video')
  video: Video;
  videoUrl: any;
  isAuth: boolean;

  constructor(
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.isAuth = this.authService._isAuth;
    this.videoUrl = this.transform(this.video.videoUrl);
  }

  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url.replace('watch?v=', 'embed/'));
  }
}