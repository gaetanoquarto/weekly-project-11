import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  template: `
  <div class="container-fluid d-flex justify-content-center">
  <div class="card text-center w-25">
  <div class="card-header">
    Log-in
  </div>
  <div class="card-body">
    <h5 class="card-title mb-3">Effettua il log-in</h5>
    <form #form="ngForm" (ngSubmit)="accedi(form)">
  <div class="mb-3 form-group">
    <label for="email" class="form-label">Email address</label>
    <input name="email" type="email" class="form-control" id="email" required ngModel>
  </div>
  <div class="mb-3 form-group">
    <label for="password" class="form-label">Password</label>
    <input name="password" type="password" class="form-control" id="password" required ngModel>
  </div>
  <button type="submit" [disabled]="form.invalid" class="btn btn-primary">Login</button>
</form>
  </div>
  <div class="card-footer text-muted">
<p>Non sei registrato ?</p><a [routerLink]="['/register']">Registrati</a>
</div>
</div>
</div>
  `,
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async accedi(form: NgForm) {
    try {
      await this.authSrv.login(form.value).toPromise()
      this.router.navigate([''])
    } catch (error) {
      console.error(error)
    }
  }

}
