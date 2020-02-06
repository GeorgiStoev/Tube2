import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { User } from '../../../models/user';

@Injectable()
export class AuthService {

  private _isAuth: boolean;

  isAuthChanged = new Subject<boolean>();

  constructor(
    private dbAuth: AngularFireAuth,
    private afDb: AngularFirestore,
    private router: Router
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
        this.router.navigate([ '/' ]);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  signin(email: string, password: string) {
    this.dbAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then((data) => {
          this.router.navigate([ '/' ]);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
  }

  signOut() {
    this.dbAuth.auth.signOut();
    this.router.navigate([ '/signin' ]);
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