import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { AuthService } from '../../../services/auth.service';

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
