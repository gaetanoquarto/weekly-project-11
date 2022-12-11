import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from 'src/app/services/users.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  template: `
   <app-navbar></app-navbar>
  <h2>Dettagli utente:</h2>
  <p>Nome:  {{userdata.user.name}}</p>
  <p>Email: {{userdata.user.email}}</p>
  `,
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  constructor() { }

  userdata: any = [];

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
  let userLogged: any = localStorage.getItem('user');
  this.userdata = JSON.parse(userLogged);
    }
  }

