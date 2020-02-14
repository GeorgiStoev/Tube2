import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from '../../components/auth/signin/signin.component';
import { SignupComponent } from '../../components/auth/signup/signup.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SigninComponent,
    SignupComponent
  ]
})
export class AuthModule { }
