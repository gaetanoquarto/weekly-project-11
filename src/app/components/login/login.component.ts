import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  template: `
  <div class="container-fluid d-flex justify-content-center align-items-center container100">
  <div class="card login shadow text-center w-25 mt-5 p-5">
  <div class="card-body text-white">
    <h1 class="card-title mb-4 logo fw-bold">M</h1>
    <h5 class="card-title mb-4 ">Effettua il log-in</h5>
    <form #form="ngForm" (ngSubmit)="accedi(form)">
  <div class="mb-3 form-floating form-group">
    <input name="email" type="email" class="form-control" id="email" placeholder="name@example.com" required ngModel>
    <label for="email"><i class="bi bi-envelope"></i> Email</label>
  </div>
  <div class="mb-3 form-floating form-group">
    <input name="password" type="password" class="form-control" id="password" placeholder="password" required ngModel>
    <label for="password"><i class="bi bi-key"></i> Password</label>

  </div>
  <button type="submit" [disabled]="form.invalid" class="btn btn-danger raise rounded-5 px-5">Login</button>
</form>
  </div>
  <hr class="border border-white">
<p class="text-white">Non sei registrato ? <a class="text-danger text-decoration-none" [routerLink]="['/register']">Registrati</a></p>
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
