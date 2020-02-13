import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  id: string;
  user: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((data) => {
      this.id = data['id'];
      this.authService.getUser(this.id).subscribe((data) => {
        this.user = data[0];
      })
    });
  }

}
