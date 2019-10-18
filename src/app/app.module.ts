// @angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; // <-- NgModel lives here
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

// MDB Imports
import { MDBBootstrapModule } from 'angular-bootstrap-md';


// component imports
import { AppComponent } from './app.component';
import { AuthComponent } from './core/auth/auth.component';
import { LoadingSpinnerComponent } from '../app/shared/loading-spinner/loading-spinner.component';
import { SplashComponent } from './modules/home/splash/splash.component';
import { NavbarComponent } from './core/header/navbar/navbar.component';
import { GameReviewComponent } from './modules/game-review/game-review/game-review.component';
import { GameForumComponent } from './modules/game-forum/game-forum/game-forum.component';


// service imports
import { GameSearch } from './game-search.service';
import { GameReview } from './game-review.service';
import { AuthService } from './core/auth/auth.service';
import { GameForumService } from './modules/game-forum/game-forum/game-forum.service';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchDisplayComponent } from './search-display/search-display.component';

// pipe imports
import { SafePipe } from './shared/safe.pipe';


// directive imports

import { AppRoutingModule } from './app-routing/app-routing.module';
import { GeneralDiscussionComponent } from './modules/game-forum/game-forum/general-discussion/general-discussion.component';
import { AuthGuard } from './core/guards/auth-guard.service';
// import { AuthGuard } from './core/guards/auth-guard.service';
import { RedirectComponent } from './redirect/redirect.component';
import { AdminComponent } from './admin/admin.component';

import { ForumPostComponent } from './modules/game-forum/game-forum/forum-display/forum-post/forum-post.component';
import { ForumDisplayComponent } from './modules/game-forum/game-forum/forum-display/forum-display.component';
import { GeneralTopicComponent } from './modules/game-forum/game-forum/general-discussion/general-topic/general-topic.component';
// import { StripeComponent } from './stripe/stripe.component';

// NEW IMPORTS TESTING
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { HomeComponent } from './modules/home/home.component';
// import { LoginComponent } from './core/login/login.component';
// import { RegisterComponent } from './core/register/register.component';
// import { AlertComponent } from './core/alert/alert.component';
// import { backendProvider } from './core/guards/backend'
// import { JwtInterceptor } from './core/guards/jwt.interceptor';
// import { ErrorInterceptor } from './core/guards/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    SplashComponent,
    NavbarComponent,
    GameReviewComponent,
    PageNotFoundComponent,
    SearchDisplayComponent,
    GameForumComponent,
    SafePipe,
    GeneralDiscussionComponent,
    RedirectComponent,
    // AlertComponent,
    // HomeComponent,
    // LoginComponent,
    // RegisterComponent,
    // AlertComponent,
    AdminComponent,
    ForumPostComponent,
    ForumDisplayComponent,
    GeneralTopicComponent,
    // StripeComponent,
    
  ],
  entryComponents:[
    GameReviewComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
  ],
  exports: [
    GameReviewComponent,
    
  ],
  providers: [
    HttpClient,
    GameSearch,
    GameReview,
    AuthService,
    GameForumService,
    // AuthGuard,

    // Testing
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    // backendProvider

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
