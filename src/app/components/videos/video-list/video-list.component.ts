import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../../core/services/video/video.service';
import { Video } from '../../../models/video';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {

  news: Video[];
  music: Video[];
  sport: Video[];

  constructor(
    private videoService: VideoService
  ) { }

  ngOnInit() {
    this.loadNews();
    this.loadMusic();
    this.loadSport();
  }

  loadNews() {
    this.videoService.listByCategory('News')
      .subscribe((data) => {
        this.news = data;
      });
  }

  loadMusic() {
    this.videoService.listByCategory('Music')
      .subscribe((data) => {
        this.music = data;
      });
  }

  loadSport() {
    this.videoService.listByCategory('Sport')
      .subscribe((data) => {
        this.sport = data;
      });
  }
}