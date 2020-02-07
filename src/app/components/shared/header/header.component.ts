import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.isAuthChanged
      .subscribe((data) => {
        this.isAuth = data;
      });
  }
  
  logout() {
    this.authService.signOut();
  }
}
