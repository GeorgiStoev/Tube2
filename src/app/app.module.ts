import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LandingComponent } from './components/shared/landing/landing.component';
import { HomeComponent } from './components/home/home.component';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { VideoService } from './core/services/video/video.service';
import { AuthService } from './core/services/auth/auth.service';
import { JwtInterceptorService } from './core/services/interceptors/jwt-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { VideoCreateComponent } from './components/videos/video-create/video-create.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    LandingComponent,
    HomeComponent,
    VideoCreateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot({timeOut: 3000, preventDuplicates: true}),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ToastrModule.forRoot(),
    AngularFirestoreModule
  ],
  providers: [
    AuthService,
    VideoService,
    {  provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
