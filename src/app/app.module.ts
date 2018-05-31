import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { MatSidenavModule, MatListModule, MatDividerModule, MatGridListModule, MatIconModule, MatToolbarModule, MatButtonModule, MatInputModule, MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { AppComponent } from './app.component';
import { GamesApiService } from './services/games-api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GameListComponent } from './game-list/game-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RouterModule } from '@angular/router';
import { Auth0ApiService } from './services/auth0-api.service';
import { CallbackComponent } from './callback/callback.component';
import { BacklogComponent } from './backlog/backlog.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    NavigationComponent,
    CallbackComponent,
    ToolbarComponent,
    BacklogComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatListModule,
    MatGridListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot([
      { path: 'browse', component: GameListComponent },
      { path: 'backlog', component: BacklogComponent },
      { path: '', redirectTo: 'browse', pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent },
      { path: 'callback', component: CallbackComponent },
      { path: '**', redirectTo: '' }

    ])
  ],
  providers: [GamesApiService, Auth0ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
