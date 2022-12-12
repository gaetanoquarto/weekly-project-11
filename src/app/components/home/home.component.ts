import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { Favorite } from 'src/app/models/favorite';
import { MoviesService } from 'src/app/services/movies.service';
import { FavoritesService } from 'src/app/services/favorites.service';


@Component({
  selector: 'app-home',
  template: `
      <app-navbar></app-navbar>

      <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="container d-flex flex-wrap justify-content-center mt-3">
        <div *ngIf="!pageData" class="d-flex align-items-center">
  <div class="spinner-border text-danger" role="status">
    <span class="sr-only"></span>
  </div>
</div>
          <div *ngFor="let movie of movies" class="card shadow cardHover m-3" style="width: 18rem">
            <img src="http://image.tmdb.org/t/p/w500/{{movie.poster_path}}" class="card-img-top" alt="..." />
            <div class="card-img-overlay justify-content-between d-flex flex-column">
              <p class="bg-danger py-1 px-2 rounded-2 text-center"><i class="bi bi-star-fill"></i> {{movie.vote_average}}</p>
              <h5 class="card-text text-center">{{movie.title}}</h5>
              <a class="btn {{movie.like ? 'text-danger' : 'text-white'}} fs-5"  (click)="like(movie.id, movie.poster_path, movie.title, movie.vote_average, movie.overview, $event)"><i class="bi bi-heart-fill"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient, private movSrv: MoviesService, private favSrv: FavoritesService) { }

  sub: Subscription | undefined
  movies: Movie[] | undefined
  userdata: any = []
  favorites: Favorite[] | undefined


pageData = false;


  ngOnInit(): void {
    this.getFilms();
    this.getUser();
    this.load();
  }

  load() {
    this.movSrv.getMovies().subscribe(movies => {
      this.movies = movies;
      if (this.userdata.user.id !== null) {
        this.favSrv.getFavorites().subscribe(fav => {
          this.movies = this.movies!.map(movie => {
            if (fav.find(value => value.movieId === movie.id && value.userId === this.userdata.user.id)) {
              movie.like = true;
              movie.userId = this.userdata.user.id;
            }
            return movie;
          });
        });
      }
    });
  }


  getFilms() {
    this.sub = this.movSrv.getMovies().subscribe((ris) => {
      this.movies = ris;
      this.pageData = true;
    })
  }

  getUser() {
    let userLogged: any = localStorage.getItem('user');
    this.userdata = JSON.parse(userLogged);
      }



  like(movie: number, poster: string, title: string, vote: number, overview: string, event: any) {
    //ottengo l'array dei favoriti
    this.sub = this.favSrv.getFavorites().subscribe((ris) => {
      this.favorites = ris;

      //controllo se l'elemento esiste
      if (ris.find(item => item.movieId === movie && item.userId === this.userdata.user.id)) {
        event.target.classList.remove('text-danger');
        event.target.classList.add('text-white');


        //se esiste, mi controlli se i dati sono uguali e mi restituisci l'id del dato da eliminare
        const item = ris.find(item => item.movieId === movie && item.userId === this.userdata.user.id);
        const id = item ? item.id : undefined;



        //Elimina quel dato dal json favoriti
        this.sub = this.favSrv.deleteFavorites(id!).subscribe((ris) => {
          console.log('Elemento rimosso dai preferiti')
        });
        //altrimenti se non esiste
      } else {
        event.target.classList.remove('text-white');
        event.target.classList.add('text-danger');
        // mi crei un nuovo oggetto
        let newFavorite: {
          movieId: number,
          userId: number,
          poster_path: string,
          title: string,
          vote_average: number,
          overview: string
        } = {
          movieId: movie,
          userId: this.userdata.user.id,
          poster_path: poster,
          title: title,
          vote_average: vote,
          overview: overview
        }
        //me lo aggiungi nel json favoriti
        this.sub = this.favSrv.postFavorites(newFavorite).subscribe((ris) => {
          console.log('Elemento aggiunto ai preferiti!')
        });
      }
    });
  }

  }
