import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGame } from '../models/IGame';
import { IProfile } from '../models/iprofile';

@Injectable({
  providedIn: 'root'
})
export class GamesApiService {
  private _getGamesUrl = 'http://localhost/api/getGames/';
  private _insertUserUrl = 'http://localhost/api/insertUser/';

  constructor(private _http: HttpClient) { }

  getGames(): Observable<IGame[]> {
    return this._http.get<IGame[]>(this._getGamesUrl);
  }

  insertUser(userObject: IProfile): Observable<IProfile> {
    let encodedData = JSON.stringify(userObject);
    //let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    //let options = new RequestOptions({ headers: headers });
    return this._http.post(encodedData, this._insertUserUrl);
  }

  handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
