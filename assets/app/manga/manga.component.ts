import { Component } from "@angular/core";

@Component({
  selector: "app-manga",
  template: `<h1>Componente de Manga</h1>
    <header class="row spacing">
      <nav class="col-md-8 col-md-offset-2">
        <ul class="nav nav-tabs">
          <li routerLinkActive="active">
            <a [routerLink]="['create']">Create</a>
          </li>
        </ul>
      </nav>
    </header>
    <div class="row spacing">
      <router-outlet></router-outlet>
    </div> `,
})
export class MangaComponent {}