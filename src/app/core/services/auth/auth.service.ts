import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { User } from '../../../models/user';
import { ToastrService } from 'ngx-toastr';
import { ToastrConfig } from '../../../models/toatsr.config';
import { VideoService } from '../video/video.service';

@Injectable()
export class AuthService {

  public _isAuth: boolean;

  isAuthChanged = new Subject<boolean>();

  constructor(
    private dbAuth: AngularFireAuth,
    private afDb: AngularFirestore,
    private router: Router,
    private toastr: ToastrService,
    private videoService: VideoService
  ) {}

  initializeAuthState() {
   this.dbAuth.authState.subscribe((userData) => {
    if (userData) {
      this._isAuth = true;
      this.isAuthChanged.next(true);
    } else {
      this._isAuth = false;
      this.isAuthChanged.next(false);
    }
   });
  }

  signup(email: string, firstName:string, lastName: string, imageUrl: string, password: string) {
   this.dbAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        this.pushUserData({ email, firstName, lastName, imageUrl });
        this.toastr.success("Successfully registered!", "Success", ToastrConfig);
        this.router.navigate([ '/' ]);
      })
      .catch((err) => {
        this.toastr.error(err, "Error", ToastrConfig);
      });
  }

  signin(email: string, password: string) {
    this.dbAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then((data) => {
          this.toastr.success("Successfully logged in!", "Success", ToastrConfig);
          this.router.navigate([ '/' ]);
        })
        .catch((err) => {
          this.toastr.error(err, "Error", ToastrConfig);
        });
  }

  signOut() {
    this.dbAuth.auth.signOut()
    .then(() => {
      this.toastr.success("Successfully logged out!", "Success", ToastrConfig);
      this.router.navigate([ '/signin' ]);
    })
    .catch(err => {
      this.toastr.error(err, "Error", ToastrConfig);
    });
  }

  getToken() {
    let token = localStorage.getItem('token');
    return token;
  }

  private pushUserData(user) {
    user.uid = this.getUserId();

    return this.afDb.collection<User>('users').add({
      uid: user.uid,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      imageUrl: user.imageUrl
    });
  }

  getUserId() {
    return this.dbAuth.auth.currentUser ? this.dbAuth.auth.currentUser.uid : "";
  }

  isAuth(): boolean {
    return this._isAuth;
  }
}