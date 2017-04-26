import { UserAuth } from './userAuth';
import { AuthService } from './auth.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private userAuth: UserAuth = new UserAuth();

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  fazerLogin(){
    console.log(this.userAuth);
    this.authService.fazerLogin(this.userAuth);

  }

}
