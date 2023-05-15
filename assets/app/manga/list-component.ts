import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Http, Response, Headers } from "@angular/http";

import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

import { MangaService } from "./manga.service";

@Component({
  selector: "manga-list",
  templateUrl: "./list-component.html",
  styleUrls: ["./list-component.css"],
})
export class MangaList {
  Data: any[];

  constructor(private mangaService: MangaService, private http: Http) {}

  ngOnInit(): void {
    this.mangaService.getMangas()
      .subscribe(
        (data) => {
          this.Data = data;
          console.log(data)
          // Faça algo com a lista de itens aqui
        },
        (error) => {
          console.error('Erro ao obter a lista de itens:', error);
        }
      );
  }
}
