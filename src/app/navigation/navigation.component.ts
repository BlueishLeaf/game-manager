import { Component, OnInit } from '@angular/core';
import { Auth0ApiService } from '../services/auth0-api.service';
import { IUser } from '../models/iuser';
import { IProfile } from '../models/iprofile';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  profile: any;
  user: IUser;

  constructor(public AuthService: Auth0ApiService) { }

  ngOnInit() {
  }

  login(): void {
    this.AuthService.login();
  }

  logout(): void {
    this.AuthService.logout();
  }

}
