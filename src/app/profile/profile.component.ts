import { Component, OnInit, EventEmitter, Output, OnChanges } from '@angular/core';
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
  userProfile: User;

  constructor(public AuthService: Auth0ApiService, private _gamesService: GamesApiService) {
   }

  ngOnInit() {
    this.userProfile = JSON.parse(sessionStorage.getItem('currentUser'));
  }
}
