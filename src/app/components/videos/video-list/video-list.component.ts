import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../../core/services/video/video.service';
import { Video } from '../../../models/video';
import { DomSanitizer } from '@angular/platform-browser';

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
    private videoService: VideoService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {

    this.getNews();
    this.getMusic();
    this.getSport();
  }

  getNews() {
    this.videoService.listNews()
      .subscribe(actionArray => {
        this.news = actionArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as Video
        })
      });
  }

  getMusic() {
    this.videoService.listMusic()
      .subscribe(actionArray => {
        this.music = actionArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as Video
        })
      });
  }

  getSport() {
    this.videoService.listSport()
      .subscribe(actionArray => {
        this.sport = actionArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as Video
        })
      });
  }
}