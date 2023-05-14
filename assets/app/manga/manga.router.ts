import { Routes } from "@angular/router";
import { CreateComponent } from "./create.component";

/* Este Path é relativo a /autenticacao
   Aqui temos as sub-rotas ("child routes") */


export const MANGA_ROUTES: Routes = [
     { path: '', redirectTo: 'create', pathMatch: 'full' },
     { path: 'create', component: CreateComponent },
     { path: 'list', component: CreateComponent },
];