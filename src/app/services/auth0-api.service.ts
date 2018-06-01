import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserData } from '../models/Users';
import { GamesApiService } from './games-api.service';

(window as any).global = window;

@Injectable({
  providedIn: 'root'
})
export class Auth0ApiService {
  private _currentAccessToken: string;
  auth0 = new auth0.WebAuth({
    clientID: 'xhgQ3dEVDvItwPYeQfAqh9RkVy4bvpFn',
    domain: 'game-manager.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://game-manager.eu.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/profile',
    scope: 'openid email profile'
  });

  constructor(public router: Router, private _http: HttpClient, private _gamesService: GamesApiService) { }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this._currentAccessToken = authResult.accessToken;
        this.setSession(authResult);
        this.router.navigate(['/browse']);
      } else if (err) {
        this.router.navigate(['/browse']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.getUserData().then(data => {
      this._gamesService.insertUser(data);
    });
  }

  public getUserData(): Promise<IUserData> {
    // await this.sleep(100);
    const url = 'https://game-manager.eu.auth0.com/userinfo?access_token=' + this._currentAccessToken;
    return this._http.get<IUserData>(url).toPromise();
  }

  public sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }
}
