import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../../../models/video';
import { AuthService } from '../../../core/services/auth/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  @Input('video')
  video: any;
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

  
  transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url.replace('watch?v=', 'embed/'));
  }
}