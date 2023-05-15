import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/Rx";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

const api = "https://api.jikan.moe/v4/";

@Injectable()
export class MangaService {
  constructor(private http: Http) {}


  getMangas() {
    return this.http.get('http://localhost:3000/manga/getMangas')
        .map((responseRecebida: Response) => {
            const responseEmJSON = responseRecebida.json();
            const messageSResponseRecebida = responseEmJSON.objSMessageSRecuperadoS;
        })
        .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
}

  getManga(name: String): Promise<any> {
    return new Promise((resolve, reject) => {
      // anime?q=${text.split(" ").join("+")}&limit=18
      this.http.get(api + "manga?q=" + name + "&limit=10").subscribe(
        (data) => {
          const jsonData = data.json();
          resolve(jsonData.data);
        },
        (error) => {
          reject(error); // Rejeita a Promise com o erro, se houver
        }
      );
    });
  }

  addManga(manga: any) {
    const bodyReq = JSON.stringify(manga);

    return this.http
      .post("http://localhost:3000/manga/createManga", manga)
      .subscribe(
        (response) => {
          const jsonData = response; // Faça algo com a resposta do servidor
          console.log(jsonData);
        },
        (error) => {
          console.error(error); // Trate qualquer erro que ocorrer
        }
      );
  }

  getCharacters(id: String): Promise<any> {
    return new Promise((resolve, reject) => {
      // anime?q=${text.split(" ").join("+")}&limit=18
      this.http.get(api + "manga/" + id + "/characters").subscribe(
        (data) => {
          const jsonData = data.json();
          resolve(jsonData.data);
        },
        (error) => {
          reject(error); // Rejeita a Promise com o erro, se houver
        }
      );
    });
  }

  addCharacter() {}

  addAuthors(authors: Number): Promise<any> {
    return new Promise((resolve, reject) => {
      // anime?q=${text.split(" ").join("+")}&limit=18
      this.http.get(api + "people/" + authors + "/full").subscribe(
        (data) => {
          const element = data.json();
          this.http
            .post("http://localhost:3000/author/createAuthor", element.data)
            .subscribe(
              (response) => {
                const jsonData = response; // Faça algo com a resposta do servidor
                console.log(jsonData);
              },
              (error) => {
                console.error(error); // Trate qualquer erro que ocorrer
              }
            );
        },
        (error) => {
          reject(error); // Rejeita a Promise com o erro, se houver
        }
      );
    });
  }

  getGenres() {
    return this.http.get("http://localhost:3000/genre/getGenres").subscribe(
      (response) => {
        const jsonData = response; // Faça algo com a resposta do servidor
        console.log(jsonData);
      },
      (error) => {
        console.error(error); // Trate qualquer erro que ocorrer
      }
    );
  }

  addGenres() {
    return new Promise((resolve, reject) => {
      // anime?q=${text.split(" ").join("+")}&limit=18
      this.http.get(api + "genres/manga").subscribe(
        (data) => {
          const jsonData = data.json();
          resolve(jsonData.data);
          for (let index = 0; index < jsonData.data.length; index++) {
            const element = jsonData.data[index];
            this.http
              .post("http://localhost:3000/genre/createGenre", element)
              .subscribe(
                (response) => {
                  const jsonData = response; // Faça algo com a resposta do servidor
                  console.log(jsonData);
                },
                (error) => {
                  console.error(error); // Trate qualquer erro que ocorrer
                }
              );
          }
        },
        (error) => {
          reject(error); // Rejeita a Promise com o erro, se houver
        }
      );
    });
  }
}
