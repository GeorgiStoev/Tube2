import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { VideoService } from './core/services/video/video.service';
import { AuthService } from './core/services/auth/auth.service';
import { AuthGuard } from './core/guards/auth-guard.service';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { CommonModule } from '@angular/common';
import { AuthModule } from './modules/auth-module/auth.module';
import { SharedModule } from './modules/shared-module/shared.module';
import { HomeComponent } from './components/home/home.component';
import { VideoModule } from './modules/video-module/video.module';
import { FirebaseModule } from './modules/firebase-module/firebase.module';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AuthModule,
    SharedModule,
    VideoModule,
    FirebaseModule,
    ToastrModule.forRoot({timeOut: 2500, preventDuplicates: true}),
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    VideoService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
