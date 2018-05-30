import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/iuser';
import { Auth0ApiService } from '../services/auth0-api.service';
import { IProfile } from '../models/iprofile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: IProfile

  constructor(public AuthService: Auth0ApiService) { }

  ngOnInit() {
    this.AuthService.getProfile().subscribe(res => {
      this.user = res;
    });
  }

}
