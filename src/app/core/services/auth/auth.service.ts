import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { User } from '../../../models/user';
import { ToastrService } from 'ngx-toastr';
import { ToastrConfig } from '../../../models/toatsr.config';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  public _isAuth: boolean;
  isAuthChanged = new Subject<boolean>();
  userFullName: string;

  constructor(
    private dbAuth: AngularFireAuth,
    private afDb: AngularFirestore,
    private router: Router,
    private toastr: ToastrService
  ) {}

  isAuth(): boolean {
    return this._isAuth;
  }

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
        this.pushUserData(email, firstName, lastName, imageUrl);
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

  private pushUserData(email: string, firstName: string, lastName: string, imageUrl: string) {
    const uid = this.getUserId();
      
    return this.afDb.collection<User>('users').add({
      uid: uid,
      firstName: firstName,
      lastName: lastName,
      email: email,
      imageUrl: imageUrl,
      favourites: Array<string>()
    });
  }

  getUserId() {
    return this.dbAuth.auth.currentUser ? this.dbAuth.auth.currentUser.uid : "";
  }

  updateUser(user: any) {
    return this.afDb.collection('users').doc(user.id).set(user)
    .then(() => {
      this.toastr.success("Successfully added to favourites!", "Success", ToastrConfig);
      this.router.navigate([ '/video/favourites' ]);
    })
    .catch(err => {
      this.toastr.error(err, "Error", ToastrConfig);
    });;
  }

  getUser(id: string) {
    const data =  this.afDb.collection<User>('users', ref => ref.where('uid', '==', id));
    return data.snapshotChanges().pipe(
      map(actions => actions.map(
        a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return { id, ...data };
        }
      ))
    );
  }
}