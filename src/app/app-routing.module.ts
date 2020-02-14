import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { VideoCreateComponent } from './components/videos/video-create/video-create.component';
import { AuthGuard } from './core/guards/auth-guard.service';
import { VideoWatchComponent } from './components/videos/video-watch/video-watch.component';
import { VideoFavouritesComponent } from './components/videos/video-favourites/video-favourites.component';
import { VideoEditComponent } from './components/videos/video-edit/video-edit.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'signup', component: SignupComponent },
  { 
    path: 'video', children: [
      { path: 'create', component: VideoCreateComponent },
      { path: 'watch/:id', component: VideoWatchComponent },
      { path: 'favourites', component: VideoFavouritesComponent },
      { path: 'edit/:id', component: VideoEditComponent },
     ], 
     canActivate: [AuthGuard],
  },
  { path: 'profile/:id', component: UserProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
