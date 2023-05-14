import { Routes, RouterModule } from "@angular/router";
import { AuthenticationComponent } from "./auth/authentication.component";
import { AUTH_ROUTES } from "./auth/auth.router";

import { MangaComponent } from "./manga/manga.component";
import { MANGA_ROUTES } from "./manga/manga.router";

const APP_ROUTES: Routes = [ 
    {path: '', redirectTo: '/manga', pathMatch: 'full'},
    {path: 'manga', component: MangaComponent, children: MANGA_ROUTES},
    {path: 'autenticacao',component: AuthenticationComponent, children: AUTH_ROUTES},
]

export const myrouting = RouterModule.forRoot(APP_ROUTES);