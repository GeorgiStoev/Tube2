import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {

  private isAuth: boolean;

  isAuthChanged = new Subject<boolean>();

  constructor(
    private dbAuth: AngularFireAuth
  ) {}

  initializeAuthState() {
   this.dbAuth.authState.subscribe((userData) => {
    if (userData) {
      this.isAuth = true;
      this.isAuthChanged.next(true);
    } else {
      this.isAuth = false;
      this.isAuthChanged.next(false);
    }
   });
  }

  signup(email: string, password: string) {
   this.dbAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
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
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
  }

  signOut() {
    this.dbAuth.auth.signOut();
  }
}
