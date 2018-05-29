import { Component } from '@angular/core';
import { Auth0ApiService } from './services/auth0-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(public AuthService: Auth0ApiService) {
    AuthService.handleAuthentication();
  }
}
