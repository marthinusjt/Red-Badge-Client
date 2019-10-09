// @angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AuthComponent } from '../core/auth/auth.component';
import { SplashComponent } from '../modules/home/splash/splash.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { GameReviewComponent } from '../modules/game-review/game-review/game-review.component';
import { GameForumComponent } from '../modules/game-forum/game-forum/game-forum.component';

const routes: Routes = [
    { path: '', component: SplashComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'review/:gameid', component: GameReviewComponent },
    { path: 'forum', component: GameForumComponent },

    // place paths above here
    { path: 'not-found', component: PageNotFoundComponent }, // Static Message
    // { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} }, // Dynamic Messagae
    { path: '**', redirectTo: '/not-found' }, // ** - Wildcart Route !Has to be last in the routes!
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { enableTracing: true })
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }