import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { MatSidenavModule, MatListModule, MatDividerModule, MatGridListModule, MatIconModule, MatToolbarModule, MatButtonModule, MatInputModule, MatCardModule } from '@angular/material';
import { AppComponent } from './app.component';
import { GamesApiService } from './services/games-api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GameListComponent } from './game-list/game-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    NavigationComponent,
    ToolbarComponent
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
    RouterModule.forRoot([
      { path: 'browse', component: GameListComponent },
      { path: '', redirectTo: 'browse', pathMatch: 'full' }

    ])
  ],
  providers: [GamesApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
