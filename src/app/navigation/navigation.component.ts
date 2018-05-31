import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { Auth0ApiService } from '../services/auth0-api.service';
import { User, IUserData } from '../models/Users';
import { GamesApiService } from '../services/games-api.service';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(public AuthService: Auth0ApiService, private _gamesService: GamesApiService) { }

  login(): void {
    this.AuthService.login();
  }

  logout(): void {
    this.AuthService.logout();
  }

}
