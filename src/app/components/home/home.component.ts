import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isAuth: boolean = false;
  isAuthSub: Subscription;
  userFullName: string;

  constructor(
    private authService: AuthService
  ) { }

  get isAuthFromService(){
    return this.authService.isAuth();
  }

  ngOnInit() {

    this.getNames();

    this.isAuthSub = this.authService.isAuthChanged.subscribe((data) => {
      this.isAuth = data;
    });

    this.isAuth = this.isAuthFromService;
  }

  getNames() {
    if (this.authService.getUserId()) {
      this.authService.getUser(this.authService.getUserId())
        .subscribe((data) => {
          this.userFullName = data[0].firstName + " " + data[0].lastName;
        });
      }
  }
}