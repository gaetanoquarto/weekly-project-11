import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { FavoriteUser } from 'src/app/models/favorite-user';
import { FavoritesService } from 'src/app/services/favorites.service';
import { Favorite } from 'src/app/models/favorite';

@Component({
  selector: 'app-profile',
  template: `
   <app-navbar></app-navbar>


  <div class="container-fluid text-white mb-5">
    <div class="container-fluid d-flex flex-column align-items-center mb-5">
  <img src="https://cdn.pixabay.com/photo/2022/11/18/02/25/baby-hulk-7599327_960_720.jpg" class="mb-4 rounded-circle" alt="..." width="200px">
  <div class="mb-3 form-floating form-group">
    <input name="name" type="name" class="form-control" id="email" placeholder="name" disabled>
    <label for="email"><i class="bi bi-person"></i> {{userdata.user.name}}</label>
  </div>
  <div class="mb-3 form-floating form-group">
    <input name="email" type="email" class="form-control" id="email" placeholder="name@example.com" disabled>
    <label for="email"><i class="bi bi-envelope"></i> {{userdata.user.email}}</label>
  </div>
  </div>
      <div class="row justify-content-center">
      <h2 class="text-center text-danger">I TUOI FILM PREFERITI</h2>
        <div class="container d-flex flex-wrap justify-content-center mt-3">
          <div *ngIf="!pageData" class="d-flex align-items-center">
            <div class="spinner-border text-danger" role="status">
             <span class="sr-only"></span>
           </div>
          </div>
          <div *ngIf="favoriteUser!.length === 0">
            <p class="fs-1 text-center"><i class="bi bi-emoji-dizzy"></i></p>
                <h4>Non c'è nulla da vedere qui!</h4>
              </div>
              <div class="card shadow cardHover m-3" *ngFor="let fav of favoriteUser" style="width: 18rem">
              <img src="http://image.tmdb.org/t/p/w500/{{fav.poster_path}}" class="card-img-top" alt="..." />
            <div class="card-img-overlay d-flex justify-content-between flex-column">
            <p class="bg-danger py-1 px-2 rounded-2 text-center"><i class="bi bi-star-fill"></i> {{fav.vote_average}}</p>
              <h5 class="card-text text-center">{{fav.title}}</h5>
              <a class="btn text-danger fs-5" (click)="dislike(fav.movieId)"><i class="bi bi-heart-fill"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>


  `,
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  constructor(private http: HttpClient, private fvrSrv: FavoritesService) { }

  userdata: any = [];
  favoriteUser: FavoriteUser[] | undefined
 sub: Subscription | undefined
 favorites: Favorite[] | undefined


  ngOnInit(): void {
    this.getUser();
    this.getFavoriteUsers()
  }
  pageData = false;

  getUser() {
  let userLogged: any = localStorage.getItem('user');
  this.userdata = JSON.parse(userLogged);
    }

    getFavoriteUsers() {
    this.sub = this.fvrSrv.getFavoritesUser(this.userdata.user.id).subscribe((ris) =>{
      this.favoriteUser = ris;
      this.pageData = true;
    });
    }

    dislike(idMov: number) {
          //ottengo l'array dei favoriti
    this.sub = this.fvrSrv.getFavorites().subscribe((ris) => {
      this.favorites = ris;

      //controllo se l'elemento esiste
      if (ris.find(item => item.movieId === idMov && item.userId === this.userdata.user.id)) {


        //se esiste, mi controlli se i dati sono uguali e mi restituisci l'id del dato da eliminare
        const item = ris.find(item => item.movieId === idMov && item.userId === this.userdata.user.id);
        const id = item ? item.id : undefined;



        //Elimina quel dato dal json favoriti
        this.sub = this.fvrSrv.deleteFavorites(id!).subscribe((ris) => {
          console.log('Elemento rimosso dai preferiti')
        });
        this.getFavoriteUsers();
      }
    })

  }

}
