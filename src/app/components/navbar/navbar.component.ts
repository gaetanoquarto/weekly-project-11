import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  template: `
<nav class="navbar navbar-expand-lg bg-transparent ">
        <div class="container-fluid">
            <a class="navbar-brand logo fs-1 fw-bold" href="#">Moovie</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class=" collapse navbar-collapse" id="navbarText">
                <ul class=" navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" [routerLink]="[''] "routerLinkActive="active-link" [routerLinkActiveOptions]="{ exact: true }" >Movies</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" [routerLink]="['/profile'] "routerLinkActive="active-link">Profilo</a>
                    </li>
                </ul>
                <span class="navbar-text" >
                    <button type="button" class="btn raise btn-danger rounded-5 px-5" (click)="logOut()">Log out</button>
                </span>
            </div>
        </div>
    </nav>
  `,
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
  }

  logOut() {
    this.authSrv.logout();
  }
}
