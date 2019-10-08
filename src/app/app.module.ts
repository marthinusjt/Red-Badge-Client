// @angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; // <-- NgModel lives here
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClient, HttpClientModule } from '@angular/common/http'

// @bootstrap imports
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// component imports
import { AppComponent } from './app.component';
import { SplashComponent } from './modules/home/splash/splash.component';

// service imports
import { GameSearch } from './game-search.service';
import { NavbarComponent } from './core/header/navbar/navbar.component'


// directive imports

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    HttpClient,
    GameSearch
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
