// @angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; // <-- NgModel lives here
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { RouterModule, Routes } from '@angular/router';

// @bootstrap imports
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// component imports
import { AppComponent } from './app.component';
import { AuthComponent } from './core/auth/auth.component';
import { LoadingSpinnerComponent } from '../app/shared/loading-spinner/loading-spinner.component';
import { SplashComponent } from './modules/home/splash/splash.component';
import { NavbarComponent } from './core/header/navbar/navbar.component';
import { GameReviewComponent } from './modules/game-review/game-review/game-review.component';

// service imports
import { GameSearch } from './game-search.service';
import { GameReview } from './game-review.service';

// directive imports



const appRoutes: Routes = [
  { path: '', 
  component: SplashComponent },
  { path: 'review/:gameid', 
  component: GameReviewComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    SplashComponent,
    NavbarComponent,
    GameReviewComponent,
  ],
  entryComponents:[
    GameReviewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
  ],
  exports: [
    GameReviewComponent,
  ],
  providers: [
    HttpClient,
    GameSearch,
    GameReview,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
