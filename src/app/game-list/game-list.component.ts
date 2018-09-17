import { Component, OnInit } from '@angular/core';
import { GamesApiService } from '../services/games-api.service';
import { IGame } from '../models/igame';
import { User } from '../models/Users';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games: IGame[];
  fGames: IGame[];
  currentUser: User;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    if (this.listFilter) {
      this.fGames = this.filterGames(this.listFilter);
    } else {
      this.fGames = this.games;
    }
  }

  constructor(private _gameService: GamesApiService) { }

  ngOnInit() {
    this.getGames();
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  getGames(): void {
    this._gameService.getGames().subscribe(res => {
      this.games = res;
    });
  }

  filterGames(searchTerm: string): IGame[] {
    searchTerm = searchTerm.toLocaleLowerCase();
    return this.games.filter((game: IGame) => game.title.toLocaleLowerCase().indexOf(searchTerm) !== -1);
  }

  addGameToBacklog(id): void {
    console.log(id);
    if (this.currentUser) {
      alert(this.currentUser.nickname);
    }
  }
}
