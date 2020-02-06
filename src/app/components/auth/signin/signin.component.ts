import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    
  }

  signIn(formData) {
    const email = formData.value.email;
    const password = formData.value.password;
    
    this.authService.signin(email, password);
  }
}
