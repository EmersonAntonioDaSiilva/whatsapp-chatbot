import { AuthService } from './../../login/auth.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  mostrarMenu: boolean = false;

  constructor(private authService: AuthService){  }

  ngOnInit(){
    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    )
  }

  logof(){
    this.authService.logof();
  }

}
