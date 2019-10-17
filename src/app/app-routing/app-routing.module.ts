// @angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { SplashComponent } from '../modules/home/splash/splash.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { GameReviewComponent } from '../modules/game-review/game-review/game-review.component';
import { SearchDisplayComponent } from './../search-display/search-display.component';
import { GameForumComponent } from '../modules/game-forum/game-forum/game-forum.component';
import { GeneralDiscussionComponent } from '../modules/game-forum/game-forum/general-discussion/general-discussion.component';
import { AuthGuard } from '../core/guards/auth-guard.service';
// import { AuthGuard } from '../core/guards/auth-guard.service';
import { RedirectComponent } from '../redirect/redirect.component';
import { AdminComponent} from '../admin/admin.component'
import { ForumDisplayComponent } from '../modules/game-forum/game-forum/forum-display/forum-display.component';
import { ForumPostComponent } from '../modules/game-forum/game-forum/forum-display/forum-post/forum-post.component';


const routes: Routes = [
    { path: '', component: SplashComponent },
    { path: 'search/:searching', component: SearchDisplayComponent },
    { path: 'review/:gameid', component: GameReviewComponent },
    { path: 'admin', component: AdminComponent },
    // { path: 'review/:gameid', canActivate: [AuthGuard], component: GameReviewComponent },
    { path: 'forumTopic/:gameid/:value', component: GameForumComponent},
    { path: 'forumTopic/:gameid/:value/:category', component: GeneralDiscussionComponent },
    { path: 'forumTopic/:gameid/:value/:category/:topicId', component: ForumDisplayComponent },
    // { path: 'forumReply/:gameid/:value/:category/:topicId', component: ForumPostComponent },
    { path: 'redirect', component: RedirectComponent },
    // place paths above here
    // { path: 'not-found', component: PageNotFoundComponent }, // Static Message
    // { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} }, // Dynamic Messagae
    // { path: '**', redirectTo: '/not-found' }, // ** - Wildcart Route !Has to be last in the routes!
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, 
            //{ enableTracing: true }
            )
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }