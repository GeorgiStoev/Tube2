import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    
  }

  signUp(formData) {
    const email = formData.value.email;
    const firstName = formData.value.firstName;
    const lastName = formData.value.lastName;
    const imageUrl = formData.value.imageUrl;
    const password = formData.value.passwords.password;
    
    this.authService.signup(email, firstName, lastName, imageUrl, password);
  }
}