import { Component, OnInit } from '@angular/core';
import { Auth0ApiService } from '../services/auth0-api.service';
import { GamesApiService } from '../services/games-api.service';
import { timer, Observable } from 'rxjs';
import { IUserData, User } from '../models/Users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: IUserData;
  userProfile: User;

  constructor(public AuthService: Auth0ApiService, private _gamesService: GamesApiService) { }

  ngOnInit() {
    this.fetchProfile();
  }

  fetchProfile(): void {
    this.AuthService.getUserData().then(data => {
      this.userData = data;
      this._gamesService.insertUser(this.userData).then(profile => {
        this.userProfile = new User(profile.email, profile.nickname, profile.backlog);
        sessionStorage.setItem('currentUser', JSON.stringify(this.userProfile));
      });
    });
  }
}
