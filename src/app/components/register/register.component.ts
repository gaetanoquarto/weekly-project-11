import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-register',
  template: `
    <div class="container-fluid d-flex justify-content-center">
  <div class="card text-center w-25">
  <div class="card-header">
    Registrati
  </div>
  <div class="card-body">
    <h5 class="card-title mb-3">Effettua la registrazione</h5>
    <form #form="ngForm" (ngSubmit)="onsubmit(form)" >
  <div class="mb-3 form-group">
    <label for="name" class="form-label">Nome</label>
    <input name="name" type="text" class="form-control" id="name" required ngModel>
  </div>
  <div class="mb-3 form-group">
    <label for="email" class="form-label">Email address</label>
    <input name="email" type="email" class="form-control" id="email" required ngModel>
  </div>
  <div class="mb-3 form-group">
    <label for="password" class="form-label">Password</label>
    <input name="password" type="password" class="form-control" id="password" required ngModel>
  </div>

  <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Registrati</button>
</form>
  </div>
  <div class="card-footer text-muted">
<p>Sei già registrato? Effettua il <a [routerLink]="['/login']">Login</a></p>
</div>
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
