import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Http, Response, Headers } from "@angular/http";

import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

import { MangaService } from "./manga.service";

@Component({
  selector: "manga-create",
  templateUrl: "./create-component.html",
  styleUrls: ["./create-component.css"],
})
export class CreateComponent {
  //myForm: FormGroup;
  inputText: string;
  quantity: number;
  price: number;

  apiData: any[];
  selectedItem: any;

  isBloqueado: boolean = false;

  private inputSubject: Subject<string> = new Subject<string>();
  private inputSubjectNumber: Subject<number> = new Subject<number>();

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
            alert("Erro na Api");
          });
      });
      this.inputSubjectNumber.pipe(
        debounceTime(10),
        distinctUntilChanged()
      ).subscribe((value: number) => {
        let local = this.apiData[this.selectedItem]
        local.price = this.price;
        local.quantity = this.quantity;
      })
      this.isBloqueado = this.selectedItem ? true : false
  }

  onInputChange() {
    this.inputSubject.next(this.inputText);
  }

  onChangePrice() {
    this.inputSubjectNumber.next(this.price);
    console.log(this.price)
  }

  onChangeQuantity() {
    this.inputSubjectNumber.next(this.quantity);
    console.log(this.quantity)
  };

  onSelectionChange(index) {
    this.selectedItem = index;
    console.log(index);
    // Faça o que você precisar com o índice selecionado
  }

  toCreate() {
    this.mangaService.addManga(this.apiData[this.selectedItem]);
    //this.mangaService.addGenres();
  }

  toCreateAuthors() {
    for (
      let index = 0;
      index < this.apiData[this.selectedItem].authors.length;
      index++
    ) {
      const element = this.apiData[this.selectedItem].authors[index];
      this.mangaService.addAuthors(element.mal_id);
    }
  }

  ngOnInit() {}
}
