import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // name: string;
  // constructor() { }

  // ngOnInit() {
  //   this.name = localStorage.getItem('name');
  // }

   
  isAuth: boolean = false;
  isAuthSub: Subscription;
  constructor(
    private authService: AuthService
  ) { }

  get isAuthFromService(){
    return this.authService.isAuth();
  }

  ngOnInit() {
    this.isAuthSub = this.authService.isAuthChanged.subscribe((data) => {
      this.isAuth = data;
    });
    this.isAuth = this.isAuthFromService;
  }

  ngOnDestroy() {
    this.isAuthSub.unsubscribe();
  }
}
