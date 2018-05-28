import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGame } from '../game-model/IGame';

@Injectable({
  providedIn: 'root'
})
export class GamesApiService {
  private _url = 'http://localhost/api/getGames/';

  constructor(private _http: HttpClient) { }

  getGames(): Observable<IGame[]> {
    return this._http.get<IGame[]>(this._url);
  }

  handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
