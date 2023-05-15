import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Http, Response, Headers } from "@angular/http";

import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

import { ActivatedRoute } from '@angular/router';

import { MangaService } from "./manga.service";

@Component({
  selector: "manga-book",
  templateUrl: "./livro-component.html",
  styleUrls: ["./livro-component.css"],
})
export class LivroComponent implements OnInit {
  livroId: number;
  Data: any;

  constructor(private mangaService: MangaService, private http: Http, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.livroId = +params['id'];
      this.mangaService.getMangaById(this.livroId)
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
      // Aqui você pode fazer uma requisição HTTP para carregar as informações do livro com base no livroId
      // Exemplo: this.carregarLivro(this.livroId);
    });
  }

  DeleteLivro() {
    this.mangaService.deleteMangaById(this.livroId)
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
