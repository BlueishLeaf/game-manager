import { Component } from '@angular/core';
import { Auth0ApiService } from './services/auth0-api.service';
import { IUserData, User } from './models/Users';
import { GamesApiService } from './services/games-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userData: IUserData;
  userProfile: User;

  constructor(public AuthService: Auth0ApiService, private _gamesService: GamesApiService) {
    AuthService.handleAuthentication();
  }
}
