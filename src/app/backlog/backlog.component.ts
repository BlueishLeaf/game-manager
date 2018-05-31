import { Component, OnInit } from '@angular/core';
import { User } from '../models/Users';
import { GamesApiService } from '../services/games-api.service';
import { IGame } from '../models/igame';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {
  userProfile: User;
  backlogGames: IGame[];
  backlogExists: boolean;

  constructor(private _gamesService: GamesApiService) { }

  ngOnInit() {
    this.userProfile = JSON.parse(sessionStorage.getItem('currentUser'));
    this.getBacklog();
  }

  getBacklog(): void {
    const gameIds = this.userProfile.backlog;
    if (!(gameIds.length > 0)) {
      this.backlogExists = false;
    } else {
      this.backlogExists = true;
      this._gamesService.getBacklog(gameIds).subscribe(data => {
        this.backlogGames = data;
      });
    }
  }

}
