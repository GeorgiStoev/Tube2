import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCreateComponent } from '../../components/videos/video-create/video-create.component';
import { VideoListComponent } from '../../components/videos/video-list/video-list.component';
import { VideoComponent } from '../../components/videos/video/video.component';
import { VideoWatchComponent } from '../../components/videos/video-watch/video-watch.component';
import { VideoFavouritesComponent } from '../../components/videos/video-favourites/video-favourites.component';
import { VideoEditComponent } from '../../components/videos/video-edit/video-edit.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';


@NgModule({
  declarations: [
    VideoCreateComponent,
    VideoListComponent,
    VideoComponent,
    VideoWatchComponent,
    VideoFavouritesComponent,
    VideoEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  exports: [
    VideoCreateComponent,
    VideoListComponent,
    VideoComponent,
    VideoWatchComponent,
    VideoFavouritesComponent,
    VideoEditComponent
  ]
})
export class VideoModule { }
