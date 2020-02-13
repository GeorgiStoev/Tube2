import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userFullName: string;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getNames();
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
