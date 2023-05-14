import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Http, Response, Headers } from "@angular/http";

import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";


import { MangaService } from "./manga.service";

@Component({
  selector: "manga-create",
  templateUrl: "./create-component.html",
})
export class CreateComponent {
  //myForm: FormGroup;
  inputText: string;
  apiData: any[];
  selectedItem: any;

  private inputSubject: Subject<string> = new Subject<string>();

  constructor(private mangaService: MangaService, private http: Http) {
    this.inputSubject
      .pipe(
        debounceTime(1000), // Atraso de 1 segundos
        distinctUntilChanged() // Ignora se o valor for igual ao anterior
      )
      .subscribe((value: string) => {
        // Faz a requisição à API com o valor atualizado do input
        this.mangaService
          .getManga(value)
          .then((data) => {
            this.apiData = data;
            this.selectedItem = 0;
            console.log(data);
          })
          .catch((error) => {
            alert("Erro na Api")
          });
      });
  }

  onInputChange() {
    this.inputSubject.next(this.inputText);
  }

  onSelectionChange(index) {
    this.selectedItem = index;
    console.log(index);
    // Faça o que você precisar com o índice selecionado
  }

  toCreate() {
    this.mangaService.addManga(this.apiData[this.selectedItem])
    //this.mangaService.getGenres()
  }

  ngOnInit() {}
}
