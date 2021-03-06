import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IGame } from '../models/IGame';
import { IUserData, User } from '../models/Users';

@Injectable({
  providedIn: 'root'
})
export class GamesApiService {
  private _getGamesUrl = 'http://localhost/api/getGames/';
  private _insertUserUrl = 'http://localhost/api/insertUser/';
  private _getBacklogUrl = 'http://localhost/api/getBacklog/';

  constructor(private _http: HttpClient) { }

  getGames(): Observable<IGame[]> {
    return this._http.get<IGame[]>(this._getGamesUrl);
  }

  insertUser(userObject: IUserData): void {
    const encodedData = JSON.stringify({
      'email': userObject.email,
      'nickname': userObject.nickname,
      'backlog': []
    });
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this._http.post<User>( this._insertUserUrl, encodedData, { headers: headers }).subscribe(data => {
      sessionStorage.setItem('currentUser', JSON.stringify(new User( data.email, data.nickname, data.backlog)));
    });
  }

  getBacklog(gameIds: string[]): Observable<IGame[]> {
    return this._http.post<IGame[]>(this._getBacklogUrl, gameIds);
  }

  public sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
