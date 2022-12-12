import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-register',
  template: `
    <div class="container-fluid d-flex justify-content-center align-items-center container100">
  <div class="card login text-center w-25 p-5">
  <div class="card-body text-white">
    <h1 class="card-title mb-4 logo fw-bold">M</h1>
    <h5 class="card-title mb-4">Effettua la registrazione</h5>
    <form #form="ngForm" (ngSubmit)="onsubmit(form)" >
  <div class="mb-3 form-floating form-group">
    <input name="name" type="text" class="form-control" id="name" placeholder="Nome e cognome" required ngModel>
    <label for="name"><i class="bi bi-person"></i> Nome e cognome</label>
  </div>
  <div class="mb-3 form-floating form-group">
    <input name="email" type="email" class="form-control" id="email" placeholder="name@example.com" required ngModel>
    <label for="email"><i class="bi bi-envelope"></i> Email</label>
  </div>
  <div class="mb-3 form-floating form-group">
    <input name="password" type="password" class="form-control" id="password" placeholder="password" required ngModel>
    <label for="password"><i class="bi bi-key"></i> Password</label>
  </div>
  <button type="submit" class="btn raise btn-danger rounded-5 px-5" [disabled]="form.invalid">Registrati</button>
</form>
  </div>
  <hr class="border border-white">
<p class="text-white">Sei già registrato? Effettua il <a class="text-danger text-decoration-none" [routerLink]="['/login']">Login</a></p>
</div>
</div>
  `,
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onsubmit(form: NgForm) {
    console.log(form.value)
    try {
      await this.authSrv.registration(form.value).toPromise()
      this.router.navigate(['/login'])
    } catch (error) {
      console.error(error)

    }
  }

}
