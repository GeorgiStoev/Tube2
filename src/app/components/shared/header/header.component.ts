import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;

  isAuthSub: Subscription;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isAuthSub = this.authService.isAuthChanged.subscribe((data) => {
      
      this.isAuth = data;
    });
  }

  ngOnDestroy() {
    this.isAuthSub.unsubscribe();
  }
  
  logout() {
    this.authService.signOut();
  }
}
