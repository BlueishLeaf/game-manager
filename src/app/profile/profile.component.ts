import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/iuser';
import { Auth0ApiService } from '../services/auth0-api.service';
import { IProfile } from '../models/iprofile';
import { GamesApiService } from '../services/games-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: IProfile

  constructor(public AuthService: Auth0ApiService, private _gamesService: GamesApiService) { }

  ngOnInit() {
    this.AuthService.getProfile().subscribe(res => {
      this.user = res;
      this._gamesService.insertUser(this.user).subscribe(res => {
        console.log(res);
      });
    });
  }

}
